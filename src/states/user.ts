import {UserType} from "../models/user";

let currentUser:UserType;

/**
 * 设置用户
 * @param user
 */
const setCurrentUserState = (user:UserType) =>{
    currentUser = user;
}
/**
 * 获取用户
 */
const getCurrentUserState = ():UserType =>{
    return currentUser;
}

export {
    getCurrentUserState,
    setCurrentUserState,
}
