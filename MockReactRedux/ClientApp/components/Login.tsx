import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as LoginStore from '../store/Login';
import { FormGroup, Form } from 'react-bootstrap';


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
        console.log(this.state);
    }
   
    render() {
        console.log(this.props);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <Form>
                    <FormGroup>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value='' />
                        
                    </FormGroup>
                    <FormGroup>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value='' />
                        
                    </FormGroup>
                    <FormGroup>
                            <button className="btn btn-primary">Login</button>
                            <Link to="/register" className="btn btn-link">Register</Link>
                     </FormGroup>
                </Form>
            </div>
        );
    }
}