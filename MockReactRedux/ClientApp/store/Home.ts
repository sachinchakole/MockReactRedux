import { Action, Reducer } from 'redux';
import { fetch, addTask } from 'domain-task';
import { IAppThunkAction as AppThunkAction } from './';
import { IRegisterVm as RegisterVm } from '../server/RegisterVm';
import { authHeader } from '../helper/authHeader';

export interface IUserState {
    loading: boolean,
    error:string,
    users: RegisterVm[],
}


interface IStartGetAllUsers { type: 'START_GETALL' }
interface ISuccessGetAllUsers { type: 'SUCCESS_GETALL', users: RegisterVm[]}
interface IFailedGetAllUsers { type: 'FAILED_GETALL', error: string }

type KnowAction = IStartGetAllUsers | ISuccessGetAllUsers | IFailedGetAllUsers

export const actionCreators = {
    startGetAll: (): AppThunkAction<KnowAction> => (dispatch, gwtState) => {
       
        dispatch({ type: 'START_GETALL' });
        let task = fetch(`api/Account/GetAll`,
                {
                    method: 'GET',
                    headers: authHeader()
                })
            .then(response => response.json() as Promise<RegisterVm[]>)
            .then(users => {
                dispatch({ type: 'SUCCESS_GETALL', users: users });
            });
        addTask(task);
    }
}

const initialState: IUserState = { loading: false, error: '', users: [] };

export const reducer: (state: IUserState, action: KnowAction) =>
    { error: string } | { loading: boolean } | { users: Object[] } | IUserState = ((state: IUserState, action: KnowAction) => {
        //const action = anyAction as KnowAction;
        switch (action.type) {
        case 'START_GETALL':
            return { loading: false };
        case 'SUCCESS_GETALL':
            return { users: action.users, loading:false };
        case 'FAILED_GETALL':
            return { error: action.error };
        default:
            const exhaustiveCheck: never = action;
        }
        return state || initialState;
    }); 
  