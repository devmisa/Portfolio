import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  private username = 'devmisa'; 
  private apiUrl = `https://api.github.com/users/${this.username}/repos`;

  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.apiUrl}?sort=updated&per_page=6&type=public`).pipe(
      map(repos => repos.filter(repo => !repo.fork)),
      catchError(error => {
        console.error('Error fetching repos:', error);
        return of([]);
      })
    );
  }
}
