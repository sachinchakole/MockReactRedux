import { Action, Reducer } from 'redux';
import { IAppThunkAction as AppThunkAction } from './';
import {LoginInputModel} from '../server/LoginInputModel';


export interface ILoginState {
    loggedin: boolean;
    userId?: string;
    userName?: string;
   
} 

interface IStartLoginAction { type: 'START_LOGIN' }
interface ILoginSuccessAction { type: 'LOGIN_SUCCESS' }
interface ILoginFailedAction { type: 'LOGIN_FAILED' }

interface IStartLogoutAction { type: 'START_LOGOUT' }
interface ILogoutSuccessAction { type: 'LOGOUT_SUCCESS' }
interface ILogoutFailedAction { type: 'LOGOUT_FAILED' }

type KnownAction = | IStartLoginAction | ILoginSuccessAction | ILoginFailedAction | IStartLogoutAction | ILogoutSuccessAction | ILogoutFailedAction;



export const actionCreators = {
    loginSuccess: (user:any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
    },
    startLogin: (loginInput: LoginInputModel): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'START_LOGIN'});
        return fetch(`api/Account/Login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginInput)

                }).then(response => {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes("application/json")) {
                    let dd = response.json() as Promise<any>;
                    console.log('login succes' + dd);
                }
               
                //dispatch((actionCreators.loginSuccess(data)) as any);
            })
            .then(user => {
                console.log('loggedin User: ' + JSON.stringify(user));
            }).catch(reason => {
                console.log('login failed with: ' + Promise.reject(reason && reason.message));
                dispatch({ type: 'LOGIN_FAILED' });
            });
        //if (response.ok) {
        //    //const data = response.json();
        //    //dispatch((actionCreators.loginSuccess(data)) as any);
        //    
        //} else {
        //    
        //    console.log('login failed:');
        //}
    }

}

export const reducer: Reducer<ILoginState> = (state: ILoginState, action: KnownAction) => {
    switch (action.type) {
        case 'START_LOGIN':
            return { loggedin: false };
        case 'LOGIN_SUCCESS':
            return { loggedin: true };
        case 'LOGIN_FAILED':
            return { loggedin: false };
        case 'START_LOGOUT':
            return { loggedin: true };
        case 'LOGOUT_SUCCESS':
            return { loggedin: false };
        case 'LOGOUT_FAILED':
            return { loggedin: true };

        default:
            const exhaustiveCheck: never = action;
    }

    return state || {loggedin: false};
}
