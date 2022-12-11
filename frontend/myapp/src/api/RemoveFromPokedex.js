function RemoveFromPokedex(id){
    fetch(
        'http://localhost:4444/polidex/delete', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body: {
                name:"test"
            }
        }
    )
}

export default RemoveFromPokedex;