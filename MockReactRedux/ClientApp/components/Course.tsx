import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IApplicationState as ApplicationState } from '../store';
import * as CourseStore from '../store/Course';
import { connect } from 'react-redux';

type CourseProp =
    CourseStore.ICourseState
    & typeof CourseStore.actionCreators
    & RouteComponentProps<{}>; 


class Course extends React.Component<CourseProp, {}> {
    //initialise state for the form in constructor
    constructor(props: any) {
        super(props);
        this.state = (({
            course: [{ title: "" }]
        }) as any);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event: any) {
        const course = this.state.course;
            this.setState({ course: course.title });    
        
    }

    onClickSave() {
        alert('Saving ');   
    }

    public render() {
        return (<div>
                   <h1>Courses</h1>
                   <h2>Add Course</h2>
                   <div className="col-sm-5"> 
                       <input className="form-control" onChange={this.onTitleChange} type="text" value={this.state.course.title} />
                       <input className="btn btn-info" onClick={this.onClickSave} type="submit" value="Save" /> 
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