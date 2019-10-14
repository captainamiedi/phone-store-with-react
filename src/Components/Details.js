import React, { PureComponent } from 'react'
import {ProductConsumer} from '../context';
import { Link } from 'react-router-dom';
import {ButtonContainer} from './Button';
import CommentBox from './CommentBox';


class Details extends PureComponent {

    render() {
        return (
           <ProductConsumer>
               {(value) => {
                   const { id, company, img, info, price, title, inCart} = value.detailProduct;
                    const {handleShow} = value;
                   return (
                       <React.Fragment>
                       <div className="container py-5 ">
                           <div className="row">
                               <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                   <h1>{title}</h1>
                               </div>
                           </div>
                           <div className="row" style={{paddingBottom: '2rem'}}>
                               <div className="col-10 mx-auto col-md-6 my-3">
                                   <img src={img} className="img-fluid" alt="product"/>
                               </div>
                               <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">made by: 
                                        <span className="text-uppercase">{company}</span>
                                    </h4>
                                    <h4 className="text-blue"> <strong>price: <span>$</span>{price}</strong></h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">some info product</p>
                                    <p className="text-muted lead">{info}</p>    
                                    <div>
                                        <Link to="/" onClick={handleShow}>
                                            <ButtonContainer>
                                                back to product
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer 
                                            cart
                                            disabled={inCart ? true : false}
                                            onClick={()=>{value.addToCart(id); value.openModal(id)}}
                                        >
                                            {inCart ? "inCart" : "add to cart"}
                                        </ButtonContainer>
                                        
                                    </div>                             
                               </div>
                           </div>
                           <CommentBox />
                       </div>
                       </React.Fragment>
                   )
               }}
           </ProductConsumer>
        )
    }
}

export default Details