import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { capitalize } from 'lodash';
import getColorByPokemonType from '../../utils/getColorByPokemonType';

export default function Type(props) {
	const { types } = props;

	return (
		<View style={styles.content}>
			{types.map((item, i) => (
				<View
					key={`${i}${item.type.name}`}
					style={{
						...styles.pill,
						backgroundColor: getColorByPokemonType(item.type.name),
					}}
				>
					<Text style={styles.typeName}>{capitalize(item.type.name)}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		marginTop: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pill: {
		paddingHorizontal: 30,
		paddingVertical: 5,
		borderRadius: 20,
		marginHorizontal: 10,
	},
	typeName: {
		color: '#fff',
		fontWeight: '700',
	},
});
