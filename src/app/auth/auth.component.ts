import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage!: string;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,
    private router: Router) { }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  onSubmitForm() {
    const formValue = this.signinForm.value;
    const email = formValue['email'];
    const password = formValue['password']; 
    this.authService.signInUser(email, password).then(
      () => {
        console.log('connecté');
        this.router.navigate(['/appareils']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}

