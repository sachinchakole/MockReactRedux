import * as React from 'react';
import * as ProductStore  from '../store/Product';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IApplicationState as ApplicationState } from '../store';
import { connect } from 'react-redux';



type ProductProp = ProductStore.IProductState & typeof ProductStore.actionCreators & RouteComponentProps<{}>; 

class NewProduct extends React.Component<ProductProp, {}> {
    constructor(props: ProductProp) {
        super(props);
        this.state = {
            product: {
                prodName: '',
                price:'',
            },
            isSubmitted: false
        }
     
    }
    handleChange(e: any) {
        
        this.setState({
             product: { ...this.state.product , [e.target.name]: e.target.value }
        });
    }

    handleSubmit(e: any) {
        this.setState({ isSubmitted: true });
        const { product } = this.state;
        this.props.addProduct(product);
        e.preventDefault();
    }

    public render() {
        const { product } = this.state;
        return <div className="col-lg-5 col-xs-4 col-sm-3">
            <h1>New Product</h1>
            <form onSubmit={(e:any)=> this.handleSubmit(e)}>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="prodName" value={product.prodName} onChange={ (e:any) => this.handleChange(e) }/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" type="text" name="price" value={product.price} onChange={ (e:any) => this.handleChange(e) }/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                </div>

            </form>
           
               </div>;
    }


    
}

export default connect(
    (state: ApplicationState) => state.product, // Selects which state properties are merged into the component's props
    ProductStore.actionCreators                // Selects which action creators are merged into the component's props
)(NewProduct) as typeof NewProduct;