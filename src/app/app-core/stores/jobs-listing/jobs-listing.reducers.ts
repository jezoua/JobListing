import { signalStoreFeature, type } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { JobsListingEvents } from './jobs-listing.events';
import { JobsListingState } from './jobs-listing.store';

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
      on(JobsListingEvents.filter, ({payload:filter}) => {
        return { filters: filter };
      }),
      //on(JobsListingEvents.addFavourite, ({ payload: favouriteId }) => (state) => {
      //  if (state.favouriteIds.includes(favouriteId)) {
      //    return {};
      //  }
      //  return {
      //    favouriteIds: [...state.favouriteIds, favouriteId],
      //  };
      //}),
      //on(
      //  JobsListingEvents.removeFavourite,
      //  ({ payload: favouriteId }) =>
      //    (state) => {
      //      if (!state.favouriteIds.includes(favouriteId)) {
      //        return {};
      //      }
      //      return {
      //        favouriteIds: state.favouriteIds.filter(
      //          (id) => favouriteId !== id,
      //        ),
      //      };
      //    },
      //),
      //on(JobsListingEvents.resetFavourites, customerChanged, () => ({
      //  favouriteIds: [],
      //})),
    ),
  );
}
