import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';


export default class About extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
                   <h1>About Page</h1>
               </div>;
    }
}