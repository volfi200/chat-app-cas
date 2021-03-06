import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent } from './conversation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NameModule } from '../../../shared/name/name.module';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageService } from 'src/app/shared/services/message.service';

@NgModule({
  declarations: [
    ConversationComponent,
    EditDialogComponent,
    MessageBoxComponent
  ],
  imports: [
    CommonModule,
    ConversationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    TranslateModule,
    HttpClientModule,
    NameModule
  ],
  providers: [
    MessageService
  ]
})
export class ConversationModule { }
