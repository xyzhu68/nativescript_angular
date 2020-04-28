
import { RouterExtensions } from 'nativescript-angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, Observable } from 'rxjs';
import { User } from './user.model';
import { RoutingService } from '@src/app/helpers/routing.service';
import { DialogService } from '@src/app/helpers/dialog.service';
import { StorageService } from '@src/app/helpers/storage.service';


const FIREBASE_API_KEY = 'AIzaSyB6isZ-FBzK9Bp8YsfJBPJiNZfRIW4LEQA';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private routingService: RoutingService,
        private dialogService: DialogService,
        private storageService: StorageService
    ) {}

    get user() {
        return this._user.asObservable();
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`
            , { email: email, password: password, returnSecureToken: true }
        ).pipe(
            catchError(errorRes => {
                this.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            tap(resData => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localId, parseInt(resData.expiresIn, 10));
                }
            })
        );
    }

    logout() {
        this._user.next(null);
        this.storageService.remove('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.routingService.replace(['/auth']);
    }

    autoLogin(): Observable<boolean> {
        if (!this.storageService.hasKey('userData')) {
            return of(false);
        }
        const userData: {email: string; id: string; _token: string; _tokenExpirationDate: string; } =
            JSON.parse(this.storageService.getString('userData'));
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            return of(true);
        }
        return of (false);
    }

    autoLogout(expiryDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expiryDuration);
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
            , { email: email, password: password, returnSecureToken: true }
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.error.message);
            return throwError(errorRes);
        }),
            tap(resData => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localId, parseInt(resData.expiresIn, 10));
                }
            })
        );
    }

    private handleLogin(email: string, token: string, userId: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.storageService.storeString('userData', JSON.stringify(user));
        this.autoLogout(user.timeToExpiry);
        this._user.next(user);
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                this.dialogService.alert('This email address exists already!');
                break;
            case 'INVALID_PASSWORD':
                this.dialogService.alert('Your password is invalid');
                break;
            default:
                this.dialogService.alert('Authentication failed, check your credentials.');
        }
    }
}
