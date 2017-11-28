import { Action } from "@ngrx/store";

export const ImageActionTypes = {
    LOAD: "Load images",
    LOAD_SUCCESS: "Successfully loaded images",
    LOAD_FAILURE: "Failed to load images",
    DOWNLOAD: "Download image",
    DOWNLOAD_SUCCESS: "Successfully downloaded & inserted image",
    DOWNLOAD_FAILURE: "Failed to download or insert image",
    CLEAR_MESSAGE: "Clear success / failure message" //TODO this isn't really an image action
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

  export class DownloadImageAction implements Action {
    type = ImageActionTypes.DOWNLOAD;
    constructor(public payload: { url: string }) {}
  }
  export class DownloadImageFailedAction implements Action {
    type = ImageActionTypes.DOWNLOAD_FAILURE;
    constructor(public payload: { message: string }){}
  }
  export class DownloadImageSuccessAction implements Action {
    type = ImageActionTypes.DOWNLOAD_SUCCESS;
    constructor(public payload: { message: string }) {}
  }
  export class ClearMessageAction implements Action {
    type = ImageActionTypes.CLEAR_MESSAGE;
    constructor() {}
  }

  export type ImageActions = LoadImagesAction | LoadImagesFailedAction | LoadImagesSuccessAction | DownloadImageAction | DownloadImageFailedAction | DownloadImageSuccessAction | ClearMessageAction;
