import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as LoginStore from '../store/Login';


type LoginProp = LoginStore.ILoginState & RouteComponentProps<{}>; 

//export interface ILoginState {
//    email: string,
//    password: string,

//} 
//export interface ILoginProp {
//    name:string
//}

export default class Login extends React.Component<LoginProp, {}>{
    constructor(props: LoginProp) {
        super(props);
        this.state ={ ...props.loginData };
    }
   
    render() {
        console.log(this.props);
        return (
            <div>
            <h1>Login Page</h1>
            </div>
        );
    }
}