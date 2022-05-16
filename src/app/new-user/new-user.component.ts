import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }
  

  ngOnInit() {
    this.initForm();
  }
 
  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  
  onSubmitForm() {
    const formValue = this.userForm.value;
    const email = formValue['email'];
    const password = formValue['password'];
    
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/appareils']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}

