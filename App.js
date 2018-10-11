import React, { Component } from 'react';
import { Text, View ,Button } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import Header from './src/components/Header';
import LoginForm from './src/components/LoginForm';


export default class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isLogin : false
    }
  }

  componentDidMount = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyBBxQ2dHx4dd61-XjQ59qpSbsCeUY84QAo",
      authDomain: "authapp-11d83.firebaseapp.com",
      databaseURL: "https://authapp-11d83.firebaseio.com",
      projectId: "authapp-11d83",
      storageBucket: "authapp-11d83.appspot.com",
      messagingSenderId: "539125637690"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ isLogin : true})
      }
      else{
        this.setState({ isLogin : false})
      }
    })
  };


  logoutHandle = () => {
    firebase.auth().signOut();
  }

  renderContent = () => {
    if(this.state.isLogin){
      return(
        <Button title="Logout" onPress={this.logoutHandle}/>
      );
    }
    else{
      return <LoginForm/>
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication Application"/>
        {this.renderContent()}
      </View>
    );
  }
}