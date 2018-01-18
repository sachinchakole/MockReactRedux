import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as LoginStore from '../store/Login';
import { FormGroup, Form, Button } from 'react-bootstrap';


export default class Register extends React.Component<RouteComponentProps<{}>, {}>{
    constructor(props: any) {
        super(props);
        console.log(this.state);
    }

    render() {
        console.log(this.props);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <Form>
                    <FormGroup>
                        <label htmlFor="username">First Name</label>
                        <input type="text" className="form-control" name="firstName" value='' />

                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Last Name</label>
                        <input type="password" className="form-control" name="lastName" value='' />

                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value='' />

                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value='' />

                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-primary">Register</Button>
                        <p>If already registered<Link to="/login" className="btn btn-link">Login</Link></p>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}