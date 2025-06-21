import { Component, effect, inject } from '@angular/core';
import { JobsListingStore } from '../../../app-core/stores/jobs-listing/jobs-listing.store';
import { RelativeTimePipe } from '../../../shared/pipes/relative-time.pipe';
import { NgOptimizedImage } from '@angular/common';
import { JobsListingEvents } from '../../../app-core/stores/jobs-listing/jobs-listing.events';
import { injectDispatch } from '@ngrx/signals/events';
import { ApplyModalService } from '../../../app-core/services/applyModal.service';

@Component({
  selector: 'app-job-details',
  imports: [RelativeTimePipe, NgOptimizedImage],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {
  #jobsListingStore = inject(JobsListingStore);
  #events = injectDispatch(JobsListingEvents);
  private readonly applyModalService = inject(ApplyModalService);

  //to get active job details
  public readonly active_job = this.#jobsListingStore.active_job;

  //to get list of favourites.id
  public readonly favourites = this.#jobsListingStore.favourites;

  addFavourite(job_id: string | undefined) {
    this.#events.addFavourite(job_id);
  }
  removeFavourite(job_id: string | undefined) {
    this.#events.removeFavourite(job_id);
  }

  apply() {
    this.applyModalService.open();
  }
}
