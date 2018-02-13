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
   
    handleDelete(e: any, id:number) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this Product?')) {

            this.props.deleteProduct(id);
        }
       
        
    }

    handleUpdate(e: any, id: number) {
        e.preventDefault();
        
    }

   
    
    public render() {
        const { products } = this.props;
        console.log(products);
        const emptyMessg = (<p>There is no products in collection</p>);
        const prodList = (<table className="table table-striped">
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
                        <td><button type="button" className="btn btn-info btn-sm" onClick={(e: any) => this.handleDelete(e, prod.id)} style={{ marginRight: '5px' }}>Delete</button>
                            <button type="button" className="btn btn-info btn-sm" onClick={(e: any) => this.handleUpdate(e, prod.id)} style={{ marginRight: '5px' }}>Update</button>
                            
                        </td>
                    </tr>
                )}
                              </tbody>
                          </table>);
        return <div>
            <h1>Product</h1>
            <Link className='btn btn-info btn-sm' to={'/newproduct'}>Add New</Link>
            <div>
                {products.length === 0 ? emptyMessg : prodList}

            </div>
               </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.product, // Selects which state properties are merged into the component's props
    ProductStore.actionCreators                // Selects which action creators are merged into the component's props
)(Product) as typeof Product;