import { showingIds } from '../showingIds';

function deleteItems() {   
    showingIds.forEach(el => {
        deleteItemFromDb(`https://scandiappdb.herokuapp.com/api/public/delete.php?id=${el}`);
    });
}

async function deleteItemFromDb(url) {
    try {
        const deleted = await fetch(url, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-type': 'application/json'
                                    }
                                });
                            
        
        console.log(deleted);
    } catch (error) {
        console.log(error);
    }
}

export default deleteItems;
