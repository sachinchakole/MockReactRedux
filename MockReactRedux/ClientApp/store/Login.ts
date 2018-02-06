import { Action, Reducer } from 'redux';
import { IAppThunkAction as AppThunkAction } from './';
import { LoginInputModel } from '../server/LoginInputModel';
import { IApiResult as ApiResult } from '../server/ApiResult';
import { push } from 'react-router-redux';
import { authHeader } from '../helper/authHeader';

export interface ILoginState {
    loggedin: boolean;
    userId?: string;
    userName?: string;
    error?:string;
} 

interface IStartLoginAction { type: 'START_LOGIN' }
interface ILoginSuccessAction { type: 'LOGIN_SUCCESS', payload: ApiResult}
interface ILoginFailedAction { type: 'LOGIN_FAILED', payload: { error:string }  }

interface IUserLogoutAction { type: 'USER_LOGOUT'}

type KnownAction = | IStartLoginAction | ILoginSuccessAction | ILoginFailedAction | IUserLogoutAction;



export const actionCreators = {
    loginSuccess: (user: ApiResult): AppThunkAction<KnownAction> => (dispatch, getState) => {
        return (() => {
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            dispatch((push('/')) as any);
        })();

    },
    startLogin: (loginInput: LoginInputModel): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'START_LOGIN'});
        return fetch(`api/Account/Login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginInput)

                }).then(response=> response.json() as Promise<ApiResult>)
            .then(user => {
               
                localStorage.setItem('user', JSON.stringify(user));
                dispatch((actionCreators.loginSuccess(user)) as any);
                authHeader(user.token);
                console.log('loggedin User: ' + localStorage.user);

            }).catch(error => {
                console.log('login failed with: ' + error.message);
                dispatch({ type: 'LOGIN_FAILED', payload: { error: 'Username or password is incorrect' } });
            });
        
    },
    logout: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
        
        if (localStorage.length > 0) {
            dispatch({ type: 'USER_LOGOUT' });
            return localStorage.removeItem('user');    
        }
        
    } 

}

//let user = JSON.parse(localStorage.getItem('user')as any);
//const initialState: ILoginState = <ILoginState>(user? { loggedIn: true, username: user.username, userId:user.id } : {});

export const reducer: Reducer<ILoginState> = (state: ILoginState, action: KnownAction) => {
    switch (action.type) {
        case 'START_LOGIN':
            return { loggedin: false };
        case 'LOGIN_SUCCESS':
            return { loggedin: true, user: action.payload };
        case 'LOGIN_FAILED':
            return { loggedin: false, error: action.payload.error };
        case 'USER_LOGOUT':
            return { loggedin: false };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || {loggedin: false} ;
}
