import React from 'react';
import { setValidation } from '../lib/validate';
import saveItem from '../lib/saveItem';
import Footer from './footer';

const product_spec = {  Dvd: { size: ''},
                        Book: { weight: ''},
                        Furniture: { height: '', width:'', length:''},
}

const product_type = {spec_name: ''}

function Dvdinput() {
    let notification = 'e.g.: 1444 or 700'; 
    
    function handleChange (e) {
        let fieldName = e.target.name;
        setValidation(fieldName,notification);
        let value = e.target.value;

        product_spec.Dvd['size'] = value;
        
        product_type['spec_name'] = 'Dvd';
    }
     
    return (
        <fieldset>
            <legend>Please, provide DVD-disc space in MB.</legend>
            <div className="row">
                <div className="col-spec">
                    <label htmlFor="size">Size (MB)</label>
                </div>
                <div className="col-value">
                    <input type="number" id="size" name="size" minLength="1" maxLength="10" size="10" pattern="^\d{1,9}$" required onChange={handleChange}/>
                </div>
            </div>
        </fieldset>
    );
}

function Furnitureinput(){
    let notification = 'e.g.: 100, 15.45 or 9.19';

    function handleChange (e) {
        let fieldname = e.target.name;
        setValidation(fieldname,notification);
        let value = e.target.value;

        product_spec.Furniture[fieldname] = value;
    }

    return (
        <fieldset>
            <legend>Please, provide dimensions H&times;W&times;L.</legend>
            <div className="row">
                <div className="col-spec">
                    <label htmlFor="height">Height (CM)</label>
                </div>
                <div className="col-value">
                    <input type="number" id="height" name="height" step="0.01" min="0.01" minLength="1" maxLength="20" size="25" pattern="^\d+[\.]?\d{0,2}$" required onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col-spec">
                    <label htmlFor="width">Width (CM)</label>
                </div>
                <div className="col-value">
                    <input type="number" id="width" name="width" step="0.01" min="0.01" minLength="1" maxLength="20" size="25" pattern="^\d+[\.]?\d{0,2}$" required onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col-spec">
                    <label htmlFor="length">Length (CM)</label>
                </div>
                <div className="col-value">
                    <input type="number" id="length" name="length" step="0.01" min="0.01" minLength="1" maxLength="20" size="25" pattern="^\d+[\.]?\d{0,2}$" required onChange={handleChange}/>
                </div>
            </div>
        </fieldset>
    );
}

function Bookinput(){
    let notification = 'e.g.: 1 or 5.457 or 0.19';
    function handleChange (e) {
        let fieldName = e.target.name;
        setValidation(fieldName,notification);
        let value = e.target.value;
        product_spec.Book[fieldName] = value;
    }

    return (
        <fieldset>
            <legend>Please, provide weight in Kg.</legend>
            <div className="row">
                <div className="col-spec">
                    <label htmlFor="weight">Weight (KG)</label>
                </div>
                <div className="col-value">
                    <input type="number" id="weight" name="weight"  step="0.01" min="0.01" minLength="1" maxLength="20" size="25" pattern="^[0-9]{0,2}[\.]?[0-9]{0,3}$" required onChange={handleChange} />
                </div>
            </div>
        </fieldset>
    );
}

class ProductType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: 'typeSwitch'};
        this.handleChange = this.handleChange.bind(this);
        this.renderSelecedOption = this.renderSelecedOption.bind(this);
    }

    handleChange(event) {
        product_type['spec_name'] = event.target.value;
        this.setState({value: event.target.value});
    }

    renderSelecedOption(selectedOption) {
        if(!selectedOption) return <></>;

        const options = selectedOption;
        switch(options) {
            case 'DVD' : return <Dvdinput />; 
            
            case 'Furniture' : return <Furnitureinput />;
            
            case 'Book' : return <Bookinput />;

            default: return <></>;
        }
    }

    render() {
        return (
            <>
            <div className="row">
                <div className="col-switch">
                    <label htmlFor="productType">Type Switcher</label>
                </div>
                <div className="col-switch">
                    <select name="spec_name" id="productType" value={this.state.value} required onChange={this.handleChange} >
                        <option value="typeSwitch" disabled>Type Switcher</option>
                        <option value="DVD" >DVD</option>
                        <option value="Furniture" >Furniture</option>
                        <option value="Book" >Book</option> 
                    </select>
                </div>
            </div>
            <div className="row">
                {this.renderSelecedOption(this.state.value)}
            </div>
            </>
        );
    }
}

class AddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sku: '',
            name: '',
            price: '',
            spec_name: ''
        };

        this.handleSKUChange = this.handleSKUChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSKUChange(event) {
        let notification = 'e.g.: DVD123-expl or FNT89GRE';
        let fieldName = event.target.name;
        setValidation(fieldName,notification);
        let value = event.target.value.trim();
        value = value.toUpperCase().replace(/-/g,'');
    
        this.setState({
          [fieldName]: value
        });
    }

    handleNameChange(event) {
        let notification = 'e.g: The Product or Thename';
        let fieldName = event.target.name;
        setValidation(fieldName,notification);
        let value = event.target.value.trim();
                
        this.setState({
          [fieldName]: value
        });
    }

    handlePriceChange(event) {
        let notification = 'e.g.: 1, 10.00 or 1000.47';
        let fieldName = event.target.name;
        setValidation(fieldName,notification);
        let value = event.target.value.trim()

        this.setState({
          [fieldName]: value
        });
    }

    mountProductObject() {
        let product = {...this.state, ...product_type , ...product_spec[product_type['spec_name']]};
        
        return product;
    }
    
    handleSubmit = (event) => {
        let product = this.mountProductObject();
        
        //console.log(product);
        saveItem(product);
        window.location.assign('/');
        event.preventDefault();
    };

    render() {
        return (
        <div className="App">
            <header className="App-header">
                <nav className="topNavigation">
                <h1>Product List</h1>
                    <ul className="nav-btns" id="btns-product-save">
                        <li className="btn"><button type="submit" form="product_form">Save</button></li>
                        <li className="btn"><button id="cancel-btn"><a href="/">Cancel</a></button></li>
                    </ul>
                </nav>
            
            </header>
            <main>
            <div className="container">
                <form method="post" onSubmit={this.handleSubmit} id="product_form">
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="sku">SKU</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="sku" name="sku" minLength="4" maxLength="20" size="25" pattern="^[A-Za-z]{1}[\dA-Z\da-z\d]{0,2}(-?[\dA-Za-z\d]{1,3}){0,3}$" required onChange={this.handleSKUChange}  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="name" name="name" minLength="3" maxLength="49" size="50" pattern="^\s*([A-Za-z]\s*){1,45}$" required onChange={this.handleNameChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="col-75">
                        <input type="number" id="price" name="price" step="0.01" min="0.01" minLength="1" pattern="^[0-9]{1,9}[\.]?[0-9]{1,2}$" maxLength="11" size="25" required onChange={this.handlePriceChange} />
                    </div>
                </div>

                <ProductType />

                </form>
                
            </div>
            </main>
            <Footer />
            
        </div>
        );
    }
}

export default AddProduct;