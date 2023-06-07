import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';

@Component({
  templateUrl: 'login.component.html' ,
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    error?: string;
    success?: string;

    isValidEmail(inputEmail: string) {
      return this.form.controls[inputEmail].errors;
    }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,

    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // show success message after registration
        if (this.route.snapshot.queryParams.registered) {
          console.log("this.route.snapshot.queryParams.registered --  ", this.route.snapshot.queryParams.registered);

          this.success = 'Registration successful';
      }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alert on submit
        this.error = '';
        this.success = '';
        console.log("this.form.invalid  -- ", this.form.invalid);
        console.log("this.success  -- ", this.success);
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  console.log("this.f.email.value  -  ", this.f.email.value);
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.error = error;
                    console.log(error);
                    this.loading = false;
                }
            });
    }
}
