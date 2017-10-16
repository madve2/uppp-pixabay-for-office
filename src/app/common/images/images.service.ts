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

@Injectable()
export class ImagesService {
  constructor(private http: Http) {}

  getImages(request: {query: string, page: number}): Observable<any> {
    return this.http
      .request(
        `${environment.baseUrl}/api/?key=${environment.apiKey}&q=${encodeURIComponent(request.query)}&page=${request.page}&image_type=photo`,
        { method: RequestMethod.Get }
      )
      .map(response => response.json())
      .catch(response => {
        if (!environment.production) console.log(response);
        return Observable.throw(response);
      });
  }
}