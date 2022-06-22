import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './user/component/users-list/users-list.component';
import { CreateUserComponent } from './user/component/create-user/create-user.component';
const routes: Routes = [
  { path: "", component: UsersListComponent },
  {
    path: "create-user", component: CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
