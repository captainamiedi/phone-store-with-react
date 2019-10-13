import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Default from './Components/Default';
import Cart from './Components/Cart/Cart';
import Details from './Components/Details';
import Modal from './Components/Modal';
import Fiter from './Components/Fiter';
import Pagination from './Components/Pagination';
import { ProductConsumer } from './context';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Fiter />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
      <ProductConsumer>
        {(value) => {
          const {products, onChangePage } = value;
          console.log(products);
          return (
            <Pagination items={products} onChangePage={onChangePage} style/>
          )
        }}
      </ProductConsumer>
    </React.Fragment>
  );
}

export default App;
