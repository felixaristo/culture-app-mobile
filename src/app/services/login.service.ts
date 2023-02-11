import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = 'http://127.0.0.1:8000/cultureapp/auth/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private alert: AlertController
  ) { }

  login(username: string, password: string){
    var user = {
      "username": username,
      "password": password
    }
    return this.httpClient.post(this.endpoint, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError('Error occured'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status == 401){
        this.presentAlert(error.error.message);
      }
      // console.error(error);
      // console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 

  async presentAlert(message: string) {
    const alert = await this.alert.create({
      header: 'Information',
      // subHeader: 'Warning',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
