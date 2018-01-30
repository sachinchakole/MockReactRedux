import * as React from 'react';
import { RouteProps, Route, Redirect, RouteComponentProps } from 'react-router-dom';



//export default ({ component: Component, ...rest }: any) => (
//    <Route {...rest} render={props => (
//        localStorage.getItem('user')
//            ? <Component {...props} />
//            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//    )} />
//);

type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>

const AUTHENTICATED = false; // TODO: implement authentication logic

export default  ({ component, ...rest }: any) => {
    const renderFn: (Component?: any) => (props: any) => any = (Component?: RouteComponent) => (props: RouteProps) => {
        if (!Component) {
            return null;
        }
        
        let user = JSON.parse(localStorage.getItem('user') as any);
        if (localStorage.length > 0) {
            console.log("user loggedIn success!!");
            return <Component {...props}/>;
        }

        const redirectProps = {
            to: {
                pathname: "/login",
                state: { from: props.location },
            },
        }

        return <Redirect {...redirectProps} />;
    }

    return <Route {...rest} render={renderFn(component)}/>;
}