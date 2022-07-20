import { User } from './../../user.model';
import * as userActions from './../../store/user.actions';
import * as fromUser from "../../store/user.reducers";
import { AppState } from './../../../store/reducers/index';
import { Store, State, select } from '@ngrx/store';
import { Component, OnInit, Inject } from '@angular/core';
import * as uuid from 'uuid';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { max } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  fileToUpload!: File
  newUser!: User;
  url: any
  msg = ""
  minDate!: Date;
  maxDate!: Date;
  form: any = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    title: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(160)]),
  });

  constructor(
    private store: Store<fromUser.AppState>,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]) {
    const currentDate = new Date();
    this.minDate = new Date(1990, 0, 1);
    this.maxDate = currentDate
  }

  findDuplicates(email: string) {
    for (let i=0; i<this.data.length; i ++)
    {
      if (email == this.data[i].email)
        return 1
    }
    return 0
  }

  dateValidator(): boolean {
    let a = new Date(this.form.controls['dateOfBirth'].value);
    if ((a.getTime() - this.minDate.getTime()) >= 0 && (this.maxDate.getTime() - a.getTime()) > 0)
      return false
    else 
      return true
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.form.invalid)
      return;      
    if (this.newUser.img == null)
      this.newUser.img = "https://camo.githubusercontent.com/137115c4e2eab897b580d1f0db934f330d84654bccb0947c5e9af4bc8a66c6b6/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323639323831302f323130343036312f34643839316563302d386637362d313165332d393230322d6637333934306431306632302e706e67"
    this.newUser = {
      ...this.newUser,
      // id: this.data.length + 1,
      createdDate: new Date(),
      organization: "ROSEN",
      status: 1
    };
    console.log(this.newUser);
    
    this.store.dispatch(new userActions.CreateUser(this.newUser));
    this.store.dispatch(new userActions.LoadUsers());
    this.dialogRef.close();
  }

  handleOnChange(event: any) {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    this.newUser = {
      ...this.newUser,
      img: this.url,
      [event.target.id]: value
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.target.files[0];
    console.log(this.fileToUpload);
    if (!files.target.files[0] || files.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = files.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }
}