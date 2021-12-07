import { showingIds } from '../showingIds';

function deleteItems() {
    
    let promiseArr = showingIds.map(function (el) {
        return deleteItemFromDb(`https://scandiappdb.herokuapp.com/api/public/delete.php?id=${el}`).then(function (res) {
            return res;
        })
    });
    
    Promise.all(promiseArr).then(function(){
        window.location.assign('/');
    }).catch(function(err){
        console.log(err);
    })
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
