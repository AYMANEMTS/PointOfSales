import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm ,Controller} from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useUserContext } from '../context/UserContext';
import ServerApi from "../Api/ServerApi";
import func from "../helpers/func";
export default function App() {
  const {control,handleSubmit,formState:{errors},setError} = useForm()
  const {storeAuth} = useUserContext()
  const {setErrors} = func
  const handlLogin = async (data) => {
    try {
      await ServerApi.login(data).then(({data}) => {
          if(!data.success) {
              setErrors(data.errors, setError)
        } else{
            storeAuth(data.user,data.token)
          }
        })
    } catch (error) {
      console.log(`login error ${error}`)
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome Back</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            placeholderTextColor="white"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.inputError}>{errors.email.message}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="white"
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.inputError}>{errors.password.message}</Text>}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(handlLogin)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40A2E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  inputs: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    margin: 5,
    padding: 10,
    fontSize: 17,
    color: 'white',
  },
  inputError: {
    width: 300,
        fontSize: 14,
        paddingLeft:6,
        marginBottom:4,
        color: 'red',
  },
  loginButton: {
    backgroundColor: '#86A7FC',
    width: 190,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
});
