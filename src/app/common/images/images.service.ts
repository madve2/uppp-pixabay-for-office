import { Injectable, Inject } from "@angular/core";
import {
  Response,
  Http,
  Headers,
  RequestOptions,
  RequestMethod,
  ResponseContentType
} from "@angular/http";
import { Store } from "@ngrx/store";
import * as fromRoot from "../index";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import lscache from 'lscache';
import { Subject } from "rxjs";

@Injectable()
export class ImagesService {
  constructor(private http: Http) {}

  downloadImage(webformatURL: string): Observable<string> {
    const hqUrl = webformatURL.replace("_640", "_960"); //The way Pixabay redommends doing it
    const dataUrlHead = "data:image/jpeg;base64,";
    return this.http.request(
      hqUrl,
      { method: RequestMethod.Get, responseType: ResponseContentType.Blob }
    )
    .map(response => response.blob())
    .mergeMap(blob => {
      const reader = new FileReader();
      const result = new Subject();
      reader.readAsDataURL(blob);
      reader.onerror = err => { throw err };
      reader.onloadend = evt => { result.next(reader.result); };
      return result;
    })
    .map((dataUrl: string) => dataUrl.substr(dataUrlHead.length))
    .catch(error => {
      if (!environment.production) console.log(error);
      return Observable.throw("Can't process image, please try again later");
    });
  }

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