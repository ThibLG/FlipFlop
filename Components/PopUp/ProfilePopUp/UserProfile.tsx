// Classe regroupant les donnees de l'utilisateur

export class UserProfile 
{
    private email       : string;
    private password    : string;

    constructor()
    {
        this.email      = "";
        this.password   = "";
    }

    public setEmail(email : string)
    {
        this.email = email;
    }

    public setPassword(password : string)
    {
        this.password = password;
    }

    public getEmail() { return this.email; }

    public getPassword() { return this.password; }
}