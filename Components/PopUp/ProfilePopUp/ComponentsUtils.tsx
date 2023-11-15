import { eConnectionState } from './ProfilePopUp';

export const MAIN_TEXT_DEFAULT  = "Une connexion est nécessaire pour jouer !";

export enum eMainButtonTextId {
    BUTTON_TEXT_CONNECTED,      
    BUTTON_TEXT_LOGGING_IN,     
    BUTTON_TEXT_SIGNING_IN,     
    BUTTON_TEXT_RESET_PASSWORD, 
    BUTTON_TEXT_SIGNING_OUT,    
}

export enum eMainButtonSubTextId {
    BUTTON_SUB_TEXT_FORGOT_PASSWORD,
    BUTTON_SUB_TEXT_RESET_PASSWORD, 
    BUTTON_SUB_TEXT_LOGING_IN,      
    BUTTON_SUB_TEXT_SIGNING_IN,     
    BUTTON_SUB_TEXT_SIGN_OUT,       
}

export const MainButtonText: any = new Map([
    [eMainButtonTextId.BUTTON_TEXT_CONNECTED,         "Se déconnecter"],
    [eMainButtonTextId.BUTTON_TEXT_LOGGING_IN,        "Se connecter"],
    [eMainButtonTextId.BUTTON_TEXT_SIGNING_IN,        "S'inscrire"],
    [eMainButtonTextId.BUTTON_TEXT_RESET_PASSWORD,    "Réinitaliser mot de passe"],
    [eMainButtonTextId.BUTTON_TEXT_SIGNING_OUT,       "Se désinscrire :'("]
  ]);

export const MainButtonSubText : any = new Map([
    [eMainButtonSubTextId.BUTTON_SUB_TEXT_FORGOT_PASSWORD,   "Mot de passe oublié ? C\'est par là."],
    [eMainButtonSubTextId.BUTTON_SUB_TEXT_RESET_PASSWORD,    "Changer de mot de passe."],
    [eMainButtonSubTextId.BUTTON_SUB_TEXT_LOGING_IN,         "Pas encore inscrit ? S'inscrire ici."],
    [eMainButtonSubTextId.BUTTON_SUB_TEXT_SIGNING_IN,        "Déjà inscrit ? Se connecter ici."],
    [eMainButtonSubTextId.BUTTON_SUB_TEXT_SIGN_OUT,          "Se désinscrire :'(."]
])



export const computeButtonText = (connectionState : eConnectionState) => {
    if(connectionState === eConnectionState.LoggingIn)          return MainButtonText.get(eMainButtonTextId.BUTTON_TEXT_LOGGING_IN);
    if(connectionState === eConnectionState.SigningIn)          return MainButtonText.get(eMainButtonTextId.BUTTON_TEXT_SIGNING_IN);
    if(connectionState === eConnectionState.SettingPassword)    return MainButtonText.get(eMainButtonTextId.BUTTON_TEXT_RESET_PASSWORD);
    if(connectionState === eConnectionState.SigningOut)         return MainButtonText.get(eMainButtonTextId.BUTTON_TEXT_SIGNING_OUT);
    return MainButtonText.get(eMainButtonTextId.BUTTON_TEXT_CONNECTED);
}

export const computeSubButtonText = (connectionState : eConnectionState) => {
    if(connectionState === eConnectionState.LoggingIn)
    {
        return MainButtonSubText.get(eMainButtonSubTextId.BUTTON_SUB_TEXT_LOGING_IN);
    }
    else if(connectionState === eConnectionState.SigningIn)
    {
        return MainButtonSubText.get(eMainButtonSubTextId.BUTTON_SUB_TEXT_SIGNING_IN);
    }
    else if(connectionState === eConnectionState.Connected)
    {
        return MainButtonSubText.get(eMainButtonSubTextId.BUTTON_SUB_TEXT_SIGN_OUT);
    }
    return '';
}

export const computeRestePasswordText = (connectionState : eConnectionState) => {
    if(connectionState === eConnectionState.LoggingIn)
    {
        return MainButtonSubText.get(eMainButtonSubTextId.BUTTON_SUB_TEXT_FORGOT_PASSWORD);
    }
    else if(connectionState === eConnectionState.Connected)
    {
        return MainButtonSubText.get(eMainButtonSubTextId.BUTTON_SUB_TEXT_RESET_PASSWORD);  // texte vide mais on affiche quand même la ligne
    }
    return '';  // texte vide mais on affiche quand même la ligne
}