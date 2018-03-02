export const SET_SIGNUP_ERROR = 'SET_SIGNUP_ERROR';
export const INIT_SIGNUP_USER = 'SIGNUP_USER';
export const SET_BTN_LOADING = 'SET_BTN_LOADING'

export const CONFIRMATION ='CONFIRMATION'

export const initSignup = payload => {
  return { type: INIT_SIGNUP_USER, payload };
};

export const setSignupError = payload => {
  return { type: SET_SIGNUP_ERROR, payload };
};


export const setBtnLoading = payload => {
  return {type:SET_BTN_LOADING,payload}
}


export const verifyConfirmation = (payload)=>{

    return { type: CONFIRMATION, payload };
}