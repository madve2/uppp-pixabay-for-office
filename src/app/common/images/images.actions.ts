import { Action } from "@ngrx/store";

export const ImageActionTypes = {
    LOAD: "Load images",
    LOAD_SUCCESS: "Successfully loaded images",
    LOAD_FAILURE: "Failed to load images",
    SET_SELECTED: "Set selected image"
  };
  
  export class LoadImagesAction implements Action {
    type = ImageActionTypes.LOAD;
    constructor(public payload: { page: number, query: string }) {}
  }
  export class LoadImagesFailedAction implements Action {
    type = ImageActionTypes.LOAD_FAILURE;
    constructor(public payload: { message: string }){}
  }
  export class LoadImagesSuccessAction implements Action {
    type = ImageActionTypes.LOAD_SUCCESS;
    constructor(public payload: any) {}
  }
  
  export type ImageActions = LoadImagesAction | LoadImagesFailedAction | LoadImagesSuccessAction    
  