import { showingIds } from '../showingIds';

function deleteItems() {   
    showingIds.forEach(el => {
        deleteItemFromDb({"id": el});
    });
}

async function deleteItemFromDb(id) {
    try {
        const deleted = await fetch("https://myscandiapp.000webhostapp.com/delete.php",{
                                    method: 'DELETE',
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                    }),
                                    body: JSON.stringify(id)
                                });
        console.log(`> deleted < ${id} ${deleted}`);
    } catch (error) {
        console.log(`CATCH ERR${error}`);
    }
}

export default deleteItems;
