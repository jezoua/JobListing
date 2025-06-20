import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { INCREMENT, JobsListingState } from './jobs-listing.store';
import { computed } from '@angular/core';

export function withJobsListingComputeds() {
  return signalStoreFeature(
    type<{ state: JobsListingState }>(),
    withComputed((state) => {
      return {
        jobsListing_display: computed(() => {
          return state.data()?.data;
        }),
        isLoading: computed(() => {
          return state.isLoading();
        }),
        number_of_pages: computed(() => {
          return state.numberOfItemsToDisplay()/INCREMENT;
        }),
      };
    }),
  );
}
