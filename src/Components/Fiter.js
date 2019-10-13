import React, { Component } from 'react';
import { ProductConsumer } from '../context';

export default class Fiter extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {sort, size}  = value;
                    const { handleSort, handleSize } = value;
                    // console.log(typeof(handleSize));
                    return (
                        <div className="container d-flex justify-content-center">
                            <div className="row ">
                                <div className="col-md-6 my-4 align-items-center">
                                    <label>
                                        Sort by Price:
                                        <select className="form-control my-2" value={sort} onChange={handleSort}>
                                            <option value="">select</option>
                                            <option value="lowest">Lowest</option>
                                            <option value="highest">Highest</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-6 my-4 ">
                                <label>
                                        Search phone:
                                       <input className="form-control my-2" value={size} onChange={handleSize} />
                                    </label>
                                </div>
                            </div>  
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}
