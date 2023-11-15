// Composant constitue de deux entrees permettant a l'utilisateur de
// renseigner son adresse mail et mot de passe
// des props sont a lier au state du composant parent pour la modification des champs
// les entree peuvent etre rendues inaccessibles pendant les appels a Firebase Auth
// un ActivityIndicator est alors affiche

import { StyleSheet, View, Text, TextInput, ActivityIndicator} from 'react-native';
import { displayConditionStyle } from "../../../Utils/Styles";
import { useState } from 'react';
import { UserProfile } from './UserProfile';

const EMAIL_TEXT            = "Adresse mail";       // affiche au dessus de la TextInput email
const EMAIL_PLACEHOLDER     = "Adresse mail...";    // affiche dans le TextInput email
const PASSWORD_TEXT         = "Mot de passe";       // affiche au dessus de la TextInput password
const PASSWORD_PLACEHOLDER  = "Mot de passe...";    // affiche dans le TextInput password

const MARGIN_BETWEEN_TEXTINPUTS = 10;   // marge autour de la seconde TextInput

interface UserInputParameters {
    isEmailDisplayed : boolean;             // true if email view should be displayed
    isPasswordDisplayed : boolean;          // true if password view should be displayed
    isActivityIndicatorDisplayed : boolean; // true if activity indicator should be displayed
    resetEmailAndPassword : boolean;
}

export class UserConnectionInput
{
    userProfile : UserProfile;

    constructor(userProfile : UserProfile){
        this.userProfile = userProfile;
    }

    private setEmailAndPassword(email : string, password : string)
    {
        this.userProfile.setEmail(email);
        this.userProfile.setPassword(password);
    }

    public renderView = (props : UserInputParameters) => {
        
        const [email, onChangeEmail] = useState('');
        const [password, onChangePassword] = useState('');
        
        console.debug('[UserConnectionInput] email : ' + email);
        console.debug('[UserConnectionInput] password : ' + password);

        this.setEmailAndPassword(email, password);

        if(props.resetEmailAndPassword)
        {
            console.debug('[UserConnectionInput] setResetEmailAndPassword');
            onChangeEmail('');
            onChangePassword('');
        }

        return (
            <View>        
                {/* Adresse mail de l'utilisateur */}
                <View style={ displayConditionStyle(props.isEmailDisplayed).display } >
                    <Text> { EMAIL_TEXT } </Text>

                    <TextInput
                        style={ styles.textInput }
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder={EMAIL_PLACEHOLDER}
                    />
                </View>

                {/* Mot de passe de l'utilisateur */}
                <View style={[
                    {marginVertical: MARGIN_BETWEEN_TEXTINPUTS},
                    displayConditionStyle(props.isPasswordDisplayed).display
                    ]} >
                    <Text> { PASSWORD_TEXT } </Text>

                    <TextInput
                        style={ styles.textInput }
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder={PASSWORD_PLACEHOLDER}
                        secureTextEntry={true}
                    />
                </View>

                {/* View semi-opaque affichee par par dessus le mail et le mot de passe
                pendant les appels a Firebase Auth*/}
                <View 
                style={[
                    styles.backgroundMask,
                    displayConditionStyle(props.isActivityIndicatorDisplayed).display
                ]}
                />

                {/* ActivityIndicator affiche pendant les appels a Firebase Auth*/}
                <ActivityIndicator
                style={[
                    styles.activityIndicator,
                    displayConditionStyle(props.isActivityIndicatorDisplayed).display
                ]}
                size="small"
                color="#574AE2" />
            </View>
        );
    };

}

const styles = StyleSheet.create({
    textInput: {
        padding: 5,
        backgroundColor: '#EDEDED'
    },
    backgroundMask: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        opacity: 0.5
    },
    activityIndicator: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute'
    }
});

//export default UserConnectionInput;