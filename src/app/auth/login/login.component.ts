import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  errTrue: boolean = false;
  constructor(
    private _router: Router,
    private _credentialService: CredentialsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    console.log('Login method called');
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.isLoading = true;
      const reqObj = {
        Name: this.loginForm.value.username,
        Password: this.loginForm.value.password,
      };
      console.log(reqObj);
      this.authenticationService.login(reqObj).subscribe(
        (response: any) => {
          
          this.isLoading = false;
          this._credentialService.setCredentials(response);
          this.toastr.success(response.message);
          if (response.roleId == 1) {
            console.log("enter to home")
            this._router.navigate(['/home']);
          }
          if (response.roleId == 2) {
            this._router.navigate(['/userhome']);
          }

        },
        (error: any) => {
          this.isLoading = false;
          this.errTrue = true;
          this.toastr.error( error?.error.message);
          console.log('error', error);
          log.error('error occured', error);
        }
      );
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
