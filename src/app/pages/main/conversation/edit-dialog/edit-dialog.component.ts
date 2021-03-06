import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent implements OnInit {

  editedText?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) { }

  ngOnInit(): void {
    this.editedText = this.data.message.content;
  }

}
