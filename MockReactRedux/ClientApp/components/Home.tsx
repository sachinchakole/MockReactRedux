import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IApiResult as ApiResult } from '../server/ApiResult';
import { IApplicationState as ApplicationState } from '../store';
import * as HomeStore from '../store/Home';
import { connect } from 'react-redux';

type UsersProp = HomeStore.IUserState & typeof HomeStore.actionCreators & RouteComponentProps<{}>; 


class Home extends React.Component<UsersProp, {}> {
    constructor(props: UsersProp) {
        super(props);
    }
    
    componentDidMount() {
       
       this.props.startGetAll();
    }

    public render() {
        const { users, loading } = this.props;
        console.log(users);
        return <div>
            <h1>Hello, world!</h1>
           
            <p>Welcome to your new single-page application, built with:</p>
            <ul>
                <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                <li><a href='https://facebook.github.io/react/'>React</a>, <a href='http://redux.js.org'>Redux</a>, and <a href='http://www.typescriptlang.org/'>TypeScript</a> for client-side code</li>
                <li><a href='https://webpack.github.io/'>Webpack</a> for building and bundling client-side resources</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
            </ul>
            <h3>All registered users:</h3>
            {loading && <em>Loading users...</em>}

            {this.renderUsers()}
            <p> <Link className='btn btn-info btn-sm' to={'/login'}> Logout</Link></p>
        </div>;
    }
    private renderUsers() {
        return <table className='table'>
                   <thead>
                <tr>
                            <th>First Name</th>
                           <th>Last Name</th>
                           <th>Email</th>
                       </tr>
                   </thead>
                   <tbody>
                     {this.props.users.map((user, index) => 
                    <tr key={index}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>

                    </tr>
                )}  
            </tbody>
        </table>;
    }

}
export default connect(
    (state: ApplicationState) => state.home, // Selects which state properties are merged into the component's props
    HomeStore.actionCreators                // Selects which action creators are merged into the component's props
)(Home) as typeof Home;