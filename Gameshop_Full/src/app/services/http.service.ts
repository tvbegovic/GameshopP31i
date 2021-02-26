
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { BlockUIService } from './block-ui.service';

import { tap } from 'rxjs/operators';
import { Settings } from './settings';



@Injectable()
export class HttpService {

    constructor(private http: HttpClient, private blockUIService: BlockUIService) {
    }
   

    public post<T>(url: string, object: any): Observable<T> {

        this.blockUIService.startBlock();

        return this.http.post<T>(url, object).pipe(
          tap(
            () => this.blockUIService.stopBlock(),
            () => this.blockUIService.stopBlock()
          )
        );

    }


    public postNoBlock<T>(url: string, object: any): Observable<T> {

      return this.http.post<T>(url, object);
    }

    public get<T>(url: string, options?: any): Observable<any> {


      this.blockUIService.startBlock();

      if (options == null) {
          options = {};
      }


      return this.http.get<T>(url, options).pipe(
        tap(
          () => this.blockUIService.stopBlock(),
          () => this.blockUIService.stopBlock()
        ));
    }

    public getNoBlock<T>(url: string, options?: any): Observable<any> {
        if (options == null) {
            options = {};
        }

        return this.http.get<T>(url, options);
    }

    public put<T>(url: string, object: any): Observable<T> {

        this.blockUIService.startBlock();

        return this.http.put<T>(url, object).pipe(
          tap(
            () => this.blockUIService.stopBlock(),
            () => this.blockUIService.stopBlock()
          )
        );
    }

    public putNoBlock<T>(url: string, object: any): Observable<T> {

        return this.http.put<T>(url, object);
    }

    private BuildHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json; charset=utf-8');
        headers = headers.append('Accept', 'q=0.8;application/json;q=0.9');

         if (typeof (Storage) !== 'undefined') {
           const token = localStorage.getItem(Settings.accessTokenKey);
            if (token != null) {
                headers = headers.append('Authorization', 'Bearer ' + token);
            }
        } 

        return headers;
    }

    public delete<T>(url: string, options?: any) {

        if (options == null) {
            options = {};
        }        
        return this.http.delete<T>(url, options);
    }

}
