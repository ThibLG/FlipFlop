import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { eInfoMessageId } from "./InfoMessage";

export class AuthentificationInterface
{
    private email : string;
    private password : string;
    private setErrorMessageId : CallableFunction;
    private setconnexionWaitingBackend : CallableFunction;
 
    // Normal signature with defaults
    constructor(setErrorMessageId : CallableFunction, setconnexionWaitingBackend : CallableFunction) {
      this.email = '';
      this.password = '';
      this.setErrorMessageId = setErrorMessageId;
      this.setconnexionWaitingBackend = setconnexionWaitingBackend;
    }

    setEmailAndPassword = (email : string, password : string) => {
        this.email = email;
        this.password = password;
    }

    logIn = async () => {
        
        if(this.email === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyEmail);
        }
        else if(this.password === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyPassword);
        }
        else {
            this.setconnexionWaitingBackend(true);
            try {
                await auth().signInWithEmailAndPassword(this.email, this.password);
            } catch (e) {
                this.setErrorMessageId(eInfoMessageId.ConnectionImpossible);
                console.debug('[AuthentificationInterface] Error during logIn');
                return false;
            }
            this.setconnexionWaitingBackend(false);
        }
    
        return true;
    }

    logOut = async () => {
    
        this.setconnexionWaitingBackend(true);
        try {
            await auth().signOut();
        } catch (e) {
            this.setErrorMessageId(eInfoMessageId.DisconnectionImpossible);
            console.debug('[AuthentificationInterface] Error during logOut');
            return false;
        }
        this.setconnexionWaitingBackend(false);
        
        return true;
    }
    
    signIn = async () => {
    
        if(this.email === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyEmail);
        }
        else if(this.password === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyPassword);
        }
        else {
            this.setconnexionWaitingBackend(true);
            try {
                await auth().createUserWithEmailAndPassword(this.email, this.password);
                await auth().currentUser?.sendEmailVerification();
            } catch (e) {
                this.setErrorMessageId(eInfoMessageId.AccountCreationImpossible);
                console.debug('[AuthentificationInterface] Error during signIn');
                return false;
            }
            this.setconnexionWaitingBackend(false);
        }
    
        return true;
    }
    
    signOut = async () => {
    
        this.setconnexionWaitingBackend(true);
        try {
            await auth().signInWithEmailAndPassword(this.email, this.password);
            await auth().currentUser?.delete();
        } catch (e) {
            this.setErrorMessageId(eInfoMessageId.AccountDeletionImpossible);
            console.debug('[AuthentificationInterface] Error during signOut');
            return false;
        }
        this.setconnexionWaitingBackend(false);
    
        return true;
    }
    
    resetPassword = async () => {
    
        try {
            this.setconnexionWaitingBackend(true);
            await auth().sendPasswordResetEmail(this.email);
            this.setconnexionWaitingBackend(false);
            this.setErrorMessageId(eInfoMessageId.PasswordResetEmailSent);
        } catch (e) {
            console.debug('[AuthentificationInterface] Error during resetPassword');
            return false;
        }
        
        try {
            if(auth().currentUser?.email)
            {
                this.setconnexionWaitingBackend(true);
                await auth().signOut();
                this.setconnexionWaitingBackend(false);
            }
        } catch (e) {
            return false;
        }
    
        return true;
    }
}