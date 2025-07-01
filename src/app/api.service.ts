import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Formdatadetails } from './formdatadetails';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  private listUrl = 'http://49.50.112.46:3002/joinnow/list';
  private countUrl = 'http://49.50.112.46:3002/joinnow/counts';
  private postUrl = 'http://49.50.112.46:3002/joinnow/joinnowsave';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  /** Get all form data */
  getAllData(): Observable<Formdatadetails[]> {
    return this.http.get<Formdatadetails[]>(this.listUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /** Get total record count */

  getRecordCount(): Observable<{ totalJoinnow: number }> {
  return this.http.get<{ totalJoinnow: number }>(this.countUrl).pipe(
    retry(2),
    catchError(this.handleError)
  );
}

  /** Post form data */
  addorderData(data: Formdatadetails): Observable<Formdatadetails> {
    return this.http.post<Formdatadetails>(this.postUrl, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /** Error handling */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('A client-side or network error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

}
