import { signalStoreFeature, type } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { JobsListingEvents } from './jobs-listing.events';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { JobsListingState } from './jobs-listing.store';
import { environment } from '../../../../environments/environment';
import { exhaustMap, tap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { PHPResourceResponse } from '../../models/php-resource-response.model';
import { JobsListing } from '../../models/jobs-listing.model';

export function withJobsListingEffects() {
  return signalStoreFeature(
    type<{ state: JobsListingState }>(),
    withEffects((store) => {
      const events = inject(Events);
      const httpClient = inject(HttpClient);
      const api = environment.api;
      return {
        //for listening to load event
        //used in combination with loaded event that is handled by a reducer to write to store
        //since writing to the state inside effect is not advisable
        //effect is also a good spot to run async tasks like http request
        load$: events.on(JobsListingEvents.load).pipe(
          exhaustMap(() =>
            httpClient
              .get<
                PHPResourceResponse<JobsListing>
              >(`${api}&per_page=${store.numberOfItemsToDisplay()}`)
              .pipe(
                mapResponse({
              //calling loaded event and feeding payload
                  next: (jobsListing) => JobsListingEvents.loaded(jobsListing),
                  error: console.error,
                }),
              ),
          ),
        ),
      };
    }),
  );
}
