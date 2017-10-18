import { Injectable, Inject } from "@angular/core";
import {
  Response,
  Http,
  Headers,
  RequestOptions,
  RequestMethod
} from "@angular/http";
import { Store } from "@ngrx/store";
import * as fromRoot from "../index";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import lscache from 'lscache';

@Injectable()
export class ImagesService {
  constructor(private http: Http) {}

  getImages(request: {query: string, page: number}): Observable<any> {
    var cacheKey = JSON.stringify(request);
    let cachedResponse = lscache.get(cacheKey);
    if (cachedResponse) {
      if (!environment.production)
        console.log("Found request in cache: " + cacheKey);
      return Observable.of(cachedResponse);
    }

    return this.http
      .request(
        `${environment.baseUrl}?key=${environment.apiKey}&q=${encodeURIComponent(request.query)}&page=${request.page}&image_type=photo`,
        { method: RequestMethod.Get }
      )
      .map(response => {
        let respJson = response.json();
        lscache.set(cacheKey, respJson, 24 * 60);
        return respJson;
      })
      .catch(error => {
        if (!environment.production) console.log(error);
        return Observable.throw("Please try again later"); //TODO: can't actually get status code / error message due to CORS issue
      });
  }
}