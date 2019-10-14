import React, { Component } from 'react';
import { storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

export default class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        sort: '',
        size: '',
        currentProducts: [],
        currentPage: '',
        total: '',
        pageOfItems: [],
        isShow: true
    };

    componentDidMount() {
        this.setProducts();
    };

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return {products: tempProducts}
        })
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetails = (id) => {
      const product = this.getItem(id);
      this.setState(()=> {
          return { 
              detailProduct: product,
              isShow: false
            }
      })
    }

    handleSort = (e) => {
        this.setState({
            sort: e.target.value
        });
        this.sortProduct();
        
        // console.log(this.state.size)
    }

    handleSize = (e) => {
        this.setState({
            size: e.target.value
        });
        // console.log(this.state.products);
        // this.filterProduct(e.target.value);
        this.sortProduct()
    }

    // onPageChanged = data => {
    //     const { products } = this.state;
    //     const { currentPage, totalPages, pageLimit } = data;
    
    //     const offset = (currentPage - 1) * pageLimit;
    //     const currentProducts = products.slice(offset, offset + pageLimit);
    
    //     this.setState({ currentPage, currentProducts, totalPages });
    //   };

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({
            pageOfItems: pageOfItems
        });
        // console.log(this.state.pageOfItems);
        }

    sortProduct = () => {
        this.setState(state => {
            if (state.sort !== '') {
                state.pageOfItems.sort((a,b) => (state.sort === 'lowest') ? (a.price > b.price ? 1 : -1 ) : (a.price < b.price ? 1 : -1 ))
            } else {
                state.pageOfItems.sort((a,b) => (a.id < b.id ? 1 : -1))
            }
            if (state.size !== '') {
                // console.log(state.products);
                // let filteredProduts = state.products;
                return {
                    
                    products: storeProducts.filter(
                        (product) => {
                            // console.log(product.company)
                            return product.company.toLowerCase().indexOf(state.size.toLowerCase()) !== -1
                        }
                    )
                }
            }  else {
                return {
                    products: state.products
                }
            }
            // if (state.size === '') {
            //     return {
            //         products: state.products
            //     } 
            // }
            // console.log(state.products)
            // return {
            //     products: state.products
            // }
        })
    }

    filterProduct =(input) =>{
        let filtered = storeProducts;
        this.setState((state) => {
            // const {size, products} =this.state;
            const filteredData = filtered.filter(el => el.company.toLowerCase().includes(input.toLowerCase()))
            return {
                products: filteredData
            }
        })
    }

    handleShow = () => {
        this.setState({
            isShow: true
        })
    }
    handleShow2 = () => {
        this.setState({
            isShow: false
        })
    }
    addToCart = (id) => {
       let tempProducts = [...this.state.products];
       const index = tempProducts.indexOf(this.getItem(id));
       const product = tempProducts[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price;
       this.setState(()=> {
           return { products: tempProducts, cart: [...this.state.cart, product]};
       }, () => {
           this.addTotals();
       });
    }

    openModal =id => {
        const product = this.getItem(id);
        this.setState(()=> {
            return {modalProduct: product, modalOpen: true}
        })
    };

    closeModal = () => {
        this.setState(()=>{
            return { modalOpen: false }
        });
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(()=>{return {cart: [...tempCart]}}, ()=>{this.addTotals()})
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price;
            this.setState(()=>{return {cart: [...tempCart]}}, ()=>{this.addTotals()})
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id); 
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=> {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        });
    };
    clearCart =() =>{
        this.setState(()=>{
            return {
                cart: [],
                isShow: true
            }
        }, ()=>{
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map((item) => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=> {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, 
                handleDetails: this.handleDetails,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                handleSort: this.handleSort,
                handleSize: this.handleSize,
                onChangePage: this.onChangePage,
                handleShow: this.handleShow,
                handleShow2: this.handleShow2,
                change: {}
            }}>
               {this.props.children} 
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };