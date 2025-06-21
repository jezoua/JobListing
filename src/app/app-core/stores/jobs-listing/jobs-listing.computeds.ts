import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { INCREMENT, JobsListingState } from './jobs-listing.store';
import { computed } from '@angular/core';

export function withJobsListingComputeds() {
  return signalStoreFeature(
    type<{ state: JobsListingState }>(),
    withComputed((state) => {
      return {
        //for displaying job list
        jobsListing_display: computed(() => {
          //splits all words entered on the input
          //this is so that we only use one input for both location and job title
          const filters = state.filters().split(/\s+/);
          const data = state.data()?.data;
          //simple check to make sure input is not blank
          if (filters[0] !== '' || filters.length > 1) {
            //filters that should have a match on location and job title
            //loops through all the filter words
            const strictly_filtered = data?.filter((jobs) => {
              const title = jobs.title.toLowerCase();
              const location =
                jobs.page?.location?.country_and_city?.toLowerCase() || '';
              const titleMatch = filters.some((word) => title.includes(word));
              const locationMatch = filters.some((word) =>
                location.includes(word),
              );
              return titleMatch && locationMatch;
            });

            //these are for those that match either title OR location
            //to avoid blank result due to strict filter
            const leniently_filtered = data?.filter((jobs) => {
              const title = jobs.title.toLowerCase();
              const location =
                jobs.page?.location?.country_and_city?.toLowerCase() || '';
              const titleMatch = filters.some((word) => title.includes(word));
              const locationMatch = filters.some((word) =>
                location.includes(word),
              );
              return titleMatch || locationMatch;
            });

            return [strictly_filtered, leniently_filtered].flat();
            //return strictly_filtered
          }
          return data;
        }),
        isLoading: computed(() => {
          return state.isLoading();
        }),
      };
    }),
    withComputed(({ jobsListing_display }) => {
      return {
        //for pagination
        //pagination still applies even after filter
        //items per page is set to increment which is 10
        number_of_pages: computed(() => {
          const display_num = jobsListing_display()?.length;
          return !!display_num && display_num > 0
            ? Math.ceil(display_num / INCREMENT)
            : 1;
        }),
      };
    }),
  );
}
