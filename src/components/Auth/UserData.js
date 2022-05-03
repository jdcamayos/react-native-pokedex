import { useFocusEffect } from '@react-navigation/native'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useCallback, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { getPokemonsFavoriteApi } from '../../api/favorite'


export default function UserData() {
  const { auth, logout } = useAuth()
  const [total, setTotal] = useState(0)

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          try {
            const response = await getPokemonsFavoriteApi()
            console.log(response)
            setTotal(response.length)
          } catch (error) {
            console.log(error)
          }
        })()
      }
    },[])
  )


  return (
    <View style={ styles.content }>
      <View style={ styles.titleBlock }>
        <Text style={ styles.title }>Bienvenido, </Text>
        <Text style={ styles.title }>{ `${auth.firstName} ${auth.lastName}` }</Text>
      </View>

      <View style={ styles.dataContent }>
        <ItemMenu title="Nombre" text={ `${auth.firstName} ${auth.lastName}` } />
        <ItemMenu title="Username" text={ auth.username } />
        <ItemMenu title="Email" text={ auth.email } />
        <ItemMenu title="Total Favoritos" text={ `${total} pokemons` } />
      </View>

      <Button title='Desconectarse' onPress={ logout } />
    </View>
  )
}

function ItemMenu(props) {
  const { title, text } = props
  return (
    <View style={ styles.itemMenu }>
      <Text style={ styles.titleItemMenu }>{ title }</Text>
      <Text style={ styles.textItemMenu }>{ text }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#cfcfcf',
  },
  titleItemMenu: {
    fontWeight: 'bold',
    paddingRight: 10,
    width: 120
  },
  textItemMenu: {
    fontSize: 16,
  },

});