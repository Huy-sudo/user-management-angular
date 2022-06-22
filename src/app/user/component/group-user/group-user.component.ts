import { Component, Input, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as userActions from "../../store/user.actions";
import * as fromUser from "../../store/user.reducers";
import { User } from "../../user.model";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormUser} from "../form-user/form-user.component"

@Component({
  selector: "app-group-user",
  templateUrl: "./group-user.component.html",
  styleUrls: ["./group-user.component.css",
  "../../../../../node_modules/@material/layout-grid/mdc-layout-grid.scss"]
})
export class GroupUserModule implements OnInit {
  @Input() user!: User;

  constructor(private store: Store<fromUser.AppState>, public dialog: MatDialog) {}

  ngOnInit() {
    // this.store.dispatch(new userActions.LoadUsers());
    // this.users$ = this.store.pipe(select(fromUser.getUsers));
    // this.error$ = this.store.pipe(select(fromUser.getError));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormUser, {
      width: '500px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.user = result;
    });
  }
}