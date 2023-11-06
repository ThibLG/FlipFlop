// 

import { StyleSheet, View, Text, Pressable } from 'react-native';
import GenericPopUp from "./GenericPopUp";
import { useState } from 'react';

const MAIN_TEXT_DEFAULT             = "Une connexion est nécessaire pour jouer !";
const BUTTON_TEXT_CONNECTED         = "Se déconnecter";
const BUTTON_TEXT_NOT_CONNECTED     = "Se connecter";
const BUTTON_SUB_TEXT_CONNECTED     = "Changer de mot de passe.";
const BUTTON_SUB_TEXT_NOT_CONNECTED = "Pas encore inscrit ? S'inscrire ici.";

interface PopUpParameters {
    isDisplayed : boolean;
    closePopUp : CallableFunction;
}

const ProfilePopUp = (props : PopUpParameters) => {

    const [isConnected, setIsConnected] = useState(false);

    return (
        <GenericPopUp
        iconImagepath = {require('../Images/Icons/icons_profile_white.png')}
        isDisplayed = {props.isDisplayed}
        closePopUp = {props.closePopUp}
        > 
          <View >
              <Text 
              style={ styles(isConnected).mainText } 
              >
                { isConnected ? "email.adress@gmail.com" : MAIN_TEXT_DEFAULT } 
              </Text>

              <Pressable 
                onPress={() => {}}
                >
                <View 
                    style={ styles(isConnected).button }
                >
                    <Text
                    style={ styles(isConnected).buttonText }
                    >
                        { isConnected ? BUTTON_TEXT_CONNECTED : BUTTON_TEXT_NOT_CONNECTED }
                    </Text> 
                </View>
              </Pressable>


              <Pressable 
                onPress={() => {}}
                >
                <Text
                style={ styles(isConnected).buttonSubText }
                >
                    { isConnected ? BUTTON_SUB_TEXT_CONNECTED : BUTTON_SUB_TEXT_NOT_CONNECTED }
                </Text>
              </Pressable>
          </View>
        </GenericPopUp>
    );
};

const styles = (isConnected : boolean) => StyleSheet.create({
    mainText: {
        fontSize: 12,
        textAlign: 'center',
        color: isConnected ? '#574AE2' : 'red'
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        paddingHorizontal: 50,
        paddingVertical: 20,
        marginTop: 20,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    buttonSubText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'orange'
    }
});

export default ProfilePopUp;