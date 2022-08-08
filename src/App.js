import {useState,useEffect} from 'react';

import './App.css';
import axios from 'axios';

//components
import PokemonCard from './components/PokemonCard';

function App() {
    const API_URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon?limit=20'
//useStates
    const [pokemons,setPokemons] = useState([]);
    const [loadMore,setLoadMore] = useState(API_URL_POKEMONS);
    const [loadingStatus,setLoadingStatus] = useState(true)

    const getAllPokemons = async () =>{                                                      // geting all pokemons
      setLoadingStatus(true);
      const res = await axios.get(loadMore);                                                 // get with axios
      setLoadMore(res.data.next)                                                             // pre set position so I know where im in api and what to load next

        function createPokemonObject(result){                                                 // create a object of pokemon where the value of res.data.results is put 
          result.forEach(async pokemon => {                                                   // do foreach through results and call api https://pokeapi.co/api/v2/pokemon/${pokemon.name} which call every single pokemon name in foreach 
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)     // axios not working properly ? do research
            const data = await res.json()                                                     // transfer res to json and save into variable data
            setPokemons(currentList =>[...currentList,data])                                 // create currentList which will spread current data in Pokemon (useState) by spreading operator and insert data from fetch 
          })
        }
      createPokemonObject(res.data.results)

      setLoadingStatus(false);
    }

    useEffect(()=>{
      getAllPokemons()
    },[])

  return (
    <div className='app-container'>
      <h1>Pokédex</h1>
        <div className='pokemon-container'>
          <div className='all-container'>
              {pokemons.map((pokemon)=>(
                  <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.other.dream_world.front_default}
                  type={pokemon.types[0].type.name}
                  ></PokemonCard>
              ))}
          </div>
          <button className='load-more' onClick={()=>getAllPokemons()}>{loadingStatus ? "Načítání..." : "Načíst další"}</button>
        </div>
    </div>
  );
}

export default App;
