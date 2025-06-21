import { signalStoreFeature, type } from '@ngrx/signals';
import { UserState } from './user.store';
import { on, withReducer } from '@ngrx/signals/events';
import { UserEvents } from './user.events';

export function withUserReducer<_>() {
  return signalStoreFeature(
    type<{ state: UserState }>(),
    withReducer(

      on(UserEvents.saveUserData, ({ payload: data }) => {
        //this is for adding the user data
        return {
          data: data,
        };
      }),
      on(UserEvents.applyToJob, ({ payload: job_id }) => (state) => {
        //this is for adding job id to applied_job
        return {
          applied_jobs: [...state.applied_jobs, job_id],
        };
      }),
      //for adding job ids that are marked as favorite
      on(UserEvents.addFavourite, ({ payload: favouriteId }) => (state) => {
        if (!favouriteId) return {};
        if (state.favouriteIds.includes(favouriteId)) {
          return {};
        }
        return {
          favouriteIds: [...state.favouriteIds, favouriteId],
        };
      }),
      //for removing favourite
      on(UserEvents.removeFavourite, ({ payload: favouriteId }) => (state) => {
        if (!favouriteId) return {};
        if (!state.favouriteIds.includes(favouriteId)) {
          return {};
        }
        return {
          favouriteIds: state.favouriteIds.filter((id) => favouriteId !== id),
        };
      }),
      //for signing up, simple saving of login credentials to the store
      on(UserEvents.signUp, ({payload:creds}) => {
        return {
          username: creds.username,
          password: creds.password,
          isLoggedIn: true,
        };
      }),
      //for simplicity we only set isLoggedIn, validation is done on the component
      on(UserEvents.logIn, () => {
        return {
          isLoggedIn: true,
        };
      }),
      //simple log out
      on(UserEvents.logOut, () => {
        return {
          isLoggedIn: false,
        };
      }),
    ),
  );
}
