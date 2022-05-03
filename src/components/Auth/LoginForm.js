import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { user, userDetails } from '../../utils/userDB'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'


export default function LoginForm() {
  const [error, setError] = useState('')
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    /* validateOnChange: false, */
    onSubmit: values => {
      Keyboard.dismiss()
      setError('')
      const { username, password } = values
      if (username === user.username && password !== user.password) {
        setError('Incorrect password')
      }
      if (username === user.username && password === user.password) {
        /* alert('Login Successful') */
        login(userDetails)
      } else {
        alert('Login Failed')
      }
    }
  })

  return (
    <View>
      <Text style={ styles.title }>Iniciar sesión</Text>
      <TextInput
        style={ [styles.input, formik.errors.username && styles.errorField] }
        placeholder="Nombre de usuario"
        autoCapitalize='none'
        value={ formik.values.username }
        onChangeText={ formik.handleChange('username') }
      />
      <Text style={ styles.errorText }>{ formik.errors.username }</Text>
      <TextInput
        style={ [styles.input, ((formik.errors.password || error) && styles.errorField)] }
        placeholder="Contraseña"
        autoCapitalize='none'
        secureTextEntry
        value={ formik.values.password }
        onChangeText={ formik.handleChange('password') }
      />
      <Text style={ styles.errorText }>{ formik.errors.password }</Text>
      <Text style={ styles.errorText }>{ error }</Text>
      <Button title='Entrar' onPress={ formik.handleSubmit } />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    marginBottom: 2,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  errorField: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 20,
  }
})