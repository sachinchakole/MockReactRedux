import * as React from 'react';
import { RegisterVm } from '../server/RegisterVm';
import { Action, Reducer } from 'redux';


export interface IRegisterState {
    user: RegisterVm,
    isSubmitted: boolean,

}

export interface IRequestAction {
    type: 'REGISTER_REQUEST',
    message: 'Request sent',
    user:RegisterVm,
}
export interface ISuccessAction {
    type: 'REGISTER_SUCCESS',
    message: 'Register succesfull',
}
export interface IFailureAction {
    type: 'REGISTER_FAILURE',
    message: 'Error while processing.........',
}

type KnowAction = IRequestAction | ISuccessAction | IFailureAction;

export const actionCreators = {
    request: (user:RegisterVm) => <IRequestAction>{ type: 'REGISTER_REQUEST', user: user },
    success: () => <ISuccessAction>{ type: 'REGISTER_SUCCESS' },
    failure: () => <IFailureAction>{ type: 'REGISTER_FAILURE' }

}

export const reducer: Reducer<IRegisterState> = (state:IRegisterState, action: KnowAction) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return Object.assign({}, state, { message:action.message });
        case 'REGISTER_SUCCESS':
            return Object.assign({}, state, { message:action.message });
        case 'REGISTER_FAILURE':
            return Object.assign({}, state, { message: action.message });
        default:
            const exhaustiveCheck: never = action;
    }
}
