import { useEffect, useState } from "react";
import Paigination from "./Components/Paigination";
import PokemonList from "./Components/PokemonList";
import axios from 'axios'


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPage, setNextpage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true)

  // Returns a promise 
  // axios.get('https://pokeapi.co/api/v2/pokemon')
  //   .then(res => { setPokemon(res.data.results.map(p => p.name)) })

  useEffect(() => {
    setLoading(true)
    let cancel

    // Alternative way of fetching pokemon with async await
    // const getPokemon = async () => {
    //   const pokemon = await fetchPokemon()
    //   setPokemon(pokemon.results.map(p => p.name))
    // }
    // getPokemon()

    axios.get(currentPage, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false)
        setPrevPage(res.data.previous)
        setNextpage(res.data.next)
        setPokemon(res.data.results.map(
          (p) => p.name
        )
        )
      }
      )
    return () => cancel()
  }, [currentPage])

  // Helper function for the alternative way of fetching pokemon with async await
  // const fetchPokemon = async () => {
  //   const res = await fetch('https://pokeapi.co/api/v2/pokemon')
  //   const data = await res.json()
  //   return data
  // }

  // Next page
  const goNextPage = function () {
    setCurrentPage(nextPage)
  }
  // Prev page
  const goPrevPage = function () {
    setCurrentPage(prevPage)
  }

  if (loading) return "Loading..."

  return (
    <div className="container">
      <PokemonList pokemon={pokemon} />
      <br />
      <Paigination
        goPrevPage={prevPage ? goPrevPage : null}
        goNextPage={nextPage ? goNextPage : null}
      />
    </div>
  );
}

export default App;
