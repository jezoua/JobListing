import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplyModalService } from '../../../app-core/services/applyModal.service';
import { JobsListingStore } from '../../../app-core/stores/jobs-listing/jobs-listing.store';
import { UserEvents } from '../../../app-core/stores/user/user.events';
import { injectDispatch } from '@ngrx/signals/events';
import { User } from '../../../app-core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStore } from '../../../app-core/stores/user/user.store';

@Component({
  selector: 'app-apply',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apply.html',
  styleUrl: './apply.css',
})
export class Apply {
  private readonly applyModalService = inject(ApplyModalService);

  private formBuilder = inject(FormBuilder);

  #jobsListingStore = inject(JobsListingStore);

  private snackBar = inject(MatSnackBar);

  //to dispatch user events that the store reducer is listening to
  #events = injectDispatch(UserEvents);
  //to access userStore
  #userStore = inject(UserStore);

  //get active_job to get active job details
  public readonly active_job = this.#jobsListingStore.active_job;

  maxFileSize = 3 * 1024 * 1024; // 3MB

  form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    country: ['', Validators.required],
    education: ['', Validators.required],
    currentPosition: ['', Validators.required],
    company: ['', Validators.required],
    cv: [null as File | null, []],
    coverLetter: ['', Validators.required],
  });

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && file.size <= this.maxFileSize) {
      this.form.patchValue({ cv: file });
    } else {
      this.form.patchValue({ cv: null });
      alert('CV must be less than 3MB.');
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!control?.touched && control?.hasError(error);
  }

  submit() {
    if (this.form.valid) {
      this.#events.saveUserData(this.form.value as User);
      if (!!this.active_job()?.id) {
        this.#events.applyToJob(this.active_job()!.id);
      }
      this.close();
      this.snackBar.open('Application submitted!', 'Dismiss');
    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.applyModalService.close();
  }

  onInit() {
    console.log(this.#userStore.data());
  }

  //effect usage is unavoidable
  private readonly autofillEffect = effect(() => {
    const user_data = this.#userStore.data();
    if (!!user_data) {
      this.form.patchValue(user_data);
    }
  });

  constructor() {

    //autofill form if data exists
    this.autofillEffect
  }
}
