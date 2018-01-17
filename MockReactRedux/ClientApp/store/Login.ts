import { Action, Reducer } from 'redux';

interface ILoginVm {
    email: string,
    password: string,
}
export interface ILoginState {
    loginData: ILoginVm,
    isSubmited:boolean
   
} 