import { Component, effect, inject } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { JobsListingEvents } from '../../../app-core/stores/jobs-listing/jobs-listing.events';
import { injectDispatch } from '@ngrx/signals/events';
import { SignUpModalService } from '../../../app-core/services/signUpModal.service';
import { UserStore } from '../../../app-core/stores/user/user.store';
import { UserEvents } from '../../../app-core/stores/user/user.events';
import { LogInModalService } from '../../../app-core/services/logInModal.service';

@Component({
  selector: 'app-nav-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  //to access Joblisting events that reducer listens to
  #listingEvents = injectDispatch(JobsListingEvents)
  #userEvents = injectDispatch(UserEvents)


  #userStore = inject(UserStore)


  public readonly is_logged_in = this.#userStore.isLoggedIn

  //to hide and show signup modal
  public readonly signUpModalService = inject(SignUpModalService)
  public readonly logInModalService = inject(LogInModalService)

  openSignUp(){
    this.signUpModalService.open()
  }
  openLogIn(){
    this.logInModalService.open()
  }

  logOut(){
    this.#userEvents.logOut()
  }


  private formBuilder = inject(FormBuilder);

  public readonly formGroup = this.formBuilder.group({
    filter: [''],
  });



  ngOnInit() {
    //to update filter in JobListing signal store as the user types
    this.formGroup.valueChanges.pipe(debounceTime(300)).subscribe(() => {

      console.log(this.formGroup.value.filter)
      this.#listingEvents.filter(this.formGroup?.value?.filter || '')

    });
  }
}
