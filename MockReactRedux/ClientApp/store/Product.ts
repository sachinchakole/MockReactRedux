import * as React from 'react';
import { IAppThunkAction as AppThunkAction } from './';
import { fetch } from 'domain-task';
import { Action, Reducer } from 'redux';
import { IProductViewModel as ProductViewModel } from '../server/ProductViewModel';

export interface IProductState {
    product: ProductViewModel,
    isSubmitted: boolean,
}

export interface IAddProductAction {
    type: 'ADD_PRODUCT',
    payload: ProductViewModel,
}

export interface IFailureProductAction {
    type: 'FAILURE_PRODUCT',
    error: {
         message: string
    },
}
export interface ISuccessProductAction {
    type: 'SUCCESS_PRODUCT',
    payload: ProductViewModel,
}

export interface IDeleteProductAction {
    type: 'DELETE_PRODUCT',
    payload: ProductViewModel,
}
export interface IUpdateProductAction {
    type: 'UPDATE_PRODUCT',
    payload: ProductViewModel,
}

type KnowAction = IAddProductAction |
                  IDeleteProductAction |
                  IUpdateProductAction |
                  ISuccessProductAction |
                  IFailureProductAction;

export const actionCreators = {
    addProduct: (): AppThunkAction<KnowAction> => (despatch, getState) => {
        return fetch('', {

            })
            .then(response=> response.json() as Promise<ProductViewModel>)
            .then(data => {
                
            })
            .catch(error => {
                
            });
    },
    updateProduct: (): AppThunkAction<KnowAction> => (despatch, getState) => {
        return fetch('', {

            })
            .then()
            .then()
            .catch();
    },
    deleteProduct: (): AppThunkAction<KnowAction> => (despatch, getState) => {
        return fetch('', {

            })
            .then()
            .then()
            .catch();
    }
}

const newProduct: ProductViewModel = { name: '', price: '' };
const initialState: IProductState = { product: newProduct, isSubmitted: false };

export const reducer: (state: IProductState, actionProd: Action) => {} | IProductState = (state: IProductState, actionProd: Action) => {
    const action = actionProd as KnowAction;
    switch (action.type) {
    case 'ADD_PRODUCT':
        return {};
    case 'DELETE_PRODUCT':
        return {};
    case 'UPDATE_PRODUCT':
        return {};
    case 'SUCCESS_PRODUCT':
        return {};
    case 'FAILURE_PRODUCT':
        return {};

    default:
        const exhaustiveCheck: never = action; 
    }
    return initialState;
};