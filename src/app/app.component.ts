import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from './common/index';
import * as images from './common/images/images.actions';
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  images$ : Observable<any>;
  imagesCount$ : Observable<number>;
  imagesPage$ : Observable<number>;
  imagesLoading$ : Observable<boolean>;
  imagesLoaded$ : Observable<boolean>;
  imagesCurrentQuery$ : Observable<string>;
  imagesErrorMessage$ : Observable<string>;
  imageDownloading$ : Observable<boolean>;
  imageSelected$ : Observable<string>;
  imageDownloadSuccessMessage$ : Observable<string>;
  imageDownloadErrorMessage$ : Observable<string>;


  constructor(private store: Store<fromRoot.State>) {
    this.images$ = store.select(fromRoot.getImagesEntities);
    this.imagesCount$ = store.select(fromRoot.getImagesCount);
    this.imagesPage$ = store.select(fromRoot.getImagesPage);
    this.imagesLoading$ = store.select(fromRoot.getImagesLoading);
    this.imagesLoaded$ = store.select(fromRoot.getImagesLoaded);
    this.imagesCurrentQuery$ = store.select(fromRoot.getImagesCurrentQuery);
    this.imagesErrorMessage$ = store.select(fromRoot.getImagesErrorMessage);
    this.imageDownloading$ = store.select(fromRoot.getImageDownloading);
    this.imageSelected$ = store.select(fromRoot.getImageSelectedUrl);
    this.imageDownloadSuccessMessage$ = store.select(fromRoot.getImageDownloadSuccessMessage);
    this.imageDownloadErrorMessage$ = store.select(fromRoot.getImageDownloadErrorMessage);
  }

  ngOnInit() {
    this.store.dispatch(new images.LoadImagesAction({ query: "yellow flowers", page: 1}));
  }

  onImagesQueryChanged(request: {query: string, page: number, options?: any}) {
    this.store.dispatch(new images.LoadImagesAction({ query: request.query, page: request.page, options: request.options }));
  }

  onImageRequested(webformatURL: string) {
    this.store.dispatch(new images.DownloadImageAction({ url: webformatURL }));
  }

  onMessageDismissed() {
    this.store.dispatch(new images.ClearMessageAction());
  }
}
