import auth from '@react-native-firebase/auth';
import { eInfoMessageId } from "./InfoMessage";
import { UserProfile } from './UserProfile';

export class AuthentificationInterface
{
    // callback qui permet de mettre le message d'info affiche a l'utilisateur
    private setErrorMessageId : CallableFunction;

    // callback qui permet d'afficher l'ActivityIndicator lors des appels a Firebase
    private setconnexionWaitingBackend : CallableFunction;

    // donnees utilisateur (email, mot de passe)
    private userProfile : UserProfile;
 
    // constructeur
    constructor(
        setErrorMessageId : CallableFunction,
        setconnexionWaitingBackend : CallableFunction,
        userProfile : UserProfile)
        {
      this.setErrorMessageId = setErrorMessageId;
      this.setconnexionWaitingBackend = setconnexionWaitingBackend;
      this.userProfile = userProfile;
    }

    // connexion avec email et mot de passe
    logIn = async () => {

        var email = this.userProfile.getEmail();
        var password = this.userProfile.getPassword();
        var result : boolean = true;    // set return to false whenever an error occured
        
        console.debug('[AuthentificationInterface] email : ' + email);
        if(email === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyEmail);
        }
        else if(password === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyPassword);
        }
        else {
            this.setconnexionWaitingBackend(true);
            try {
                await auth().signInWithEmailAndPassword(email, password);
            } catch (e : any) {
                console.debug('[AuthentificationInterface] Error during logIn => ' + e);
                if(e.code === 'auth/invalid-email')
                {
                    this.setErrorMessageId(eInfoMessageId.EmailBadlyFormatted);
                }
                else if(e.code === 'auth/user-not-found')
                {
                    this.setErrorMessageId(eInfoMessageId.UserNotFound);
                }
                else if(e.code === 'auth/wrong-password')
                {
                    this.setErrorMessageId(eInfoMessageId.WrongPassword);
                }
                else 
                {
                    this.setErrorMessageId(eInfoMessageId.ConnectionImpossible);
                }
                result = false;
            }
            this.setconnexionWaitingBackend(false);
        }
    
        return result;
    }

    // deconnexion
    logOut = async () => {
        
        var result : boolean = true;    // set return to false whenever an error occured
    
        this.setconnexionWaitingBackend(true);
        try {
            await auth().signOut();
        } catch (e) {
            this.setErrorMessageId(eInfoMessageId.DisconnectionImpossible);
            console.debug('[AuthentificationInterface] Error during logOut');
            result = false;
        }
        this.setconnexionWaitingBackend(false);
        
        return result;
    }
    
    // creation du compte 
    // TODO gerer les differents cas d'erreur
    signIn = async () => {
        
        var email = this.userProfile.getEmail();
        var password = this.userProfile.getPassword();
        var result : boolean = true;    // set return to false whenever an error occured
    
        // avant de tenter une inscription on verifie si l'utilisateur a renseigner un email et mot de passe
        // un email de verification est envoye a l'utilisateur
        if(email === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyEmail);
        }
        else if(password === '') {
            this.setErrorMessageId(eInfoMessageId.EmptyPassword);
        }
        else {
            this.setconnexionWaitingBackend(true);
            try {
                await auth().createUserWithEmailAndPassword(email, password);
                await auth().currentUser?.sendEmailVerification();
            } catch (e : any) {
                
                console.debug('[AuthentificationInterface] Error during signIn => ' + e);
                if(e.code === 'auth/invalid-email')
                {
                    this.setErrorMessageId(eInfoMessageId.EmailBadlyFormatted);
                }
                else if(e.code === 'auth/weak-password')
                {
                    this.setErrorMessageId(eInfoMessageId.WeakPassword);
                }
                else 
                {
                    this.setErrorMessageId(eInfoMessageId.AccountCreationImpossible);
                }
                result = false;
            }
            this.setconnexionWaitingBackend(false);
        }
    
        return result;
    }
    
    // suppression du compte
    // TODO gerer les differents cas d'erreur
    signOut = async () => {
        
        var email = this.userProfile.getEmail();
        var password = this.userProfile.getPassword();
        var result : boolean = true;    // set return to false whenever an error occured
        
        this.setconnexionWaitingBackend(true);

        // avant la suppression on doit connecter l'utilisateur
        try {
            await auth().signInWithEmailAndPassword(email, password);
            await auth().currentUser?.delete();
        } catch (e) {
            this.setErrorMessageId(eInfoMessageId.AccountDeletionImpossible);
            console.debug('[AuthentificationInterface] Error during signOut');
            result = false;
        }

        this.setconnexionWaitingBackend(false);
    
        return result;
    }
    
    // modification du mot de passe
    // TODO gerer les differents cas d'erreur
    resetPassword = async (email : string) => {
        
        //var email = this.userProfile.getEmail();
        var result : boolean = true;    // set return to false whenever an error occured
        
        this.setconnexionWaitingBackend(true);
        
        // envoie d'un mail pour modification du mot de passe
        try {
            await auth().sendPasswordResetEmail(email);
        } catch (e) {
            this.setErrorMessageId(eInfoMessageId.ErrorResettingPassword);
            console.debug('[AuthentificationInterface] Error during resetPassword');
            result = false;
        }
        
        // si le mail a ete envoye avec succes on deconnecte l'utilisateur
        try {
            if(auth().currentUser?.email && result)
            {
                await auth().signOut();
            }
        } catch (e) {
            this.setErrorMessageId(eInfoMessageId.ErrorResettingPassword);
            console.debug('[AuthentificationInterface] Error during resetPassword');
            result = false;
        }

        this.setconnexionWaitingBackend(false);
        this.setErrorMessageId(eInfoMessageId.PasswordResetEmailSent);
    
        return result;
    }
}