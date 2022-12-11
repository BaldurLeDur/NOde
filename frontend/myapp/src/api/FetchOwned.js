
export const getOwned = async () => {
    const response = await fetch(
        'http://localhost:4444/polidex/print', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json',
                'Mode': 'no-corse'
            }
        }
    )
    const pokemons = await response.json()
    return pokemons
}