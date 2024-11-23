import conf from '../config.js';
import { Account, Client , ID } from 'appwrite';


// create a class (for clean and goof code)
export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(email,password,name){
        try {
            const userAccount =  await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                // condition
                return this.login(email,password);
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }



    async login(email,password){
        try {
            return await this.account.createEmailPasswordSession(email,password)    
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            // throw error;
            console.log("Appwrite service :: getCurrentUser :: error :: ",error);
        }

        return null;
    }

    async logout(){
        try {
            // await this.account.deleteSession('current'); 
            await this.account.deleteSessions();
        } catch (error) {
            // throw error;
            console.log("Appwrite service :: logout :: error :: ",error);
        }
    }
}

const authService = new AuthService();

export default authService;

// here we are exporting object , if class is imported always we need to make object of it