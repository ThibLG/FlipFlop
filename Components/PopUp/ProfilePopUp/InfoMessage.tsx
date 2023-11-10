// Message affiche à l'utilisateur pour lui indiquer une erreur
// ou une action a effectuer lors du processus d'authentification
// on utilise un enum pour lister les les messages possibles sous forme d'id
// a chaque element de l'enum est associe un texte dans le tableau infoMessages
// l'id du message du message a affiche est passe par les props
// au moment du return on boucle sur infoMessages pour retourner le texte associe a l'id
// lorsque aucun message ne doit etre affiche on choisit d'afficher une vide
// au lieu de retourner null pour garder toujours le meme espace entre les elements du composant parent

import { StyleSheet, View, Text,} from 'react-native';

export enum eInfoMessageId
{
    None,
    EmptyEmail,
    EmptyPassword,
    ConnectionImpossible,
    VerificationEmailSent,
    EmailNotVerified,
    AccountCreationImpossible,
    PasswordResetEmailSent,
    AccountDeletionImpossible
}

const EMPTY_MESSAGE                     = '';
const EMPTY_EMAIL_ADRESS                = 'Adresse mail vide.';
const EMPTY_PASSWORD                    = 'Mot de passe vide.';
const CONNECTION_IMPOSSIBLE             = 'Connexion impossible.\nMerci de vérifier l\'adresse mail et le mot de passe.';
const VERIFICATION_EMAIL_SENT           = 'Email de vérification envoyé.';
const EMAIL_ADRESS_NOT_VERIFIED         = 'Adresse mail non vérifiée.';
const ACCOUNT_CREATION_IMPOSSIBLE       = 'Impossible de créer le compte.';
const SEE_EMAILS_FOR_SETTING_PASSWORD   = 'Consultez vos mails pour modifier votre mot de passe.';
const ACCOUNT_DELETION_IMPOSSIBLE       = 'Impossible de supprimmer le compte.';

interface InfoMessage {
    id : eInfoMessageId;
    message : string;
}

const infoMessages : InfoMessage[] =
[
    {
        id: eInfoMessageId.None,
        message : EMPTY_MESSAGE,
    },
    {
        id: eInfoMessageId.EmptyEmail,
        message : EMPTY_EMAIL_ADRESS,
    },
    {
        id: eInfoMessageId.EmptyPassword,
        message : EMPTY_PASSWORD,
    },
    {
        id: eInfoMessageId.ConnectionImpossible,
        message : CONNECTION_IMPOSSIBLE,
    },
    {
        id: eInfoMessageId.VerificationEmailSent,
        message : VERIFICATION_EMAIL_SENT,
    },
    {
        id: eInfoMessageId.EmailNotVerified,
        message : EMAIL_ADRESS_NOT_VERIFIED,
    },
    {
        id: eInfoMessageId.AccountCreationImpossible,
        message : ACCOUNT_CREATION_IMPOSSIBLE,
    },
    {
        id: eInfoMessageId.PasswordResetEmailSent,
        message : SEE_EMAILS_FOR_SETTING_PASSWORD,
    },
    {
        id: eInfoMessageId.AccountDeletionImpossible,
        message : ACCOUNT_DELETION_IMPOSSIBLE,
    },
]

// avant d'afficher un message on le formate pour qu'il s'affiche toujours sur 2 lignes
const formatMessageText = (text : string) => {
    if(!text.includes('\n'))
    {
        return text + '\n';
    }
    return text;
}

const getMessageFromId = (id : eInfoMessageId) => {

    let outputMessage : string = '';
    let messageFound : boolean = false;
    for(let i = 0; i < infoMessages.length; i++)
    {
        const infoMessage : InfoMessage = infoMessages[i];
        if(infoMessage.id == id) {
            outputMessage = infoMessage.message;
            messageFound = true;
            break;
        }
    }

    // si l'id passe en parametre ne correspond a aucun id du tableau on log une error et renvoie
    // une chaine par defaut
    if(!messageFound)
    {
        console.error('[ErrorMessage] Parameter id = ' + id +
        ' did not match any element from the list infoMessages. Returning EMPTY_MESSAGE by default')

        outputMessage = EMPTY_MESSAGE;
    }

    return formatMessageText(outputMessage);
}

interface ErrorMessageParameters {
    errorMessageId : eInfoMessageId;
}

const ErrorMessage = (props : ErrorMessageParameters) => {
               
    return (
        <Text 
        style={styles.errorText}
        >
            { getMessageFromId(props.errorMessageId) } 
        </Text>
    )

};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12
    },
});

export default ErrorMessage;