import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplyModalService } from '../../../app-core/services/applyModal.service';
import { JobsListingStore } from '../../../app-core/stores/jobs-listing/jobs-listing.store';

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
    const control  = this.form.get(controlName);
    return !!control?.touched && control?.hasError(error);
  }

  submit() {
    if (this.form.valid) {
    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.applyModalService.close();
  }
}
