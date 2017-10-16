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
  }
  
  const initialState: State = {
    loaded: false,
    loading: false,
    entities: [],
    count: 0,
    page: 1,
    currentQuery: "",
    errorMessage: null,
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
  