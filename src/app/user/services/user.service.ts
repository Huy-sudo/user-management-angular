import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:5234/api/User';  // URL to web api
  
  private titlesUrl = 'http://localhost:5234/api/Title/title';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  /** GET users */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/users`)
      .pipe(
        map(events => events.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())),
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/user/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** PUT: update the User on the server */
  updateUser(userId: string | number, changes: Partial<User>): Observable<any> {
    return this.http.put(this.usersUrl + '/user/' + userId, changes, this.httpOptions).pipe(
      tap(_ => console.log(`updated user id=${userId}`)),
      catchError(this.handleError<any>('updateuser'))
    );
  }

  /** POST: add a new User to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/user`, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added User w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/user/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted User id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /* GET Useres whose name contains search term */
  searchUseres(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty User array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/users/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found Useres matching "${term}"`) :
        console.log(`no Useres matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUseres', []))
    );
  }
}
