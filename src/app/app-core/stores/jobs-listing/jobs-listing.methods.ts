import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { INCREMENT, JobsListingState } from './jobs-listing.store';

export function withJobsListingMethods() {
  return signalStoreFeature(
    type<{ state: JobsListingState }>(),
    withMethods((store) => ({
      //setActiveSection: (section: Section): void => {
     //  patchState(store, (store) => ({ ...store, activeSection: section }));
      //},
      showMoreJobs: (): void => {
        patchState(store, (state) => ({
          numberOfItemsToDisplay: state.numberOfItemsToDisplay + INCREMENT,
        }));
      },
    })),
  );
}
