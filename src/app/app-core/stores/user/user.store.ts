import { signalStore, withState } from '@ngrx/signals';
import { User } from '../../models/user.model';
import { withUserReducer } from './user.reducers';
//this is a store for managing user data built for the following assumptions:
//1. Applicants can send application without creation of account to
//bypass frictions on user experience of having to create an account to apply.
//Feature is similar to sending CVs directly to jobs global and receiving back
//email for account creation.
//2. Manage only one account. So creating another will overwrite the existing.
//Everything is deleted upon refresh anyway.
//3. Only require username and password on account creation. Other details will come
//in during application.
//4. Only allow saving favorites when logged in.
//5. Autofill application fields when data is available and logged in



export type UserState = {
  data: User | undefined;
  applied_jobs: string[];
  favouriteIds: string [];
  username: string;
  password: string;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  data: undefined,
  applied_jobs: [],
  favouriteIds: [],
  username: '',
  password: '',
  isLoggedIn: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withUserReducer(),
);
