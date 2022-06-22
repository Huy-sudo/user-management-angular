import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable, map, exhaustMap, elementAt } from "rxjs";

import * as userActions from "../../store/user.actions";
import * as fromUser from "../../store/user.reducers";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { User } from "../../user.model";
import { CreateUserComponent } from "../create-user/create-user.component";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css",
    "../../../../../node_modules/@material/layout-grid/mdc-layout-grid.scss"]
})

export class UsersListComponent implements OnInit {
  users$!: Observable<User[]>;
  error$!: Observable<String>;
  users: User[] = []
  sortType: string = "Created date";
  items = ['Created date', 'Last name', 'First name', 'Email'];
  expandedIndex = 0;
  searchText: string = "";

  titles: string[] = ['Team lead', 'Architecture', 'Web Developer', 'Tester', 'UI/UX', 'DBA'];

  isASC: boolean = true;

  isASCName() {
    if (this.isASC) {
      return "north"
    }
    else
      return "south"
  }

  onClickASC() {
    this.isASC = !this.isASC;
    if (this.isASC) {
      switch (this.sortType) {
        case "Created date":
          {
            return this.users.sort((a, b) => {
              return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
            });
          };
        case "Last name":
          {
            this.sortType = "Last name"
            return this.users.sort((a, b) =>
              a.lastName.localeCompare(b.lastName));
          }
        case "First name":
          {
            this.sortType = "First name"
            return this.users.sort((a, b) =>
              a.firstName.localeCompare(b.firstName));
          };
        case "Email":
          {
            this.sortType = "Email"
            return this.users.sort((a, b) =>
              a.email.localeCompare(b.email));
          }
        default:
          {
            return this.users.sort((a, b) => {
              return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
            });
          };
      }
    }
    else {
      switch (this.sortType) {
        case "Created date":
          {
            return this.users.sort((a, b) => {
              return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
            });
          };
        case "Last name":
          {
            this.sortType = "Last name"
            return this.users.sort((a, b) =>
              b.lastName.localeCompare(a.lastName));
          }
        case "First name":
          {
            this.sortType = "First name"
            return this.users.sort((a, b) =>
              b.firstName.localeCompare(a.firstName));
          };
        case "Email":
          {
            this.sortType = "Email"
            return this.users.sort((a, b) =>
              b.email.localeCompare(a.email));
          }
        default:
          {
            return this.users.sort((a, b) => {
              return <any>new Date(a.createdDate) - <any>new Date(b.createdDate);
            });
          };
      }
    }
  }

  constructor(private store: Store<fromUser.AppState>, public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers());
    this.users$ = this.store.pipe(select(fromUser.getUsers));
    this.error$ = this.store.pipe(select(fromUser.getError));
    this.users$.subscribe(user => this.users = user);
  }

  selected = 'Created date'

  filterData(value: string) {
    this.isASC = true;
    switch (value) {
      case "Created date":
        {
          this.sortType = "Created date"
          return this.users.sort((a, b) => {
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          });
        };
      case "Last name":
        {
          this.sortType = "Last name"
          return this.users.sort((a, b) =>
            a.lastName.localeCompare(b.lastName));
        }
      case "First name":
        {
          this.sortType = "First name"
          return this.users.sort((a, b) =>
            a.firstName.localeCompare(b.firstName));
        };
      case "Email":
        {
          this.sortType = "Email"
          return this.users.sort((a, b) =>
            a.email.localeCompare(b.email));
        }
      default:
        {
          return this.users.sort((a, b) => {
            return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
          });
        };
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '500px',
      data: this.users
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.user = result;
    });
  }

}