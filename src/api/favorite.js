import AsyncStorage from "@react-native-async-storage/async-storage";
import { pull } from 'lodash'
import { FAVORITE_STORAGE } from "../utils/constants";

export async function getPokemonsFavoriteApi() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return response ? JSON.parse(response) : [];
  } catch (error) {
    throw error
  }
}

export async function addPokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    favorites.push(id)
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites))
  } catch (error) {
    throw error
  }
}

export async function isPokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    const isFavorite = favorites.includes(id)
    return isFavorite
  } catch (error) {
    throw error
  }
}

export async function removePokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    const newFavorites = favorites.filter(fav => fav !== id)
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites))
  } catch (error) {
    throw error
  }
}