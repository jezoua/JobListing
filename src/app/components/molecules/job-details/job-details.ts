import { Component, effect, inject } from '@angular/core';
import { JobsListingStore } from '../../../app-core/stores/jobs-listing/jobs-listing.store';
import { RelativeTimePipe } from '../../../shared/pipes/relative-time.pipe';
import { NgOptimizedImage } from '@angular/common';
import { JobsListingEvents } from '../../../app-core/stores/jobs-listing/jobs-listing.events';
import { injectDispatch } from '@ngrx/signals/events';
import { ApplyModalService } from '../../../app-core/services/applyModal.service';
import { UserStore } from '../../../app-core/stores/user/user.store';
import { UserEvents } from '../../../app-core/stores/user/user.events';

@Component({
  selector: 'app-job-details',
  imports: [RelativeTimePipe, NgOptimizedImage],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {
  #jobsListingStore = inject(JobsListingStore);

  //for accessing applied_jobs
  #userStore = inject(UserStore);
  public readonly applied_jobs = this.#userStore.applied_jobs;

  //to access user events
  #userEvents = injectDispatch(UserEvents)


  //to access job listing events
  #listingEvents = injectDispatch(JobsListingEvents);

  private readonly applyModalService = inject(ApplyModalService);

  //to get active job details
  public readonly active_job = this.#jobsListingStore.active_job;

  //to get list of favourites.id
  public readonly favourites = this.#userStore.favouriteIds;

  addFavourite(job_id: string | undefined) {
    this.#userEvents.addFavourite(job_id);
  }
  removeFavourite(job_id: string | undefined) {
    this.#userEvents.removeFavourite(job_id);
  }

  apply() {
    this.applyModalService.open();
  }
}
