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
    EmailBadlyFormatted,
    UserNotFound,
    WrongPassword,
    WeakPassword,
    ConnectionImpossible,
    VerificationEmailSent,
    EmailNotVerified,
    AccountCreationImpossible,
    PasswordResetEmailSent,
    AccountDeletionImpossible,
    DisconnectionImpossible,
    ErrorResettingPassword
}

const EMPTY_MESSAGE                     = "";
const EMPTY_EMAIL_ADRESS                = "Adresse mail vide.";
const EMPTY_PASSWORD                    = "Mot de passe vide.";
const EMAIL_BADLY_FORMATTED             = "Format de l'adresse mail invalide.";
const USER_NOT_FOUND                    = "Cet utlisateur n'est pas encore inscrit.";
const WRONG_PASSWORD                    = "Mot de passe incorrect.";
const WEAK_PASSWORD                     = "Le mot de passe doit contenir au moins 6 caractères."
const CONNECTION_IMPOSSIBLE             = "Connexion impossible.\nMerci de vérifier l\'adresse mail et le mot de passe.";
const VERIFICATION_EMAIL_SENT           = "Email de vérification envoyé.";
const EMAIL_ADRESS_NOT_VERIFIED         = "Adresse mail non vérifiée.";
const ACCOUNT_CREATION_IMPOSSIBLE       = "Impossible de créer le compte.";
const SEE_EMAILS_FOR_SETTING_PASSWORD   = "Consultez vos mails pour modifier votre mot de passe.";
const ACCOUNT_DELETION_IMPOSSIBLE       = "Impossible de supprimmer le compte.";
const ERROR_RESETTING_PASSWORD          = "Impossible de modifier le mot de passe.\nMerci de réessayer ultérieurement";

interface InfoMessage {
    id : eInfoMessageId;
    message : string;
}

export const infoMessages_: any = new Map([
    [eInfoMessageId.None,                       EMPTY_MESSAGE],
    [eInfoMessageId.EmptyEmail,                 EMPTY_EMAIL_ADRESS],
    [eInfoMessageId.EmptyPassword,              EMPTY_PASSWORD],
    [eInfoMessageId.EmailBadlyFormatted,        EMAIL_BADLY_FORMATTED],
    [eInfoMessageId.UserNotFound,               USER_NOT_FOUND],
    [eInfoMessageId.WrongPassword,              WRONG_PASSWORD],
    [eInfoMessageId.WeakPassword,               WEAK_PASSWORD],
    [eInfoMessageId.ConnectionImpossible,       CONNECTION_IMPOSSIBLE],
    [eInfoMessageId.VerificationEmailSent,      VERIFICATION_EMAIL_SENT],
    [eInfoMessageId.EmailNotVerified,           EMAIL_ADRESS_NOT_VERIFIED],
    [eInfoMessageId.AccountCreationImpossible,  ACCOUNT_CREATION_IMPOSSIBLE],
    [eInfoMessageId.PasswordResetEmailSent,     SEE_EMAILS_FOR_SETTING_PASSWORD],
    [eInfoMessageId.AccountDeletionImpossible,  ACCOUNT_DELETION_IMPOSSIBLE],
    [eInfoMessageId.ErrorResettingPassword,     ERROR_RESETTING_PASSWORD]
  ]);

// avant d'afficher un message on le formate pour qu'il s'affiche toujours sur 2 lignes
const formatMessageText = (text : string) => {
    if(!text.includes('\n'))
    {
        return text + '\n';
    }
    return text;
}

const getMessageFromId = (id : eInfoMessageId) => {

    let outputMessage = infoMessages_.get(id);

    // si l'id passe en parametre ne correspond a aucun id du tableau on log une error et renvoie
    // une chaine par defaut
    if(outputMessage === undefined)
    {
        console.debug('[ErrorMessage] Parameter id = ' + id +
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