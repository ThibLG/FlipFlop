// 

import { StyleSheet, View, Text, Pressable } from 'react-native';
import GenericPopUp from "../GenericPopUp";
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { UserConnectionInput } from "./UserConnectionInput";
import ErrorMessage, { eInfoMessageId } from "./InfoMessage";
import { AuthentificationInterface } from "./AuthentificationInterface"
import { UserProfile } from "./UserProfile"
import { computeButtonText, computeSubButtonText, computeRestePasswordText, MAIN_TEXT_DEFAULT } from "./ComponentsUtils"

export enum eConnectionState
{
    LoggingIn,
    SigningIn,
    SigningOut,
    SettingForgottenPassword,
    SettingPassword,
    Connected,
}

interface PopUpParameters {
    isDisplayed : boolean;
    closePopUp : CallableFunction;
}

const ProfilePopUp = (props : PopUpParameters) => {

    // state
    // TODO persistent state
    const [connectionState, setConnectionState] = useState(eConnectionState.LoggingIn);
    const [errorMessageId, setErrorMessageId] = useState(eInfoMessageId.None);
    const [connexionWaitingBackend, setconnexionWaitingBackend] = useState(false);
    const [resetEmailAndPassword, setResetEmailAndPassword] = useState(false);

    // objects
    var userProfile = new UserProfile();
    var authentificationItf = new AuthentificationInterface(
        setErrorMessageId, setconnexionWaitingBackend, userProfile);
    var userInput = new UserConnectionInput(userProfile);

    // reset errorMessageId state to display nothing
    const resetErrorMessage = () => {
        if(errorMessageId != eInfoMessageId.None)
        {
            setErrorMessageId(eInfoMessageId.None);
        }
    }

    // return true if user is connected
    const isConnected = () => {
        return connectionState > eConnectionState.SigningIn;
    }

    // handle push on main button depending on current connection state
    const onMainButtonPushed = async () => {
        resetErrorMessage();

        if(connectionState === eConnectionState.LoggingIn)
        {
            await authentificationItf.logIn();
        }
        else if(connectionState === eConnectionState.SigningIn)
        {
            await authentificationItf.signIn();
        }
        else if(connectionState === eConnectionState.Connected)
        {
            await authentificationItf.logOut();
            setConnectionState(eConnectionState.LoggingIn);
            console.debug('[ProfilePopUp] Logged out');
        }
        else if(connectionState === eConnectionState.SettingPassword)
        {
            await authentificationItf.resetPassword();
        }
        else if(connectionState === eConnectionState.SigningOut)
        {
            await authentificationItf.signOut();
            setConnectionState(eConnectionState.LoggingIn);
            console.debug('setResetEmailAndPassword');
            setResetEmailAndPassword(true);
        }
    }

    const onSubButtonTextPushed = async () => {
        resetErrorMessage();
        if(connectionState === eConnectionState.LoggingIn)
        {
            setConnectionState(eConnectionState.SigningIn);
        }
        else if(connectionState === eConnectionState.SigningIn)
        {
            setConnectionState(eConnectionState.LoggingIn);
        }
        else if(connectionState === eConnectionState.Connected)
        {
            setConnectionState(eConnectionState.SigningOut);
        }
    }

    const onResetPasswordTextPushed = async () => {
        if(connectionState === eConnectionState.LoggingIn)
        {
            setConnectionState(eConnectionState.SettingPassword);
        }

        else if(connectionState === eConnectionState.Connected)
        {
            setConnectionState(eConnectionState.SettingPassword);
        }
    }

    auth().onAuthStateChanged(function(user) {
        if (user) {
          if (user.emailVerified === false) {
            setErrorMessageId(eInfoMessageId.EmailNotVerified);
          }
          else if (connectionState <= eConnectionState.SigningIn) {
            setConnectionState(eConnectionState.Connected);
          }
        } else {
          //console.log('Function : onAuthStateChanged => No user is signed in');
        }
      });

    return (
        <GenericPopUp
        iconImagepath = {require('../../../Images/Icons/icons_profile_white.png')}
        isDisplayed = {props.isDisplayed}
        closePopUp = {props.closePopUp}
        fullWidth = {true}
        > 
            <View >
                <Text 
                style={ styles(isConnected()).mainText } 
                >
                    { isConnected() ? auth().currentUser?.email : MAIN_TEXT_DEFAULT } 
                </Text>

                <userInput.renderView
                    resetEmailAndPassword={resetEmailAndPassword}
                    isEmailDisplayed={connectionState <= eConnectionState.SettingForgottenPassword}
                    isPasswordDisplayed={connectionState <= eConnectionState.SigningOut}
                    isActivityIndicatorDisplayed={connexionWaitingBackend}
                />

                <ErrorMessage
                    errorMessageId={errorMessageId}
                />

                <Pressable 
                    onPress={() => {onMainButtonPushed()}}
                    >
                    <View 
                        style={ styles(isConnected()).button }
                    >
                        <Text
                        style={ styles(isConnected()).buttonText }
                        >
                            { computeButtonText(connectionState) }
                        </Text> 
                    </View>
                </Pressable>

                <Pressable 
                    onPress={() => {onResetPasswordTextPushed()}}
                    >
                    <Text
                    style={ styles(isConnected()).buttonSubText }
                    >
                        { computeRestePasswordText(connectionState) }
                    </Text>
                </Pressable>

                <Pressable 
                    onPress={() => {onSubButtonTextPushed()}}
                    >
                    <Text
                    style={ styles(isConnected()).buttonSubText }
                    >
                        { computeSubButtonText(connectionState) }
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
        color: isConnected ? '#574AE2' : 'red',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        paddingHorizontal: 50,
        paddingVertical: 20,
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        alignSelf: 'center'
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