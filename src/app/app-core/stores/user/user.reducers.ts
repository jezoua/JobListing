import { signalStoreFeature, type } from '@ngrx/signals';
import { UserState } from './user.store';
import { on, withReducer } from '@ngrx/signals/events';
import { UserEvents } from './user.events';

export function withUserReducer<_>() {
  return signalStoreFeature(
    type<{ state: UserState }>(),
    withReducer(
      on(UserEvents.saveUserData, ({ payload: data }) =>  {
        //this is for adding the user data
        return {
          data: data,
        };
      }),
      on(UserEvents.applyToJob, ({payload: job_id}) => (state) =>  {
        //this is for adding job id to applied_job
        return {
          applied_jobs: [...state.applied_jobs, job_id]
        };
      }),
      on(
        UserEvents.addFavourite,
        ({ payload: favouriteId }) =>
          (state) => {
            console.log('ADDING to favourites...')
            if (!favouriteId) return {};
            if (state.favouriteIds.includes(favouriteId)) {
              return {};
            }
            return {
              favouriteIds: [...state.favouriteIds, favouriteId],
            };
          },
      ),
      on(
        UserEvents.removeFavourite,
        ({ payload: favouriteId }) =>
          (state) => {
            if (!favouriteId) return {};
            if (!state.favouriteIds.includes(favouriteId)) {
              return {};
            }
            return {
              favouriteIds: state.favouriteIds.filter(
                (id) => favouriteId !== id,
              ),
            };
          },
      ),
      //on(UserEvents.resetFavourites, customerChanged, () => ({
      //  favouriteIds: [],
      //})),
    ),
  );
}
