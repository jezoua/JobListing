import { signalStore, withState } from '@ngrx/signals';
import { withJobsListingEffects } from './jobs-listing.effects';
import { withJobsListingReducer } from './jobs-listing.reducers';
import { withJobsListingComputeds } from './jobs-listing.computeds';
import { PHPResourceResponse } from '../../models/php-resource-response.model';
import { JobsListing } from '../../models/jobs-listing.model';
import { withJobsListingMethods } from './jobs-listing.methods';

export type JobsListingState = {
  data: PHPResourceResponse<JobsListing> | undefined;
  numberOfItemsToDisplay: number;
  filters: string;
  isLoading: boolean;
};

export const INCREMENT = 10

const initialState: JobsListingState = {
  data: undefined,
  numberOfItemsToDisplay: INCREMENT,
  filters: '',
  isLoading: false,
};


export const JobsListingStore = signalStore(
  withState(initialState),
  withJobsListingReducer(),
  withJobsListingEffects(),
  withJobsListingComputeds(),
  withJobsListingMethods()
);
