import { signalStoreFeature, type } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { JobsListingEvents } from './jobs-listing.events';
import { JobsListingState } from './jobs-listing.store';
import { JobsListing } from '../../../components/pages/jobs-listing/jobs-listing';

export function withJobsListingReducer<_>() {
  return signalStoreFeature(
    type<{ state: JobsListingState }>(),
    withReducer(
      //writing data to state and setting isLoading to flase
      //once this runs, it means async task is done
      on(JobsListingEvents.loaded, (event) => {
        return { data: event.payload, isLoading: false };
      }),
      //aside from effect listening to load event and carrying async task
      //this reducer is responsible for changing isLoading state
      //both reducer and effect can listen to an event
      on(JobsListingEvents.load, (event) => {
        return { isLoading: true };
      }),
      //for setting filter words from the input located at nav-bar
      on(JobsListingEvents.filter, ({ payload: filter }) => {
        return { filters: filter };
      }),
      //for showing job details
      on(JobsListingEvents.setActiveJob, ({ payload: job }) => {
        return { active_job: job };
      }),
    ),
  );
}
