import { Component, inject, signal } from '@angular/core';
import { SignUpModalService } from '../../../app-core/services/signUpModal.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserEvents } from '../../../app-core/stores/user/user.events';
import { injectDispatch } from '@ngrx/signals/events';
import { Credential } from '../../../app-core/models/credential.model';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  //to access user events
  #userEvents = injectDispatch(UserEvents)

  //to hide and show signup modal
  public readonly signUpModalService = inject(SignUpModalService);

  private formBuilder = inject(FormBuilder);

  public passwordMatch = signal<boolean>(true);

  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  });

  closeSignUp() {
    this.signUpModalService.close();
  }
  submit() {
    const formValue = this.form.value;
    const password_matches = formValue.password === formValue.confirm_password;

    //to display error if there is
    this.passwordMatch.set(password_matches);
    if (!!formValue && password_matches && this.form.valid) {
      this.#userEvents.signUp({
        username: formValue.username,
        password: formValue.password,
      } as Credential);
      this.closeSignUp()
    }
  }
  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!control?.touched && control?.hasError(error);
  }

}
