import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import * as images from "./images.actions";
import { Actions, Effect } from "@ngrx/effects";
import { ImagesService } from "./images.service";
import { LoadImagesAction, LoadImagesSuccessAction, LoadImagesFailedAction } from "./images.actions";

@Injectable()
export class ImageEffects {

  constructor(private actions: Actions, private service: ImagesService) {}
  
  @Effect()
  loadImages$ = this.actions
    .ofType(images.ImageActionTypes.LOAD)
    .switchMap(a => {
      const payload = (a as LoadImagesAction).payload;
      return this.service.getImages( { query: payload.query, page: payload.page })
        .map(result =>  new LoadImagesSuccessAction(result))
        .catch(error => Observable.of(new LoadImagesFailedAction({ message: error })));
    });
}