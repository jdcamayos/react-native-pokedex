import { createStackNavigator } from "@react-navigation/stack";
import Favorite from "../screens/Favorite";
import Pokemon from "../screens/Pokemon";

const Stack = createStackNavigator();

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={ Favorite }
        options={ { headerTitle: 'Mis Favoritos', } }
      />
      <Stack.Screen
        name="Pokemon"
        component={ Pokemon }
        options={ {
          headerTransparent: true,
          title: "",
        } }
      />
    </Stack.Navigator>
  );
}