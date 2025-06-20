import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { JobsListingEvents } from '../../../app-core/stores/jobs-listing/jobs-listing.events';
import { injectDispatch } from '@ngrx/signals/events';

@Component({
  selector: 'app-nav-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  #events = injectDispatch(JobsListingEvents)
  private formBuilder = inject(FormBuilder);

  public readonly formGroup = this.formBuilder.group({
    filter: [''],
  });

  private readonly filterChanges = toSignal(this.formGroup.valueChanges);

  private readonly filterChangeEffect = effect(() => {
    this.filterChanges();
  });

  ngOnInit() {
    this.formGroup.valueChanges.pipe(debounceTime(300)).subscribe(() => {

      console.log(this.formGroup.value.filter)
      this.#events.filter(this.formGroup?.value?.filter || '')

    });
  }
}
