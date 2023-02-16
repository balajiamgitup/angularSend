import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  Name: string;
  Password: string;
   remember?: boolean;
}

export interface RegisterContext {
  Name: string;
  Password: string;
  Email:string;
  RoleId:any;

}
/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}



  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
   login(requestObj: LoginContext): Observable<any> {
    // Replace by proper authentication call
    return this.http.post('/login', requestObj, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  register(requestObj: RegisterContext): Observable<any> {
    return this.http.post('/register', requestObj, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }


  

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
   logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.clearCredentials();
    return of(true);
  }

}
