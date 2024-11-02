import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                const session = await this.login({ email, password });
                return session; // Ensure the session is returned
            }
            return userAccount;
        } catch (error) {
            throw error;
        }
    }
    

    async login({email, password}) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Session created:", session); 
            return session;

        }
        catch (error){
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            
        }
    }
}


const authService = new AuthService();

export default authService