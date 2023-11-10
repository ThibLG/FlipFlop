// 

import { StyleSheet, View, Text, Pressable, TextInput, ActivityIndicator} from 'react-native';
import GenericPopUp from "../GenericPopUp";
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { displayConditionStyle } from "../../../Utils/Styles";
import UserConnectionInput from "./UserConnectionInput";
import ErrorMessage, { eInfoMessageId } from "./InfoMessage";

const MAIN_TEXT_DEFAULT                 = "Une connexion est nécessaire pour jouer !";
const BUTTON_TEXT_CONNECTED             = "Se déconnecter";
const BUTTON_TEXT_LOGGING_IN            = "Se connecter";
const BUTTON_TEXT_SIGNING_IN            = "S'inscrire";
const BUTTON_TEXT_RESET_PASSWORD        = "Réinitaliser mot de passe";
const BUTTON_TEXT_SIGNING_OUT           = "Se désinscrire :'(";
const BUTTON_SUB_TEXT_FORGOT_PASSWORD   = 'Mot de passe oublié ? C\'est par là.'
const BUTTON_SUB_TEXT_RESET_PASSWORD    = 'Changer de mot de passe.'
const BUTTON_SUB_TEXT_LOGING_IN         = "Pas encore inscrit ? S'inscrire ici.";
const BUTTON_SUB_TEXT_SIGNING_IN        = "Déjà inscrit ? Se connecter ici.";
const BUTTON_SUB_TEXT_SIGN_OUT          = "Se désinscrire :'(.";

enum eConnectionState
{
    LoggingIn,
    SigningIn,
    SigningOut,
    SettingPassword,
    Connected,
}

interface PopUpParameters {
    isDisplayed : boolean;
    closePopUp : CallableFunction;
}

const computeButtonText = (connectionState : eConnectionState) => {
    if(connectionState === eConnectionState.LoggingIn)          return BUTTON_TEXT_LOGGING_IN;
    if(connectionState === eConnectionState.SigningIn)          return BUTTON_TEXT_SIGNING_IN;
    if(connectionState === eConnectionState.SettingPassword)    return BUTTON_TEXT_RESET_PASSWORD;
    if(connectionState === eConnectionState.SigningOut)         return BUTTON_TEXT_SIGNING_OUT;
    return BUTTON_TEXT_CONNECTED
}

const ProfilePopUp = (props : PopUpParameters) => {

    const [connectionState, setConnectionState] = useState(eConnectionState.LoggingIn);
    const [errorMessageId, setErrorMessageId] = useState(eInfoMessageId.None);
    const [connexionWaitingBackend, setconnexionWaitingBackend] = useState(false);
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    

    const resetErrorMessage = () => {
        if(errorMessageId != eInfoMessageId.None)
        {
            setErrorMessageId(eInfoMessageId.None);
        }
    }

    const isConnected = () => {
        return connectionState > eConnectionState.SigningIn;
    }

    const onMainButtonPushed = async () => {
        resetErrorMessage();

        if(connectionState === eConnectionState.LoggingIn)
        {
            if(email === '') {
                setErrorMessageId(eInfoMessageId.EmptyEmail);
            }
            else if(password === '') {
                setErrorMessageId(eInfoMessageId.EmptyPassword);
            }
            else {
                setconnexionWaitingBackend(true);
                try {
                    await auth().signInWithEmailAndPassword(email, password);
                } catch (e) {
                    setErrorMessageId(eInfoMessageId.ConnectionImpossible);
                }
                setconnexionWaitingBackend(false);
            }
        }
        else if(connectionState === eConnectionState.SigningIn)
        {
            if(email === '') {
                setErrorMessageId(eInfoMessageId.EmptyEmail);
            }
            else if(password === '') {
                setErrorMessageId(eInfoMessageId.EmptyPassword);
            }
            else {
                setconnexionWaitingBackend(true);
                try {
                    await auth().createUserWithEmailAndPassword(email, password);
                    await auth().currentUser?.sendEmailVerification();
                } catch (e) {
                    setErrorMessageId(eInfoMessageId.AccountCreationImpossible);
                }
                setconnexionWaitingBackend(false);
            }
        }
        else if(connectionState === eConnectionState.Connected)
        {
            setconnexionWaitingBackend(true);
            await auth().signOut();
            setconnexionWaitingBackend(false);
            setConnectionState(eConnectionState.LoggingIn);
        }
        else if(connectionState === eConnectionState.SettingPassword)
        {
            resetPassword();
        }
        else if(connectionState === eConnectionState.SigningOut)
        {
            setconnexionWaitingBackend(true);
            try {
               await auth().signInWithEmailAndPassword(email, password);
               await auth().currentUser?.delete();
            } catch (e) {
               setErrorMessageId(eInfoMessageId.AccountDeletionImpossible);
            }
            setconnexionWaitingBackend(false);
            setConnectionState(eConnectionState.LoggingIn);
            onChangeEmail('');
            onChangePassword('');
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

    const resetPassword = async () => {
        setconnexionWaitingBackend(true);
        await auth().sendPasswordResetEmail(email);
        setconnexionWaitingBackend(false);
        setConnectionState(eConnectionState.LoggingIn);
        setErrorMessageId(eInfoMessageId.PasswordResetEmailSent);
        
        if(auth().currentUser?.email)
        {
            setconnexionWaitingBackend(true);
            await auth().signOut();
            setconnexionWaitingBackend(false);
            setConnectionState(eConnectionState.LoggingIn);
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

    const computeSubButtonText = () => {
        if(connectionState === eConnectionState.LoggingIn)
        {
            return BUTTON_SUB_TEXT_LOGING_IN;
        }
        else if(connectionState === eConnectionState.SigningIn)
        {
            return BUTTON_SUB_TEXT_SIGNING_IN;
        }
        else if(connectionState === eConnectionState.Connected)
        {
            return BUTTON_SUB_TEXT_SIGN_OUT;
        }
        return '';
    }

    const computeRestePasswordText = () => {
        if(connectionState === eConnectionState.LoggingIn)
        {
            return BUTTON_SUB_TEXT_FORGOT_PASSWORD;
        }
        else if(connectionState === eConnectionState.Connected)
        {
            return BUTTON_SUB_TEXT_RESET_PASSWORD;  // texte vide mais on affiche quand même la ligne
        }
        return '';  // texte vide mais on affiche quand même la ligne
    }

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

                <UserConnectionInput 
                    email={email}
                    onChangeEmail={onChangeEmail}
                    password={password}
                    onChangePassword={onChangePassword}
                    isEmailDisplayed={connectionState <= eConnectionState.SettingPassword}
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
                        { computeRestePasswordText() }
                    </Text>
                </Pressable>

                <Pressable 
                    onPress={() => {onSubButtonTextPushed()}}
                    >
                    <Text
                    style={ styles(isConnected()).buttonSubText }
                    >
                        { computeSubButtonText() }
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