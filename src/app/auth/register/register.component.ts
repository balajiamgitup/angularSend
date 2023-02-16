import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { ToastrService } from 'ngx-toastr';

import { finalize } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';

const log = new Logger('Login');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
 registerForm!: FormGroup;
  isLoading = false;
  errTrue: boolean = false;
  showPassword: boolean=true;
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

  ngOnInit(): void {}

  register() {
    console.log('Login method called');
    if (this.registerForm.valid) {
   //   console.log("    console.log('Login method called inside if')",this.registerForm.value);
      this.isLoading = true;
      const reqObj = {
        Name: this.registerForm.value.username,
        Password: this.registerForm.value.password,
        Email:this.registerForm.value.email,
        RoleId:this.registerForm.value.roleId
      };
    
      this.authenticationService.register(this.registerForm.value).subscribe(
        
        (response: any) => {
          this.isLoading = false;
          //this._credentialService.setCredentials(response);
          console.log("insid register method",response);

          // if (response.Message = "User created successfully!") {
          //   this.toastr.success("responce ",response.message);
          //   this._router.navigate(['/login']);
          // }
          if(response.message="User created successfully!"){
            this.toastr.success(response.message);
            this._router.navigate(['/login']);
          }
          else{
      
          }
        },
        (error: any) => {
          this.isLoading = false;
          this.errTrue = true;
          this.toastr.error( error.error.message);
          console.log('error', error);
          log.error('error occured', error);
        }
      );
    }
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]],
      email: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      roleId: ['', Validators.required],
    });
  }
}