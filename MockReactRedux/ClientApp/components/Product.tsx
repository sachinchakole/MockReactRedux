import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IApplicationState as ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as ProductStore from '../store/Product';

type ProductProp = ProductStore.IProductState & typeof ProductStore.actionCreators & RouteComponentProps<{}>; 

class Product extends React.Component<ProductProp, {}> {
    constructor(props: ProductProp) {
        super(props);
        
    }
    componentDidMount()
    {
        this.props.getAllProducts();
    }
    public render() {
        const { products } = this.props;
        return <div>
            <h1>Product</h1>
            <Link className='btn btn-info btn-sm' to={'/newproduct'}>Add New</Link>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((prod, index) =>
                            <tr key={index}>
                                <td>{prod.prodName}</td>
                                <td>{prod.price}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
               </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.product, // Selects which state properties are merged into the component's props
    ProductStore.actionCreators                // Selects which action creators are merged into the component's props
)(Product) as typeof Product;