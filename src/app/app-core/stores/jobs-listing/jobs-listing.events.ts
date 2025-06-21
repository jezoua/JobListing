import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { PHPResourceResponse } from '../../models/php-resource-response.model';
import { JobsListing } from '../../models/jobs-listing.model';

export const JobsListingEvents = eventGroup({
  source: 'JobsListing',
  events: {
    load: type<void>(),
    loaded: type<PHPResourceResponse<JobsListing>>(),
    filter: type<string>(),
    setActiveJob:type<JobsListing | undefined>(),
    addFavourite:type<string | undefined>(),
    removeFavourite:type<string | undefined>(),
  },
});
