import * as React from 'react';
import { IAppThunkAction as AppThunkAction } from './';
import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { IProductViewModel as ProductViewModel } from '../server/ProductViewModel';
import { push } from 'react-router-redux';
import { authHeader } from '../helper/authHeader';

export interface IProductState {
    products: IProductVm[],
    isSubmitted: boolean,
}

export interface IProductVm {
    id:number,
    prodName: string,
    price:string,
}

export interface IGetAllAction {
    type: 'GET_ALL_PRODUCTS',
    payload:IProductVm[],
}
export interface IAddProductAction {
    type: 'ADD_PRODUCT',
    payload: IProductVm,
}

export interface IFailureProductAction {
    type: 'FAILURE_PRODUCT',
   
}
export interface ISuccessProductAction {
    type: 'SUCCESS_PRODUCT',
    
}

export interface IDeleteProductAction {
    type: 'DELETE_PRODUCT',
   payload:number,
}
export interface IUpdateProductAction {
    type: 'UPDATE_PRODUCT',
   
}

type KnowAction = IAddProductAction |
                  IGetAllAction |  
                  IDeleteProductAction |
                  IUpdateProductAction |
                  ISuccessProductAction |
                  IFailureProductAction;

export const actionCreators = {
    addProduct: (product: IProductVm): AppThunkAction<KnowAction> => (dispatch, getState) => {

        const head = {
            'Content-Type': 'application/ json',
            'Accept': 'application/json'
        };
        let task = fetch(`api/Product/Create`,
            {
                method: 'POST',
                headers: ( authHeader(), head ),
            
                    body: JSON.stringify(product)
                })
            .then(response => response.json() as Promise<IProductVm>)
            .then(data => {
                dispatch({ type: 'ADD_PRODUCT', payload: data });
                dispatch((push('/product')) as any);
            });
        addTask(task);
    },

    getAllProducts: (): AppThunkAction<KnowAction> => (dispatch, getState) => {
        
        fetch(`api/Product/GetAll`, {
            headers:authHeader()
                
            })
            .then(response => response.json() as Promise<IProductVm[]>)
            .then(data => {
                dispatch({type: 'GET_ALL_PRODUCTS', payload: data});
            });
    },

    updateProduct: (product: IProductVm): AppThunkAction<KnowAction> => (dispatch, getState) => {
        return fetch('', {

            })
            .then()
            .then()
            .catch();
    },
    deleteProduct: (id: number): AppThunkAction<KnowAction> => (dispatch, getState) => {
        const head = {
            'Content-Type': 'application/ json',
            'Accept': 'application/json'
        };

       return fetch(`api/Product/Delete/${id}`,
           {
               method: 'DELETE',
               headers: (authHeader(), head)
               
           })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'DELETE_PRODUCT', payload: id });
            });

    }
}

const newProduct: IProductVm = { id:0, prodName: '', price: '' };
const initialState: IProductState = { products: [], isSubmitted: false };

export const reducer: Reducer<IProductState> = (state: IProductState, incommingAction: Action) => {
    const action = incommingAction as KnowAction;

    switch (action.type) {

    case 'GET_ALL_PRODUCTS':
            return Object.assign({}, state, { products: action.payload });

    case 'ADD_PRODUCT':
            return Object.assign({}, state, { isSubmitted: true });

    case 'DELETE_PRODUCT':
        const id = action.payload;
        return Object.assign({}, state, { products: state.products.filter(x=>x.id !== id)});
        
    case 'UPDATE_PRODUCT':
            return Object.assign({}, state, { isSubmitted: true });

    case 'SUCCESS_PRODUCT':
            return Object.assign({}, state, { isSubmitted: true });

    case 'FAILURE_PRODUCT':
            return Object.assign({}, state, { isSubmitted: true });

    default:
        const exhaustiveCheck: never = action; 
    }
    return state || initialState;
}