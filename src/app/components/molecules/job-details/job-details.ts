import { Component, effect, inject } from '@angular/core';
import { JobsListingStore } from '../../../app-core/stores/jobs-listing/jobs-listing.store';
import { RelativeTimePipe } from '../../../shared/pipes/relative-time.pipe';
import { NgOptimizedImage } from '@angular/common';
import { JobsListingEvents } from '../../../app-core/stores/jobs-listing/jobs-listing.events';
import { injectDispatch } from '@ngrx/signals/events';

@Component({
  selector: 'app-job-details',
  imports: [RelativeTimePipe, NgOptimizedImage],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {
  #jobsListingStore = inject(JobsListingStore);
  #events = injectDispatch(JobsListingEvents);

  public readonly active_job = this.#jobsListingStore.active_job;
  public readonly favourites = this.#jobsListingStore.favourites;

  addFavourite(job_id: string | undefined) {
    console.log('l;k;lkjlk;j');
    this.#events.addFavourite(job_id);
  }
  removeFavourite(job_id: string | undefined) {
    console.log('remove');
    this.#events.removeFavourite(job_id);
  }
  constructor() {
    effect(() => {
      console.log(this.favourites());
    });
  }
}
