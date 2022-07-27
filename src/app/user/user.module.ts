import { UserEffects } from './store/user.effects';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './store/user.reducers';
import { UsersListComponent } from './component/users-list/users-list.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { GroupUserModule } from './component/group-user/group-user.component';
import {MatIconModule} from '@angular/material/icon';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FormUser } from './component/form-user/form-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort'
import {MatTableModule} from '@angular/material/table'
import { SearchFilterPipe } from '../search-filter.pipe';
import {LayoutModule} from '@angular/cdk/layout';
@NgModule({
  declarations: [
    UsersListComponent,
    CreateUserComponent,
    GroupUserModule,
    FormUser,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("Users", fromUser.UserReducer),
    EffectsModule.forFeature([UserEffects]),
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    LayoutModule
  ],
  providers: [UserService],
  exports: [
    UsersListComponent, 
    CreateUserComponent,
    GroupUserModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormUser,
    MatDatepickerModule,
    MatSortModule,
    MatTableModule
  ]
})
export class UserModule { }
