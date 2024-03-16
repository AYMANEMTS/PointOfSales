import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useUserContext} from "../context/UserContext";
import ServerApi from "../Api/ServerApi";

const Settings = () => {
    const {user} = useUserContext()
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const {logout} = useUserContext()
    const handleUpdateUser = async () => {
        const id = user.id
        const data = {name,email,role:user.role}
        // try {
        //     await ServerApi.updateUser(id,data).then((res) => {
        //         console.log(res)
        //     }).catch((e) => console.log(e))
        // }catch (e){console.error(e)}
    };

    const handleChangePassword = async () => {
        const id = user.id
        const data = {currentPass,newPass}
        // try {
        //     await ServerApi.changePassword(id,data).then((res) => {
        //         console.log(res)
        //     }).catch((e) => console.log(e))
        // }catch (e){console.error(e)}
    };

    return (
        <View style={styles.container}>
            {/*<View style={[styles.card,{backgroundColor: '#FC8080'}]}>*/}
            {/*    <Text style={{color:'white',fontSize:15,fontWeight:'bold',padding:8}}>*/}
            {/*        error : this is tes error*/}
            {/*    </Text>*/}
            {/*</View>*/}
            {/* Form 1: Username and Email in a Card */}
            <View style={styles.card}>
                <Text style={{marginLeft:5,marginVertical:15,fontWeight:'bold',fontSize:15}}>Update Information</Text>
                <View style={styles.labels}>
                    <Text style={styles.labelText}>Full Name</Text>
                    <Text style={[styles.labelText,{marginRight:150}]}>Email</Text>
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="Username"
                        placeholderTextColor={'rgba(0,0,0,0.76)'}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor={'rgba(0,0,0,0.76)'}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <TouchableOpacity onPress={handleUpdateUser}
                    disabled={name === user.name && email === user.email}
                      style={[styles.button,(name === user.name && email === user.email) && {backgroundColor: 'grey'}]}>
                    <Text style={styles.textButton}>Update</Text>
                </TouchableOpacity>
            </View>

            {/* Form 2: Change Password in a Card */}
            <View style={styles.card}>
                <Text style={{marginLeft:5,marginVertical:15,fontWeight:'bold',fontSize:15}}>Change Password</Text>
                <View style={styles.labels}>
                    <Text style={styles.labelText}>Current Password</Text>
                    <Text style={[styles.labelText,{marginRight:90}]}>New Password</Text>
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="Current Password"
                        secureTextEntry
                        placeholderTextColor={'rgba(0,0,0,0.76)'}
                        value={currentPass}
                        onChangeText={setCurrentPass}
                    />
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="New Password"
                        placeholderTextColor={'rgba(0,0,0,0.76)'}
                        secureTextEntry
                        value={newPass}
                        onChangeText={setNewPass}
                    />
                </View>
                <TouchableOpacity onPress={handleChangePassword}
                    disabled={currentPass === '' || newPass === ''}
                    style={[styles.button,(currentPass === '' || newPass === '') && {backgroundColor:'grey'}]}>
                    <Text style={styles.textButton}>Submit</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => logout()}
                style={[styles.button,{backgroundColor: '#F7330C'}]}>
                <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 5,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.76)',
        padding: 5,
        borderRadius: 5,
    },
    inputHalf: {
        flex: 1,
        marginHorizontal: 2,
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22BEF8',
        borderRadius: 5,
        padding: 8
    },
    textButton:{
        color:'white',
        fontWeight:'bold',
        fontSize:15
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    labelText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'grey', // Feel free to adjust the color
    },
});

export default Settings;
