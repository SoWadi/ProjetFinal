import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { AccountService } from '../services/account.service';


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})



export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    error?: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        //checks if the user is already logged
        private accountService: AccountService,

    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['q', Validators.required],
            lastName: ['q', Validators.required],
            email: ['q@q.fr', [Validators.required, Validators.email]],
            password: ['qqqqqq', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      //indicate that an attempt has been made to submit the form
        this.submitted = true;

        // reset alert on submit
        this.error = '';

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  console.log("this.form.value  -  ", this.form.value);
                    this.router.navigate(['/toConvertToolComponent'], { queryParams: { registered: true }});
                    alert('Cuenta creada!');
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
