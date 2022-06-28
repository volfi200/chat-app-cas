import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/models/User';
import { RoomService } from '../../../shared/services/room.service';
import { Message } from '../../../shared/models/Message';
import { MessageService } from '../../../shared/services/message.service';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {

  type?: string;
  id?: string;
  loggedInUser: string = localStorage.getItem('user')?.slice(1,-1) as string;

  messages: Array<Message> = new Array<Message>();
  users: Array<User> = new Array<User>();
  targetName: string = '';

  queryParamSubscription?: Subscription;
  messageLoadingSubscription?: Subscription;
  userLoadingSubscription?: Subscription;
  roomLoadingSubcription?: Subscription;
  dialogSubscription?: Subscription;

  messageForm = this.formBuilder.group({
    id: '',
    content: '',
    sender_id: localStorage.getItem('user')?.slice(1,-1),
    target_id: '',
    type: '',
    date: new Date().getTime()
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private roomService: RoomService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.queryParamSubscription = this.route.queryParamMap.subscribe(result => {
        this.type = result.get('type') as string;
        this.id = result.get('id') as string; 

        this.messageForm.get('type')?.setValue(this.type);
        this.messageForm.get('target_id')?.setValue(this.id);

        this.userLoadingSubscription = this.userService.getAll().subscribe(result => {
          this.users = result
          this.setTargetName();
        });

        if(this.type === 'personal'){
          this.messageLoadingSubscription = this.messageService.getPersonalMessages(this.id, (localStorage.getItem('user') as string).slice(1,-1)).subscribe(result => {
            this.messages = result;
          })
        } else {
          this.messageLoadingSubscription = this.messageService.getMessagesforRoom(this.id).subscribe(result => {
            this.messages = result;
          })
        }
    }); 
  }

  ngOnDestroy(): void {
    this.messageLoadingSubscription?.unsubscribe();
    this.userLoadingSubscription?.unsubscribe();
    this.roomLoadingSubcription?.unsubscribe();
    this.queryParamSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
  }

  setTargetName() {
    if(this.type === 'personal'){
      const targetPerson = this.users.find(user => user.id === this.id);
      this.targetName = targetPerson?.name.firstname + ' ' + targetPerson?.name.lastname;
    } else {
      this.roomLoadingSubcription = this.roomService.getById(this.id as string).subscribe(result => this.targetName = result?.name as string);
    }
  }

  sendMessage(){
    console.log(this.messageForm.value);
    if (this.messageForm.get('content')?.value) {
      this.messageForm.get('date')?.setValue(new Date().getTime());

      this.messageService.create(this.messageForm.value as Message).then(_ => {
        this.messageForm.get('content')?.setValue('');
      }).catch(error => {
        console.error(error);
      });
    }
  }

  delete(message: Message){
    this.messageService.delete(message.id).then(() => {
      this.snackBar.open(
        this.translate.instant('CONVERSATION.DELETED'), 
        this.translate.instant('COMMON.OK'), 
        {duration: 2000});
    });
  }

  openEditDialog(message: Message){
    const dialogRef = this.dialog.open(EditDialogComponent, {data: {message}});

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result !== message.content){
        message.content = result; 
        this.messageService.update(message).then(() => {
          this.snackBar.open(
            this.translate.instant('CONVERSATION.MODIFIED'), 
            this.translate.instant('COMMON.OK'), 
            {duration: 2000});
        });
      } else if(result === ''){
        this.snackBar.open(
          this.translate.instant('CONVERSATION.EMPTY'), 
          this.translate.instant('COMMON.OK'), 
          {duration: 2000});
      }
    });
  }

}
