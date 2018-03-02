


export const INIT_VERIFY_TOKEN = ' INIT_VERIFY_TOKEN';

export const RESET_PASSWORD ='RESET_PASSWORD'


export const initVerifyToken= (values) => {
    return { type:  INIT_VERIFY_TOKEN, payload: values }
}

export const resetPassword = (userinfo) =>{
    return {type: RESET_PASSWORD, payload: userinfo}
}

export const resetUsername= (username) =>{
    return {type :RESET_USERNAME , payload:username}
}

export const RESET_USERNAME ='RESET_USERNAME'