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
    downloadErrorMessage: string;
    downloadSuccessMessage: string;
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
    downloadErrorMessage: null,
    downloadSuccessMessage: null
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
          currentQuery: payload.query, //TODO should we store query options as well?
          errorMessage: null,
          downloading: false,
          downloaded: true,
          selectedUrl: null,
          downloadErrorMessage: null,
          downloadSuccessMessage: null
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
          downloadErrorMessage: null,
          downloadSuccessMessage: null,
        };
      }
      case images.ImageActionTypes.DOWNLOAD_SUCCESS: {
        const payload = (action as images.DownloadImageSuccessAction).payload;
        return {
          ...state,
          downloaded: true,
          downloading: false,
          downloadSuccessMessage: payload.message
        };
      }
      case images.ImageActionTypes.DOWNLOAD_FAILURE: {
        return {
          ...state,
          downloaded: false,
          downloading: false,
          downloadErrorMessage: (action as images.DownloadImageFailedAction).payload.message
        };
      }
      case images.ImageActionTypes.CLEAR_MESSAGE: {
        return {
          ...state,
          downloadErrorMessage: null,
          downloadSuccessMessage: null,
        }
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
  export const getSelectedUrl = (state: State) => state.selectedUrl;
  export const getDownloadSuccessMessage = (state: State) => state.downloadSuccessMessage;
  export const getDownloadErrorMessage = (state: State) => state.downloadErrorMessage;
