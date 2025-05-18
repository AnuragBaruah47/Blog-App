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

  async creatAccount({ email, password}) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );
      if (userAccount) {
        this.login({ email, password });
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
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("AppwriteIssue");
      return null;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
