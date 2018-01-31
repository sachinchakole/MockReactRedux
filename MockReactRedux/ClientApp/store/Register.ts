import { IRegisterVm as RegisterVm } from '../server/RegisterVm';
import { fetch } from 'domain-task';
import { Action, Reducer } from 'redux';
import { actionCreators as loginActionCreators } from './Login';
import { IAppThunkAction as AppThunkAction } from './';
import { push } from 'react-router-redux';


export interface IRegisterState {
    user: RegisterVm,
    isSubmitted: boolean,

}

export interface IRequestAction {
    type: 'REGISTER_REQUEST',
    payload: RegisterVm,
    
}
export interface ISuccessAction {
    type: 'REGISTER_SUCCESS',
    payload: RegisterVm,
}
export interface IFailureAction {
    type: 'REGISTER_FAILURE',
   payload: string,
}

type KnowAction = IRequestAction | ISuccessAction | IFailureAction;

export const actionCreators = {
    request: (form: RegisterVm): AppThunkAction<KnowAction> => (dispatch, getState) => {
       
       
            dispatch({ type: 'REGISTER_REQUEST', payload: form });
        return (fetch(`api/Account/Register`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                }).then(response => response.json() as Promise<RegisterVm>)
            .then(user => {
                dispatch({ type: 'REGISTER_SUCCESS', payload: user });
                dispatch(push('/login') as any);
            }).catch(error => {
                dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
            }));


    },
    success: (user: RegisterVm) => (dispatch: any, getState: any) => {
        dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    },
    failure: () => (dispatch: any, getState: any) => {
        dispatch({ type: 'REGISTER_FAILURE' });
    }

}

const newUser: RegisterVm  = { firstName: '', lastName: '', username: '', password: '' };
const initialState: IRegisterState  = { user: newUser, isSubmitted: false };


export const reducer: Reducer<IRegisterState> = (state: IRegisterState, anyAction: Action) => {
    const action = anyAction as KnowAction;
    switch (action.type) {
    case 'REGISTER_REQUEST':
        return Object.assign({}, state, { user: action.payload, isSubmitted: true });
    case 'REGISTER_SUCCESS':
        return Object.assign({}, state, { user: action.payload, isSubmitted: false });
    case 'REGISTER_FAILURE':
        return Object.assign({}, state, { user: state.user, isSubmited: false });
    default:
        const exhaustiveCheck: never = action;

    }
    return state || initialState;
};
