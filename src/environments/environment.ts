export const API_GATEWAY = {
  SERVER: 'http://localhost:8080/'
};

export const environment = {
  production: false,
  API : {
    UPLOAD: {
      GET_ALL: API_GATEWAY.SERVER + 'upload/get-all',
      SAVE: API_GATEWAY.SERVER + 'upload/save',
      GET_FILE: API_GATEWAY.SERVER + 'upload/get-file'
    },
    USER: {
      GET_ALL: API_GATEWAY.SERVER + 'user/get-all',
      SAVE: API_GATEWAY.SERVER + 'user/save',
      UPDATE: API_GATEWAY.SERVER + 'user/update',
      DELETE_BY_ID: API_GATEWAY.SERVER + 'user/delete-by-id',
      AUTHENTICATE: API_GATEWAY.SERVER + 'user/authenticate'
    },
    COMMENT: {
      GET_BY_UPLOAD_ID: API_GATEWAY.SERVER + 'comment/get-by-upload-id',
      SAVE: API_GATEWAY.SERVER + 'comment/save'
    }
  }
};
