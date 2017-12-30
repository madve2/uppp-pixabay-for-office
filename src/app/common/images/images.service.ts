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

declare var Office;

@Injectable()
export class ImagesService {
  constructor(private http: Http) {}

  downloadImage(webformatURL: string): Observable<string> {
    const hqUrl = webformatURL.replace("_640", "_960"); //The way Pixabay redommends doing it
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
    .map((dataUrl: string) => dataUrl.substr(dataUrl.indexOf(',') + 1))
    .mergeMap(base64Image => {
      if (!Office.context.document) {
        return Observable.throw("Current document is not available. Please run the add-in from PowerPoint or Word.");
      } else {
        return this.insertImage(base64Image);
      }
    })
    .catch(error => {
      if (!environment.production) console.log(error);
      return Observable.throw(error);
    });
  }

  private insertImage(base64Image : string) : Promise<string> {
    return new Promise((resolve, reject) => {
      Office.context.document.setSelectedDataAsync(base64Image, { coercionType: Office.CoercionType.Image }, function (res) {
        if (res.status === Office.AsyncResultStatus.Succeeded) {
          resolve(Office.context.host === Office.HostType.Word ? "Please deselect the added image before inserting another one!" : "");
        } else {
          reject(res.error.message);
        }
      });
    });
}

  getImages(request: {query: string, page: number, options?: any}): Observable<any> {
    let cacheKey = JSON.stringify(request);
    let cachedResponse = lscache.get(cacheKey);
    if (cachedResponse) {
      if (!environment.production)
        console.log("Found request in cache: " + cacheKey);
      return Observable.of(cachedResponse);
    }

    let requestUrl = `${environment.baseUrl}?key=${environment.apiKey}&q=${encodeURIComponent(request.query)}&page=${request.page}&per_page=10`;
    if (request.options) {
      for (var property in request.options) {
        if (request.options.hasOwnProperty(property)) {
          requestUrl += `&${property}=${request.options[property]}`;
        }
      }
    }

    return this.http
      .request(
        requestUrl,
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
