import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AuthService } from '~/app/auth/auth.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLogin = true;
    isLoading = false;

    @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;
    @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;

    constructor(private router: RouterExtensions, private autService: AuthService) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
            password: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.minLength(6)]})
        });

        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });
        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === 'VALID';
        });
    }

    onSignin() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        if (!this.form.valid)
            return;
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        this.isLoading = true;
        if (this.isLogin) {
            this.autService.login(email, password).subscribe(resData => {
                this.isLoading = false;
                this.router.navigate(['/challenges'], {clearHistory: true});
            }, err => {
                console.log(err);
                this.isLoading = false;
            });
        } else {
            this.autService.signUp(email, password).subscribe(resData => {
                this.isLoading = false;
                this.router.navigate(['/challenges'], {clearHistory: true});
            }, err => {
                console.log(err);
                this.isLoading = false;
            });
        }
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }
}
