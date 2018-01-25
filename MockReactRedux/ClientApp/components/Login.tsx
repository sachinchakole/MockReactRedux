﻿import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as LoginStore from '../store/Login';
import { FormGroup, Form } from 'react-bootstrap';


type LoginProp = LoginStore.ILoginState & typeof LoginStore.actionCreators & RouteComponentProps<{}>; 


export default class Login extends React.Component<LoginProp, {}>{
    constructor(props: LoginProp) {
        super(props);
        this.state = {
            loginData: {
                username: '',
                password:''
            },
            submitted:false
        }
    }

    handleChange(event: any) {

        this.setState({
            loginData: { ...this.state.loginData, [event.target.name]: event.target.value }

        });
    }
    handleSubmit(event: any) {
        this.setState({submitted:true});
        event.preventDefault();
    }

    render() {

        console.log(this.state);

        const { loginData, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form onSubmit={(e:any)=> this.handleSubmit(e)}>
                    <div className={'form-group' + (submitted && !loginData.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={loginData.username} onChange={(e:any)=> this.handleChange(e)} />
                        {submitted && !loginData.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !loginData.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={loginData.password} onChange={(e: any) => this.handleChange(e)}/>
                            {submitted && !loginData.password &&
                                <div className="help-block">Password is required</div>
                            }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                     </div>
                </form>
            </div>
        );
    }
}