import * as React from 'react';
import { RouteProps, Route, Redirect, RouteComponentProps } from 'react-router-dom';


type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>



export default ({ component, ...rest }: any) => {
  
    const renderFn: (Component?: any) => (props: any) => any = (Component?: RouteComponent) => (props: RouteProps) => {
        if (!Component) {
            return null;
        }
       
        let user = JSON.parse(localStorage.getItem('user') as any);
        if (user !== null) {
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