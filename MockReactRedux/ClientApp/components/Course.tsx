import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IApplicationState as ApplicationState } from '../store';
import { Grid, Row, Col, Well, Panel, PanelGroup, Button, FormGroup, Form, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import * as CourseStore from '../store/Course';
import { connect } from 'react-redux';
import { CourseVM } from '../server/CourseVM';

type CourseProp =
    CourseStore.ICourseState
    & typeof CourseStore.actionCreators
    & RouteComponentProps<{}>; 

const initialForm: CourseVM = {
    name: '',
    email:''
}
class Course extends React.Component<CourseProp, CourseVM> {
    //initialise state for the form in constructor
    constructor(props: CourseProp) {
        super(props);
        this.state = { ...initialForm, ...props.courses };
        
    }
    handleChange = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });

    }
    componentWillReceiveProps(nextProps: CourseProp) {
        if (this.state !== nextProps.courses)
            this.setState(nextProps.courses);
    }
    submit = (event: React.FormEvent<Form>) => {
        this.props.submitForm(this.state);
        event.preventDefault();
       
    }
    
    public render() {
        return (<div>
            <h1>Courses</h1>
                    
                    <div className="col-sm-5">
                <Form horizontal action="/about" method="post" onSubmit={this.submit}>
                        <fieldset>
                            <legend className="text-center">Sample Form</legend>
                            <FormGroup>
                            <Col md={10} mdOffset={1}>
                                <ControlLabel>Name</ControlLabel>
                                  <FormControl name="name" type="text" onChange={this.handleChange} value={this.state.name} placeholder="Name" />
                            </Col>
                                <Col md={10} mdOffset={1}>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl name="email" type="text" onChange={this.handleChange} value={this.state.email} placeholder="email" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={11} className="text-center">
                                    <Button type="submit" bsSize="sm" bsStyle="primary">Submit</Button>
                                </Col>
                            </FormGroup>
                        </fieldset>
                    </Form>
                    </div>
                    <div className="col-sm-6">
                {this.props.courses.name} {this.props.courses.email}
                    </div>
                </div>
        );
    }

    
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.course,
    CourseStore.actionCreators
)(Course) as typeof Course;