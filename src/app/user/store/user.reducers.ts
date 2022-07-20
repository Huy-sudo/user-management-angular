import * as UserActions from "./user.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { User } from "../user.model";
import { Title } from "../title.model"
import * as fromRoot from "../../store/reducers/index";

export interface UserState extends EntityState<User> {
  selectedUserId: number | "null";
  loading: boolean;
  loaded: boolean;
  error: string;
}
export interface TitleState extends EntityState<Title> {
  selectedTitleId: number | "null";
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  users: UserState;
  titles: TitleState;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();
export const titleAdapter: EntityAdapter<Title> = createEntityAdapter<Title>();

export const defaultUser: UserState = {
  ids: [],
  entities: {},
  selectedUserId: "null",
  loading: false,
  loaded: false,
  error: ""
};

export const defaultTitle: TitleState = {
  ids: [] = [],
  entities: {},
  selectedTitleId: "null",
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = userAdapter.getInitialState(defaultUser);
export const initialStateTitle = titleAdapter.getInitialState(defaultTitle);

export function TitleReducer(
  state = initialStateTitle,
  action: UserActions.Actions
): TitleState {

  
  switch (action.type)
  {
    case UserActions.userActionTypes.LOAD_TITLES_SUCCESS: {
      return titleAdapter.setAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      })
    }

    case UserActions.userActionTypes.LOAD_TITLES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export function UserReducer(
  state = initialState,
  action: UserActions.Actions
): UserState {
  switch (action.type) {
    case UserActions.userActionTypes.LOAD_USERS_SUCCESS: {
      return userAdapter.setAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case UserActions.userActionTypes.LOAD_USERS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case UserActions.userActionTypes.LOAD_USER_SUCCESS: {
      return userAdapter.addOne(action.payload, {
        ...state,
        selectedUserId: action.payload.id
      });
    }
    case UserActions.userActionTypes.LOAD_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UserActions.userActionTypes.CREATE_USER_SUCCESS: {
      return userAdapter.addOne(action.payload, state);
    }
    case UserActions.userActionTypes.CREATE_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UserActions.userActionTypes.UPDATE_USER_SUCCESS: {
      return userAdapter.updateOne(action.payload, state);
    }
    case UserActions.userActionTypes.UPDATE_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UserActions.userActionTypes.DELETE_USER_SUCCESS: {
      return userAdapter.removeOne(action.payload, state);
    }
    case UserActions.userActionTypes.DELETE_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const getUserFeatureState = createFeatureSelector<UserState>(
  "Users"
);

const getTitleFeatureState = createFeatureSelector<TitleState>(
  "Titles"
)

export const getTitles = createSelector(
  getTitleFeatureState,
  titleAdapter.getSelectors().selectAll
);

export const getUsers = createSelector(
  getUserFeatureState,
  userAdapter.getSelectors().selectAll
);

export const getUsersLoading = createSelector(
  getUserFeatureState,
  (state: UserState) => state.loading
);

export const getUsersLoaded = createSelector(
  getUserFeatureState,
  (state: UserState) => state.loaded
);

export const getError = createSelector(
  getUserFeatureState,
  (state: UserState) => state.error
);

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state: UserState) => state.selectedUserId
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  state => state.entities[state.selectedUserId]
);