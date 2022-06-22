import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { UserService } from "../services/user.service";
import * as userActions from "./user.actions";
import { User } from "../user.model";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUsers>(
      userActions.userActionTypes.LOAD_USERS
    ),
    mergeMap((action: userActions.LoadUsers) =>
      this.userService.getUsers().pipe(
        map(
          (users: User[]) =>
            new userActions.LoadUsersSuccess(users)
        ),
        catchError(err => of(new userActions.LoadUsersFail(err)))
      )
    )
  );

  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUser>(
      userActions.userActionTypes.LOAD_USER
    ),
    mergeMap((action: userActions.LoadUser) =>
      this.userService.getUser(action.payload).pipe(
        map(
          (user: User) =>
            new userActions.LoadUserSuccess(user)
        ),
        catchError(err => of(new userActions.LoadUserFail(err)))
      )
    )
  );

  @Effect()
  createUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.CreateUser>(
      userActions.userActionTypes.CREATE_USER
    ),
    map((action: userActions.CreateUser) => action.payload),
    mergeMap((user: User) =>
      this.userService.addUser(user).pipe(
        map(
          (newUser: User) =>
            new userActions.CreateUserSuccess(newUser)
        ),
        catchError(err => of(new userActions.CreateUserFail(err)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.UpdateUser>(
      userActions.userActionTypes.UPDATE_USER
    ),
    map((action: userActions.UpdateUser) => action.payload),
    mergeMap((user: User) =>
      this.userService.updateUser(user.id, user).pipe(
        map(
          (updateUser: User) =>
            new userActions.UpdateUserSuccess({
              id: updateUser.id,
              changes: updateUser
            })
        ),
        catchError(err => of(new userActions.UpdateUserFail(err)))
      )
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.DeleteUser>(
      userActions.userActionTypes.DELETE_USER
    ),
    map((action: userActions.DeleteUser) => action.payload),
    mergeMap((id: number) =>
      this.userService.deleteUser(id).pipe(
        map(() => new userActions.DeleteUserSuccess(id)),
        catchError(err => of(new userActions.DeleteUserFail(err)))
      )
    )
  );
}