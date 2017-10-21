import * as images from "./images.actions";
import { Action } from "@ngrx/store";

export interface State {
    loaded: boolean;
    loading: boolean;
    entities: any[];
    count: number;
    page: number;
    currentQuery: string;
    errorMessage: string;
    downloading: boolean;
    downloaded: boolean;
    selectedUrl: string;
    downloadedBase64Image: string;
    downloadErrorMessage: string;
  }
  
  const initialState: State = {
    loaded: false,
    loading: false,
    entities: [],
    count: 0,
    page: 1,
    currentQuery: "",
    errorMessage: null,
    downloading: false,
    downloaded: true,
    selectedUrl: null,
    downloadedBase64Image: null,
    downloadErrorMessage: null
  };
  
  export function reducer(
    state = initialState,
    action: Action
  ): State {
    switch (action.type) {
      case images.ImageActionTypes.LOAD: {
        const payload = (action as images.LoadImagesAction).payload;
        return {
          ...state,
          loaded: false,
          loading: true,
          page: payload.page,
          currentQuery: payload.query,
          errorMessage: null
        };
      }
      case images.ImageActionTypes.LOAD_SUCCESS: {
        const payload = (action as images.LoadImagesSuccessAction).payload;
        const images = payload.hits;
        const count = payload.totalHits;
        return {
          ...state,
          loaded: true,
          loading: false,
          entities: images,
          count: count
        };
      }
      case images.ImageActionTypes.LOAD_FAILURE: {
        return {
          ...state,
          loaded: false,
          loading: false,
          entities: [],
          count: 0,
          errorMessage: (action as images.LoadImagesFailedAction).payload.message
        };
      }
      case images.ImageActionTypes.DOWNLOAD: {
        const payload = (action as images.DownloadImageAction).payload;
        return {
          ...state,
          downloaded: false,
          downloading: true,
          selectedUrl: payload.url,
          downloadedBase64Image: null,
          downloadErrorMessage: null
        };
      }
      case images.ImageActionTypes.DOWNLOAD_SUCCESS: {
        const payload = (action as images.DownloadImageSuccessAction).payload;
        return {
          ...state,
          downloaded: true,
          downloading: false,
          downloadedBase64Image: payload.base64Image
        };
      }
      case images.ImageActionTypes.LOAD_FAILURE: {
        return {
          ...state,
          downloaded: false,
          downloading: false,
          downloadedBase64Image: null,
          errorMessage: (action as images.DownloadImageFailedAction).payload.message
        };
      }
      default:
        return state;
    }
  }
  
  export const getEntities = (state: State) => state.entities;
  export const getPage = (state: State) => state.page;
  export const getCount = (state: State) => state.count;
  export const getLoading = (state: State) => state.loading;
  export const getLoaded = (state: State) => state.loaded;
  export const getCurrentQuery = (state: State) => state.currentQuery;
  export const getErrorMessage = (state: State) => state.errorMessage;
  export const getDownloading = (state: State) => state.downloading;
  export const getDownloaded = (state: State) => state.downloaded;
  export const getSelectedUrl = (state: State) => state.selectedUrl
  export const getDownloadedBase64Image = (state: State) => state.downloadedBase64Image;
  export const getDownloadErrorMessage = (state: State) => state.downloadErrorMessage;