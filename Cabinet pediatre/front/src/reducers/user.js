import {FETCH_USER, UPDATE_USER} from "../constants/actionTypes";


export default (users=[], action)=>{
    switch (action.type){
        case FETCH_USER:
            return action.payload;
        case UPDATE_USER:
            try{
                console.log('updated')
                return users.map((user)=>(user._id === action.payload._id ? action.payload : user))
            }catch (e){
                console.log(e.message)
                console.log(action.payload)
                console.log('updating reducer user fail')
                break
            }

        default:
            return users
    }
}
