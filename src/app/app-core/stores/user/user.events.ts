
import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { User } from '../../models/user.model';
import { Credential } from '../../models/credential.model';

export const UserEvents = eventGroup({
  source: 'User',
  events: {
    saveUserData: type<User>(),
    applyToJob: type<string>(),
    addFavourite:type<string | undefined>(),
    removeFavourite:type<string | undefined>(),
    signUp:type<Credential>(),
    logIn:type<void>(),
    logOut:type<void>(),
  },
});
