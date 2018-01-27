import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as LoginStore from '../store/Login';
import { IApplicationState as ApplicationState } from '../store';
import { FormGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LoginInputModel } from '../server/LoginInputModel';


type LoginProp = LoginStore.ILoginState & LoginInputModel & typeof LoginStore.actionCreators & RouteComponentProps<{}>; 


class Login extends React.Component<LoginProp, {}>{
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
        event.preventDefault();
        this.setState({ submitted: true });
        const { loginData } = this.state;
        if (loginData.username && loginData.password)
            this.props.startLogin(loginData);

        
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
                        <input type="text" className="form-control" name="username" value={loginData.username} placeholder="example@example.com" onChange={(e:any)=> this.handleChange(e)} />
                        {submitted &&
                            !loginData.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !loginData.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={loginData.password} placeholder="*********" onChange={(e: any) => this.handleChange(e)}/>
                            {submitted &&
                                !loginData.password &&
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
//wire up react component to redux store
export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(Login) as typeof Login;

