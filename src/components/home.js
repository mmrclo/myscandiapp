import React from 'react';
import ProductList from './productlist';
import deleteItems from '../lib/deleteItems';
import Footer from './footer';

class Home extends React.Component {
      constructor(props) {
      super(props);
      this.performMassDelete = this.performMassDelete.bind(this);
    }
      
    performMassDelete() {
        deleteItems();
    }
    
    render() {
        return (
            <div className="App">
                <header className="App-header">
                  <nav className="topNavigation">
                    <h1>Product List</h1>
                      <ul className="nav-btns">
                          <li className="btn"><button><a href="/addproduct">ADD</a></button></li>
                          <li className="btn"><button id="delete-product-btn" onClick={this.performMassDelete}>MASS DELETE</button></li>
                      </ul>
                  </nav>
                </header>
          
                <ProductList />
        
                <Footer />
            </div>
        );      
    }
}
export default Home;
