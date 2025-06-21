import { signalStoreFeature, type } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { JobsListingEvents } from './jobs-listing.events';
import { JobsListingState } from './jobs-listing.store';
import { JobsListing } from '../../../components/pages/jobs-listing/jobs-listing';

export function withJobsListingReducer<_>() {
  return signalStoreFeature(
    type<{ state: JobsListingState }>(),
    withReducer(
      on(JobsListingEvents.loaded, (event) => {
        console.log('🔴', event.payload);
        return { data: event.payload, isLoading: false };
      }),
      on(JobsListingEvents.load, (event) => {
        return { isLoading: true };
      }),
      on(JobsListingEvents.filter, ({ payload: filter }) => {
        return { filters: filter };
      }),
      on(JobsListingEvents.setActiveJob, ({ payload: job }) => {
        return { active_job: job };
      }),
      on(
        JobsListingEvents.addFavourite,
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
        JobsListingEvents.removeFavourite,
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
      //on(JobsListingEvents.resetFavourites, customerChanged, () => ({
      //  favouriteIds: [],
      //})),
    ),
  );
}
