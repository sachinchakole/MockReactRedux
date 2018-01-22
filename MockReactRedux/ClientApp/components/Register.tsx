import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState as ApplicationState } from '../store';
import * as RegisterStore from '../store/register';
import { RegisterVm } from '../server/RegisterVm';
import { FormGroup, Form, Button, ControlLabel, FormControl } from 'react-bootstrap';

type RegisterProp = RegisterStore.IRegisterState & typeof RegisterStore.actionCreators & RegisterVm & RouteComponentProps < {} > ;

class Register extends React.Component<RegisterProp, {}>{
    constructor(props: RegisterProp) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            isSubmitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event:any){
        this.setState({
            user: { ...this.state.user, [event.target.name]: event.target.value }
            
        });
    }
    handleSubmit(event:any) {
        this.setState({ isSubmitted: true });
        console.log(this.state);
        event.preventDefault();
       
        //this.setState({ isSubmitted: true });
        
    }

    render() {

        
        const { user, isSubmitted } = this.state;
       
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (isSubmitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-control" type="text" name="firstName" value={ user.firstName } onChange={ (e:any)=> this.handleChange(e) } />
                        {isSubmitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (isSubmitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-control" type="text" name="lastName" value={ user.lastName } onChange={(e: any) => this.handleChange(e) }/>
                        {isSubmitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (isSubmitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input className="form-control" type="text" name="username" value={ user.username } onChange={(e: any) => this.handleChange(e)}/>
                        {isSubmitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (isSubmitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password" value={ user.password } onChange={(e: any) => this.handleChange(e)} />
                        {isSubmitted && !user.password &&
                            <div className="help-block">password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Register</button>
                        <p>If already registered<Link to="/login" className="btn btn-link">Login</Link></p>
                    </div>
                </form>
            </div>
        );
    }
    
}
// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.register, // Selects which state properties are merged into the component's props
    RegisterStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Register) as typeof Register;