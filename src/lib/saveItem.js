function saveItem(props) {   
    let product = props;
    saveItemtoDb(product);
}

async function saveItemtoDb(product) {
    
    try {
        const createdItem = await fetch("https://scandiappdb.herokuapp.com/api/public/create.php",{
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify(product)
                                });
        console.log(createdItem);
        window.location.assign('/');
    } catch (error) {
        console.log(`CATCH ERR: ${error}`);
        return error;
    }
}

export default saveItem;
