import { Component, inject } from '@angular/core';
import { JobsListingStore } from '../../../app-core/stores/jobs-listing/jobs-listing.store';
import { JobsListingEvents } from '../../../app-core/stores/jobs-listing/jobs-listing.events';
import { injectDispatch } from '@ngrx/signals/events';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RelativeTimePipe } from '../../../shared/pipes/relative-time.pipe';
import { NavBar } from '../../molecules/nav-bar/nav-bar';
import { LoadingSpinner } from '../../atoms/loading-spinner/loading-spinner';
import { Paginator } from '../../molecules/paginator/paginator';
import { JobDetails } from '../../molecules/job-details/job-details';
import { JobsListing as Job } from '../../../app-core/models/jobs-listing.model';

@Component({
  selector: 'app-jobs-listing',
  imports: [
    NgOptimizedImage,
    RelativeTimePipe,
    NavBar,
    LoadingSpinner,
    Paginator,
    JobDetails,
    CommonModule
  ],
  templateUrl: './jobs-listing.html',
  styleUrl: './jobs-listing.css',
  providers: [JobsListingStore],
})
export class JobsListing {
  #jobsListingStore = inject(JobsListingStore);
  #events = injectDispatch(JobsListingEvents);

  protected readonly jobs_to_display =
    this.#jobsListingStore.jobsListing_display;
  protected readonly is_loading = this.#jobsListingStore.isLoading;
  protected readonly active_job = this.#jobsListingStore.active_job;

  ngOnInit(): void {
    this.#events.load();
  }
  loadMore() {
    this.#jobsListingStore.showMoreJobs();
    this.#events.load();
  }
  setActiveJob(job: Job | undefined) {
    this.#events.setActiveJob(job);
  }
}
