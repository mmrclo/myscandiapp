function saveItem(props) {   
    let product = props;
    saveItemtoDb(product);
}

async function saveItemtoDb(product) {
    
    try {
        const createdItem = await fetch("https://myscandiapp.000webhostapp.com/create.php",{
                                    method: 'POST',
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                    }),
                                    body: JSON.stringify(product)
                                });
        console.log(createdItem);
    } catch (error) {
        console.log(`CATCH ERR${error}`);
    }
}

export default saveItem;
