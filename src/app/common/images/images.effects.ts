import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import * as images from "./images.actions";
import { Actions, Effect } from "@ngrx/effects";
import { ImagesService } from "./images.service";
import { LoadImagesAction, LoadImagesSuccessAction, LoadImagesFailedAction, DownloadImageAction, DownloadImageFailedAction, DownloadImageSuccessAction } from "./images.actions";
import { Subject } from "rxjs";

declare var Office;

@Injectable()
export class ImageEffects {

  constructor(private actions: Actions, private service: ImagesService) { }

  @Effect()
  loadImages$ = this.actions
    .ofType(images.ImageActionTypes.LOAD)
    .switchMap(a => {
      const payload = (a as LoadImagesAction).payload;
      return this.service.getImages({ query: payload.query, page: payload.page })
        .map(result => new LoadImagesSuccessAction(result))
        .catch(error => Observable.of(new LoadImagesFailedAction({ message: error })));
    });

  @Effect()
  downloadImage$ = this.actions
    .ofType(images.ImageActionTypes.DOWNLOAD)
    .switchMap(a => {
      const payload = (a as DownloadImageAction).payload;
      return this.service.downloadImage(payload.url)
        .map(result => new DownloadImageSuccessAction({ base64Image: result }))
        .catch(error => Observable.of(new DownloadImageFailedAction({ message: error })));
    });

  @Effect()
  downloadImageCompleted$ = this.actions
    .ofType(images.ImageActionTypes.DOWNLOAD_SUCCESS)
    .switchMap(a => {
      const payload = (a as DownloadImageSuccessAction).payload;
      const result = new Subject();
      if (!Office.context.document) {
        console.log("Current document is not available");
        result.complete();
      } else {
        Office.context.document.setSelectedDataAsync(payload.base64Image, { coercionType: Office.CoercionType.Image }, function (res) {
          if (res.status !== Office.AsyncResultStatus.Succeeded) {
            //TODO: success notification
            result.complete();
          } else {
            //TODO: error notification
            result.complete();
          }
        });
      }
      return result;
    });
}