import { useEffect, useState } from "react";
import RemoveFromPokedex from "../api/RemoveFromPokedex";
import { getOwned } from "../api/FetchOwned";



function PrintOwned(){
    const [ pokemons, setPokemons ] = useState([]);
    

    useEffect(() => {
        const pokemonsFetched = getOwned();
        pokemonsFetched
            .then(result => setPokemons(result))
            .catch(error=>console.error("Erreur avec notre API :",error.message));
    },[]);
    return <div className="pokemon-list">
        <div>
        {
            pokemons.map((pokemon,key) =>{
                return <div key={key} className="bloc-pokemon">
                    <h2>{pokemon.name}</h2>
                    <button onClick={()=>RemoveFromPokedex(pokemon.name)}>relâcher !</button>
                </div>
            })
        }
        </div>
    </div>;
}

export default PrintOwned;