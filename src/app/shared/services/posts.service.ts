import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbCreateResponce, Post } from '../interfaces';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post>{
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
    .pipe(map((responce: FbCreateResponce) => {
      return {
        ...post, id: responce.name,
        date: new Date(post.date)
      }
    }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    .pipe(map((responce: {[key: string]: any}) => {
      return Object.keys(responce).map(key => ({
        ...responce[key],
        id: key,
        date: new Date(responce[key].date)
      }))
    }))
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
    .pipe(map((post: Post) => {
      return {
        ...post, id,
        date: new Date(post.date)
      }
    }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }
}