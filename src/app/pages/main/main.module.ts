import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RoomListComponent } from './room-list/room-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ProtectedDialogComponent } from './room-list/protected-dialog/protected-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { NameModule } from '../../shared/name/name.module';
import { RoomBoxComponent } from './room-list/room-box/room-box.component';

@NgModule({
  declarations: [
    MainComponent,
    RoomListComponent,
    ProtectedDialogComponent,
    UserListComponent,
    RoomBoxComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    TranslateModule,
    HttpClientModule,
    NameModule
  ]
})
export class MainModule { }
