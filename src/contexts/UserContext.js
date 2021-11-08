import React, {createContext,useReducer}from 'react';
import {initialState,UserReducer} from '../reducers/UserReducer';

export const UserContext  = createContext();

export default ({children})=>{
    //havia igualado o useReducer "useReducer=(UserReducer,initialState) erro de que aparecida reducer is read only 3 dias para achar isso"
    const [state, dispatch]= useReducer(UserReducer,initialState);

    return (
     <UserContext.Provider value ={{state,dispatch}}>
        {children}        
        </UserContext.Provider>


    );
}
