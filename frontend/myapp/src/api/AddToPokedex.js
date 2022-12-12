function AddToPokedex(id){
    fetch(
        'http://localhost:4444/polidex/insert', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:id.name,
                parti:id.parti
            })
        }
    )
}

export default AddToPokedex;