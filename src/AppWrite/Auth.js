import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;


  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
  }


  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error, "login error");
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log(user, "user is here");
      return user;
    } catch (error) {
      console.log(error, "user is not here");
      return null;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions(
      );
    } catch (error) {
      if(error?.code !== "401"){
        throw error
      }
    }
  }
}

const authService = new AuthService();

export default authService;
