import { Component, Inject, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as userActions from "../../store/user.actions";
import * as fromUser from "../../store/user.reducers";
import { User } from "../../user.model";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { formatDate, formatNumber } from "@angular/common";

@Component({
  selector: "app-form-user",
  templateUrl: "./form-user.component.html",
  styleUrls: ["./form-user.component.css",
    "../../../../../node_modules/@material/layout-grid/mdc-layout-grid.scss"]
})

export class FormUser implements OnChanges, OnInit {
  minDate!: Date;
  maxDate!: Date;
  center: string = "center";
  titles: string[] = ['Team lead', 'Architecture', 'Web developer', 'Tester', 'UI/UX', 'DBA'];
  disable: boolean = true;
  // form!: FormGroup;

  constructor(
    private store: Store<fromUser.AppState>,
    public dialogRef: MatDialogRef<FormUser>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    const currentDate = new Date();
    this.minDate = new Date(1990, 0, 1);
    this.maxDate = currentDate;
    // this.form = new FormGroup({
    //   firstName: new FormControl({ disabled: this.disable, value: this.data.firstName }, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    //   lastName: new FormControl({ disabled: this.disable, value: this.data.lastName }, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    //   title: new FormControl({ disabled: this.disable, value: 
    //     this.data.title}
    //     , [Validators.required]),
    //   dateOfBirth: new FormControl({ disabled: this.disable, value: formatDate(this.data.dateOfBirth, 'mm/dd/yyyy', 'en') }),
    //   gender: new FormControl({ disabled: this.disable, value: this.data.gender }),
    //   organization: new FormControl({ disabled: true, value: this.data.organization }),
    //   email: new FormControl({ disabled: this.disable, value: this.data.email }, [Validators.required, Validators.email, Validators.maxLength(160)]),
    // });
  
    // this.form.controls['title'].setValue(this.data.title, {onlySelf: true});
    
  }

  form: any = new FormGroup({
    firstName: new FormControl({ disabled: this.disable, value: this.data.firstName }, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    lastName: new FormControl({ disabled: this.disable, value: this.data.lastName }, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    title: new FormControl({ disabled: this.disable, value: this.data.title}, [Validators.required]),
    dateOfBirth: new FormControl({ disabled: this.disable, value: formatDate(this.data.dateOfBirth, 'mm/dd/yyyy', 'en') }),
    gender: new FormControl({ disabled: this.disable, value: this.data.gender }),
    organization: new FormControl({ disabled: true, value: this.data.organization }),
    email: new FormControl({ disabled: this.disable, value: this.data.email }, [Validators.required, Validators.email, Validators.maxLength(160)]),
  });



  updateUser: any = {
    id: this.data.id,
    firstName: this.data.firstName,
    lastName: this.data.lastName,
    dateOfBirth: this.data.dateOfBirth,
    img: this.data.img,
    title: this.data.title,
    gender: this.data.gender,
    organization: this.data.organization,
    email: this.data.email,
    status: this.data.status,
    createdDate: this.data.createdDate,
    userId: null
  }

  titleChange(titleName: string): any {
    console.log(titleName);
    
    switch (titleName) {
      case "Team lead":
        return 1;
      case "Architecture":
        return 2;
      case "Web Developer":
        return 3;
      case "Tester":
        return 4;
      case "UI/UX":
        return 5;
      default:
        return 6;
    }
  }

  dateValidator(): boolean {
    let a = new Date(this.form.controls['dateOfBirth'].value);
    if ((a.getTime() - this.minDate.getTime()) >= 0 && (this.maxDate.getTime() - a.getTime()) > 0)
      return false
    else
      return true
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WarningDialog, {
      width: '400px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef.close();
    });
  }

  ngOnChanges(): void {
    // this.userTitle = this.data?.title
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeEdit() {
    if (this.disable)
      this.disable = !this.disable;
    if (this.disable == false) {
      this.form.controls['firstName'].enable();
      this.form.controls['lastName'].enable();
      this.form.controls['gender'].enable();
      this.form.controls['dateOfBirth'].enable();
      this.form.controls['email'].enable();
      this.form.controls['title'].enable();
    }
  }

  handleOnChange(event: any) {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    this.updateUser = {
      ...this.updateUser,
      [event.target.id]: value
    }
  }

  onSubmit() {    
    if (typeof(this.updateUser.title) !== typeof(5))
      this.updateUser.title = this.titleChange(this.updateUser.title);
    this.updateUser.userId = this.updateUser.id;
    this.store.dispatch(new userActions.UpdateUser(this.updateUser));
  }

}

@Component({
  selector: 'warning-dialog',
  templateUrl: 'warning-dialog.html',
  styleUrls: ['warning-dialog.css']
})

export class WarningDialog {
  constructor(
    private store: Store<fromUser.AppState>,
    public dialogRef: MatDialogRef<WarningDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }

  email: string = ""

  isDisable: boolean = true

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleInputDelete(event: any) {
    this.email = event.target.value;
    if (this.email !== "")
      this.isDisable = false;
    else
      this.isDisable = true
  }

  handleDelete() {
    if (this.email == this.data.email) {
      this.store.dispatch(new userActions.DeleteUser(this.data.id));
      this.dialogRef.close();
    }
    else
      alert("Wrong Email!!! Please try again.")
  }
}

