import { useNavigation } from '@react-navigation/native';
import { capitalize } from 'lodash';
import {
	StyleSheet,
	Image,
	View,
	Text,
	TouchableWithoutFeedback,
} from 'react-native';
import getColorByPokemonType from '../utils/getColorByPokemonType';

export default function PokemonCard(props) {
	const { pokemon } = props;
	const navigation = useNavigation();

	const bgStyles = {
		backgroundColor: getColorByPokemonType(pokemon.type),
		...styles.bgStyles,
	};

	const goToPokemon = () => {
		// console.log(`Go to pokemon: ${pokemon.id}`);
		// console.log(pokemon);
		navigation.navigate('Pokemon', { id: pokemon.id });
	};
	return (
		<TouchableWithoutFeedback onPress={goToPokemon}>
			<View style={styles.card}>
				<View style={styles.spacing}>
					<View style={bgStyles}>
						<Text style={styles.number}>
							#{`${pokemon.order}`.padStart(3, 0)}
						</Text>
						<Text style={styles.name}>{capitalize(pokemon.name)}</Text>
						<Image source={{ uri: pokemon.image }} style={styles.image} />
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 3,
		paddingTop: 20,
		overflow: 'hidden',
	},
	spacing: {
		flex: 1,
	},
	bgStyles: {
		flex: 1,
		borderRadius: 15,
		padding: 10,
		height: 130,
	},
	number: {
		position: 'absolute',
		right: 10,
		top: 10,
		color: '#fff',
		fontSize: 20,
	},
	name: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
		paddingTop: 10,
	},
	image: {
		position: 'absolute',
		bottom: 2,
		right: 2,
		width: 90,
		height: 90,
	},
});
