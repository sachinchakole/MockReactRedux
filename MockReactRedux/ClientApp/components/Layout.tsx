import * as React from 'react';
import NavMenu from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
                
                    <NavMenu />
                
                    <div style={{ top: '50px' }} className='col-lg-8 col-md-7 col-sm-6' >
                    { this.props.children }
                </div>
            
        </div>;
    }
}

//validation for child components
//Layout.propTypes = {
//    children: React.PropTypes.object.isRequired,
//}
