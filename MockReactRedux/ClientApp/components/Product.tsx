import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IApplicationState as ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as ProductStore from '../store/Product';

//type ProductProp = ProductStore.IProductState & typeof ProductStore.actionCreators & RouteComponentProps<{}>; 

export default class Product extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Product</h1>
            <Link className='btn btn-info btn-sm' to={'/newproduct'}>Add New</Link>
               </div>;
    }
}

//export default connect(
//    (state: ApplicationState) => state.product, // Selects which state properties are merged into the component's props
//    ProductStore.actionCreators                // Selects which action creators are merged into the component's props
//)(Product) as typeof Product;