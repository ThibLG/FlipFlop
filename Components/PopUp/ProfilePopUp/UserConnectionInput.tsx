// 

import { StyleSheet, View, Text, TextInput, ActivityIndicator} from 'react-native';
import { useState } from 'react';
import { displayConditionStyle } from "../../../Utils/Styles";

const EMAIL_TEXT            = "Adresse mail";
const EMAIL_PLACEHOLDER     = "Adresse mail...";
const PASSWORD_TEXT         = "Mot de passe";
const PASSWORD_PLACEHOLDER  = "Mot de passe...";

interface UserInputParameters {
    isEmailDisplayed : boolean;
    isPasswordDisplayed : boolean;
    activityIndicatorDisplayed : boolean;
}

const UserConnectionInput = (props : UserInputParameters) => {

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const getEmail = () =>
    {
        return email;
    }

    return (
        <View>                
            <View style={ displayConditionStyle(props.isEmailDisplayed).display } >
                <Text> { EMAIL_TEXT } </Text>

                <TextInput
                    style={ styles.textInput }
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder={EMAIL_PLACEHOLDER}
                />
            </View>

            <View style={[{marginVertical: 10}, displayConditionStyle(props.isPasswordDisplayed).display ]} >
                <Text> { PASSWORD_TEXT } </Text>

                <TextInput
                    style={ styles.textInput }
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder={PASSWORD_PLACEHOLDER}
                    secureTextEntry={true}
                />
            </View>

            <View 
            style={[
                styles.backgroundMask,
                displayConditionStyle(props.activityIndicatorDisplayed).display
            ]}
            />

            <ActivityIndicator
            style={[
                styles.activityIndicator,
                displayConditionStyle(props.activityIndicatorDisplayed).display
            ]}
            size="small"
            color="#574AE2" />
        </View>
    );

};

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

export default UserConnectionInput;