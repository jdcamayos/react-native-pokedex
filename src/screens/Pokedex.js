import { SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { getPokemonsApi, getPokemonDetailsByUrlApi } from '../api/pokemon';
import PokemonList from '../components/PokemonList';

export default function Pokedex() {
	const [pokemons, setPokemons] = useState([]);
	const [nextUrl, setNextUrl] = useState(null)

	useEffect(() => {
		(async () => {
			loadPokemons();
		})();
	}, []);

	const loadPokemons = async () => {
		try {
			const response = await getPokemonsApi(nextUrl);
			setNextUrl(response.next)
			const pokemonsArrayPromises = response.results.map(async pokemon => {
				const pokemonData = await getPokemonDetailsByUrlApi(pokemon.url);

				return {
					id: pokemonData.id,
					name: pokemonData.name,
					type: pokemonData.types[0].type.name,
					order: pokemonData.order,
					image: pokemonData.sprites.other['official-artwork']['front_default'],
				};
			});

			const pokemonsArray = await Promise.all(pokemonsArrayPromises);

			if (pokemons.length) {
				setPokemons([...pokemons, ...pokemonsArray]);
			} else {
				setPokemons([...pokemonsArray]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SafeAreaView>
			<PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl} />
		</SafeAreaView>
	);
}
