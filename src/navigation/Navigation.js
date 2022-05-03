import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Screens
import Account from '../screens/Account';
/* import Favorite from '../screens/Favorite'; */
// ScreenNavigations
import PokedexNavigation from '../navigation/PokedexNavigation';
import FavoriteNavigation from './FavoriteNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
	return (
		<Tab.Navigator initialRouteName='PokedexNavigation'>
			<Tab.Screen
				name='FavoriteNavigation'
				component={ FavoriteNavigation }
				options={ {
					tabBarLabel: 'Mis Favoritos',
					headerTitle: 'Mis Favoritos',
					tabBarIcon: ({ color, size }) => (
						<Icon name='heart' color={ color } size={ size } />
					),
					headerShown: false,
				} }
			/>
			<Tab.Screen
				name='PokedexNavigation'
				component={ PokedexNavigation }
				options={ {
					tabBarLabel: '',
					headerTitle: 'Pokedex',
					tabBarIcon: ({ color, size, focused }) =>
						renderPokeball({ color, size, focused }),
					headerShown: false, // Test in diferent phones
				} }
			/>
			<Tab.Screen
				name='Account'
				component={ Account }
				options={ {
					tabBarLabel: 'Mi cuenta',
					headerTitle: 'Mi cuenta',
					tabBarIcon: ({ color, size }) => (
						<Icon name='user' color={ color } size={ size } />
					),
				} }
			/>
		</Tab.Navigator>
	);
}

const pokeballStyles = StyleSheet.create({
	noFocus: {
		width: 40,
		height: 40,
		top: 7,
	},
	focus: {
		width: 70,
		height: 70,
		top: -7,
	},
});

function renderPokeball({ color, size, focused }) {
	// console.log('Color: ', color);
	// console.log('Size: ', size);
	// console.log('Focused', focused);
	return (
		<Image
			source={ require('../assets/images/pokeball.png') }
			style={ focused ? pokeballStyles.focus : pokeballStyles.noFocus }
		/>
	);
}
