import React, { useState, useEffect } from 'react';
import { showingIds } from '../showingIds';

function FetchAPI() {
    const [data, setData] = useState([]);

    const apiGet = () => {
        fetch("https://scandiappdb.herokuapp.com/api/public/list.php")        
        .then((response) => response.json())
        .then((json) => {
            setData(json);
        })
        .catch((error) => console.log(error))
        };

        useEffect(() => {
            apiGet();
        }, []); 
        
        let textspec = { Book: 'NameTest000', Dvd:'NameTest001', Furniture:'NameTest002' }
        let typespec = { Book: 'weight', Dvd:'size', Furniture:'dimension' }
        let sign = { weight: 'KG', size: 'MB'}
    return (
    <>
        {data.map((el) => (
            
            <ProductCard    key={el.id} 
                            id={el.id}
                            specname={textspec[el.spec_name]}
                            sku={el.sku} 
                            name={el.name} 
                            price={el.price} 
                            spec_type={typespec[el.spec_name]} 
                            specs={el[typespec[el.spec_name]]}
                            sign={sign[typespec[el.spec_name]]}
            />
            )
        )}
    </>
    );
}


class ProductList extends React.Component {

    render () {
        return (
        <>
            <div className="productsList">
                <FetchAPI />
            </div>
        </>
        );
    }
}

function ProductCard(props) {
    
    function handleCheckboxChange(e) {
        (e.target.checked) ? showingIds.push(e.target.id) : showingIds.pop(e.target.id);
        //console.log(showingIds);
    }; 
    
        return (
            <div className="product_card" id="">
                <div className="delete_id">
                    <input type="checkbox" className="delete-checkbox" id={props.id} name="prod_id" onChange={handleCheckboxChange} />
                </div>

                <div className="product_specs">
                    <ul className={props.specname}>
                        <li>{props.specname}</li>
                        <li>{props.sku}</li>
                        <li>{props.name}</li>
                        <li>{props.price} $</li>
                        <li id="specs">{props.spec_type}: {props.specs} {props.sign}</li> 
                    </ul>
                </div>
            </div>
        );
}

export default ProductList;
