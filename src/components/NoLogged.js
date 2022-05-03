import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'


export default function NoLogged() {
  const navigation = useNavigation()

  return (
    <View style={ styles.container }>
      <Text style={ styles.ops }>Ops!</Text>
      <Text style={ styles.text }>Esta opción solo esta disponible para usuarios logueados</Text>
      <Button title='Iniciar sesión' onPress={ () => navigation.navigate('Account') } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#F5FCFF',
  },
  ops: {
    fontSize: 50,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
  },
})