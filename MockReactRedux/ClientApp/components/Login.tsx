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
    componentDidMount() {
        this.props.logout();
    }

    handleChange(event: any) {

        this.setState({ 
            loginData: { ...this.state.loginData, [event.target.name]: event.target.value },
            loggedin:this.state.loggedin

        });
    }
    handleSubmit(event: any) {
        event.preventDefault();
      
        this.setState({ submitted: true});
        const { loginData } = this.state;
        if (loginData.username && loginData.password)
            this.props.startLogin(loginData);
        
    }

    render() {
        const { loggedin } = this.props;
        console.log('loggedIn:', loggedin);
        const { loginData, submitted } = this.state;
        return (
            <div className="col-md-6">
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
                        {loggedin &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>
                     </div>
                    <div className="help-block">{submitted ? this.props.error : ''}</div>
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

