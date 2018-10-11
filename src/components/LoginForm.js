import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button, Text, ActivityIndicator , Alert } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';


export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }


    loginHandle = () => {
        this.setState({
            loading: true
        })
        const { email, password } = this.state;

        if(email === '' || password === ''){
            Alert.alert(
                'Ooops',
                'Username and password is required',
                [
                    {text : 'Ok' , onPress: () => null}
                ]
            );
        }
        else{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.loginSuccess)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.loginSuccess)
                    .then(this.loginFail)
            })
        }
    }

    loginSuccess = () => {
        this.setState({
            loading: false
        })
    }

    loginFail = () => {
        this.setState({
            loading: false
        });
        Alert.alert(
            'Ooops',
            'Username or Password is incorrect',
            [
                {text : 'Ok',onPress: () => null}
            ]
        );
    }



    render() {
        const { containerStyle, subContainerStyle, textInputStyle, passwordStyle, loginBtnStyle } = styles;
        return (
            <View>
                <View style={containerStyle}>
                    <View style={subContainerStyle}>
                        <Text style={{ fontSize: 25, padding: 15, textAlign: 'center' }}>Welcome to AlfaSolution</Text>
                        <TextInput
                            placeholder='E-mail'
                            style={textInputStyle}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                    </View>
                    <View style={subContainerStyle}>
                        <TextInput
                            secureTextEntry
                            placeholder='Password'
                            style={passwordStyle}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>
                    <View style={loginBtnStyle}>
                        <Button onPress={this.loginHandle} title="Sign-in" />
                    </View>
                </View>
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}
            </View>
        )
    }
}


const styles = {
    containerStyle: {
        padding: 20,
        margin: 20,
        borderWidth: 2,
        width: 450,
        borderColor: 'gray',
        marginLeft: '20%',
        marginTop: '20%'
    },
    subContainerStyle: {

    },
    textInputStyle: {
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        shadowOpacity: 0.5,
        shadowColor: 'black',
    },
    passwordStyle: {
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        shadowOpacity: 0.5,
        shadowColor: 'black',

    },
    loginBtnStyle: {
        width: 100,
        textAlign: 'center',
        marginLeft: '38%'
    }
}
