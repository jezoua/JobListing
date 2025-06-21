import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { INCREMENT, JobsListingState } from './jobs-listing.store';
import { computed } from '@angular/core';

export function withJobsListingComputeds() {
  return signalStoreFeature(
    type<{ state: JobsListingState }>(),
    withComputed((state) => {
      return {
        jobsListing_display: computed(() => {
          const filters = state.filters().split(/\s+/);
          const data = state.data()?.data;
          if (filters[0] !== '' || filters.length > 1) {
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

            return [strictly_filtered, leniently_filtered].flat()
            //return strictly_filtered
          }
          return data;
        }),
        isLoading: computed(() => {
          return state.isLoading();
        }),
        favourites: computed(() => {
        return state.favouriteIds();
        })
      };
    }),
    withComputed(({jobsListing_display}) => {
      return {
        number_of_pages: computed(() => {
          const display_num  = jobsListing_display()?.length
          return !!display_num && display_num > 0 ? Math.ceil(display_num / INCREMENT) : 1
        })
      }}),
  )
}
