import { useEffect, useState } from "react";
import { getAll } from "../api/Fetch";



function PrintPoli(){
    const [ pokemons, setPokemons ] = useState([]);
    

    useEffect(() => {
        const pokemonsFetched = getAll();
        pokemonsFetched
            .then(result => setPokemons(result))
            .catch(error=>console.error("Erreur avec notre API :",error.message));
    },[]);
    return <div className="pokemon-list">
        <div class="flex">
        {
            pokemons.map((pokemon,key) =>{
                return <div key={key} className="bloc-pokemon">
                    <h2>{pokemon.name}</h2>
                    <button onClick={()=>AddToPokedex(pokemon._id)}>Capturer !</button>
                </div>
            })
        }
        </div>
    </div>;
}

export default PrintPoli;