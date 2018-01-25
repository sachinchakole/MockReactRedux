import { Action, Reducer } from 'redux';
import { IAppThunkAction as AppThunkAction } from './';


export interface ILoginVm {
    username: string,
    password: string,
}
export interface ILoginState {
    loginData: ILoginVm,
    submitted:boolean,
   
} 

interface IStartLoginAction { type: 'START_LOGIN' }
interface ILoginSuccessAction { type: 'LOGIN_SUCCESS' }
interface ILoginFailedAction { type: 'LOGIN_FAILED' }

type KnownAction = | IStartLoginAction | ILoginSuccessAction | ILoginFailedAction;


export const actionCreators = {
    loginSuccess: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
    },
    startLogin: () => {
        
    }

}

export const reducer: Reducer<ILoginState> = (state: ILoginState, action: KnownAction) => {


    return state;
}
