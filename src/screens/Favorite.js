import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { getPokemonsFavoriteApi } from '../api/favorite';
import useAuth from '../hooks/useAuth';
import { getPokemonDetailsApi } from '../api/pokemon';
import PokemonList from '../components/PokemonList';
import NoLogged from '../components/NoLogged';

export default function Favorite() {
	const [pokemons, setPokemons] = useState([])
	const { auth } = useAuth()

	useFocusEffect(
		useCallback(() => {
			if (auth) {
				(async () => {
					try {
						const response = await getPokemonsFavoriteApi()

						const pokemonsArrayPromises = response.map(async pokemon => {
							const pokemonData = await getPokemonDetailsApi(pokemon);

							return {
								id: pokemonData.id,
								name: pokemonData.name,
								type: pokemonData.types[0].type.name,
								order: pokemonData.order,
								image: pokemonData.sprites.other['official-artwork']['front_default'],
							};
						});

						const pokemonsArray = await Promise.all(pokemonsArrayPromises);

						setPokemons(pokemonsArray)
					} catch (error) {
						console.log(error)
					}
				})()
			}
		}, [auth])
	)

	useEffect(() => {
		if (auth) {
			(async () => {
				try {
					const response = await getPokemonsFavoriteApi()

					const pokemonsArrayPromises = response.map(async pokemon => {
						const pokemonData = await getPokemonDetailsApi(pokemon);

						return {
							id: pokemonData.id,
							name: pokemonData.name,
							type: pokemonData.types[0].type.name,
							order: pokemonData.order,
							image: pokemonData.sprites.other['official-artwork']['front_default'],
						};
					});

					const pokemonsArray = await Promise.all(pokemonsArrayPromises);

					setPokemons(pokemonsArray)
				} catch (error) {
					console.log(error)
				}
			})()
		}
	}, [auth])

	return !auth ? <NoLogged /> : <PokemonList pokemons={ pokemons } />

}
