import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
  import * as fromImages from "./images/images.reducer";
  
  export interface State {
    images: fromImages.State
  }
  
  export const reducers: ActionReducerMap<State> = {
    images: fromImages.reducer
  };
  
  export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: any): State {
      console.log('state', state);
      console.log('action', action);
  
      return reducer(state, action);
    };
  }
  
  export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger]
    : [];
  
  export const getImagesState = createFeatureSelector<fromImages.State>('images');;
  export const getImagesEntities = createSelector(
    getImagesState,
    fromImages.getEntities
  );
  export const getImagesCount = createSelector(
    getImagesState,
    fromImages.getCount
  );
  export const getImagesPage = createSelector(getImagesState, fromImages.getPage);
  export const getImagesLoaded = createSelector(
    getImagesState,
    fromImages.getLoaded
  );
  export const getImagesLoading = createSelector(
    getImagesState,
    fromImages.getLoading
  );
  export const getImagesCurrentQuery = createSelector(
    getImagesState,
    fromImages.getCurrentQuery
  );
  export const getImagesErrorMessage = createSelector(
    getImagesState,
    fromImages.getErrorMessage
  );
  export const getImageDownloaded = createSelector(
    getImagesState,
    fromImages.getDownloaded
  );
  export const getImageDownloading = createSelector(
    getImagesState,
    fromImages.getDownloading
  );
  export const getImageSelectedUrl = createSelector(
    getImagesState,
    fromImages.getSelectedUrl
  );
  export const getImageDownloadedBase64 = createSelector(
    getImagesState,
    fromImages.getDownloadedBase64Image
  );
  export const getImageDownloadErrorMessage = createSelector(
    getImagesState,
    fromImages.getDownloadErrorMessage
  );