import { Component, inject, signal } from '@angular/core';
import { LogInModalService } from '../../../app-core/services/logInModal.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserEvents } from '../../../app-core/stores/user/user.events';
import { injectDispatch } from '@ngrx/signals/events';
import { Credential } from '../../../app-core/models/credential.model';
import { UserStore } from '../../../app-core/stores/user/user.store';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LogIn {
  //to access user events
  #userEvents = injectDispatch(UserEvents)
  #userStore = inject(UserStore)



  //to hide and show logIn modal
  public readonly logInModalService = inject(LogInModalService);

  private formBuilder = inject(FormBuilder);

  //to display error when wrong credential

  public wrong_creds = signal<boolean>(false)

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  closeLogIn() {
    this.logInModalService.close();
  }

  submit() {
    const formValue = this.form.value;

    if (!!formValue  && this.form.valid) {
      if(this.#userStore.username() === formValue.username && this.#userStore.password() === formValue.password){

      this.#userEvents.logIn()

      this.closeLogIn()
      }
      else{

        this.wrong_creds.set(true)
      }

    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!control?.touched && control?.hasError(error);
  }

}
