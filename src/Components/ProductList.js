import React, { PureComponent } from 'react';
import Product from './Product';
import Title from './Ttile';
import { ProductConsumer } from '../context';

class ProductList extends PureComponent {
   
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products" />
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(product => {
                                        return <Product key={product.id} product={product}/>
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            //   <Product />
        )
    }
}

export default ProductList