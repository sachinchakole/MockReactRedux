import { IRegisterVm as RegisterVm } from '../server/RegisterVm';
import { fetch } from 'domain-task';
import { Action, Reducer } from 'redux';
import { push } from 'react-router-redux';
import { IAppThunkAction as AppThunkAction } from './';


export interface IRegisterState {
    user: RegisterVm,
    isSubmitted: boolean,

}

interface IRequestAction {
    type: 'REGISTER_REQUEST',
    payload: RegisterVm,
    
}
interface ISuccessAction {
    type: 'REGISTER_SUCCESS',
    payload: RegisterVm,
}
interface IFailureAction {
    type: 'REGISTER_FAILURE',
   //payload: string,
}

type KnowAction = IRequestAction | ISuccessAction | IFailureAction;

export const actionCreators = {
    request: (form: RegisterVm): AppThunkAction<KnowAction> => (dispatch, getState) => {
       
       // const dd = getState().register.isSubmitted;
            dispatch({ type: 'REGISTER_REQUEST', payload: form });
        let response = ((fetch(`api/Account/Register`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })) as any) as Response ;
        if (response.ok) {
            let data = ((response.json()) as any) as RegisterVm;
            dispatch({ type: 'REGISTER_SUCCESS', payload: data });
            //dispatch(push('/login'));
        } else {
            dispatch({ type: 'REGISTER_FAILURE', payload: 'Registration failed'});
        }      

    },
    success: (user: RegisterVm) => (dispatch: any, getState: any) => {
        dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    },
    failure: () => (dispatch: any, getState: any) => {
        dispatch({ type: 'REGISTER_FAILURE' });
    }

}

const newUser= { firstName: '', lastName: '', username: '', password: '' };
const initialState={ user: newUser, isSubmitted: false };


export const reducer: Reducer<IRegisterState> = (state: IRegisterState, action: KnowAction) => {
    switch (action.type) {
    case 'REGISTER_REQUEST':
        return Object.assign({}, state, { user: action.payload, isSubmitted: true });
    case 'REGISTER_SUCCESS':
        return Object.assign({}, state, { user: initialState.user, isSubmitted: false });
    case 'REGISTER_FAILURE':
        return Object.assign({}, state, { user: state.user, isSubmited: false });
    default:
        const exhaustiveCheck: never = action;

    }
    return initialState ;
};
