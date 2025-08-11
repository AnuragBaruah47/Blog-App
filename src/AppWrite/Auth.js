import config from "../config/config";

import { Client, Account, ID, Query, Databases } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!userAccount) {
        console.log("Account Creation Failed");
        return null;
      }
      const login = await this.login({ email, password });
      if (!login) {
        console.log("login failed");
        return null;
      }

      const newUser = await this.saveUserToDB({
        accountId: userAccount.$id,
        Name: userAccount.name,
        Email: userAccount.email,
      });
      if (!newUser) {
        console.log("Failed to Save UserData In The DataBase");
        return null;
      }

      return newUser;
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
      await this.account.deleteSessions();
    } catch (error) {
      if (error?.code !== "401") {
        throw error;
      }
    }
  }

  async getUserInfo(userId) {
    try {
      const userInfo = await this.databases.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteUserCollectionID,
        [Query.equal("accountId", userId)]
      );
      console.log(userInfo);

      return userInfo.documents[0];
    } catch (error) {
      console.log("Issue in getUserInfo Function");
      return null;
    }
  }

  async getAllUser() {
    try {
      const allUser = await this.databases.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteUserCollectionID
      );
      return allUser.documents;
    } catch (error) {
      console.log("error", error);
      return [];
    }
  }

  async saveUserToDB({ accountId, Name, Email }) {
    try {
      const users = await this.getUserInfo(accountId);
      if (users) {
        return users;
      } else {
        const userDataSave = await this.databases.createDocument(
          config.appwriteDatabaseID,
          config.appwriteUserCollectionID,
          ID.unique(),
          {
            accountId,
            Name,
            Email,
          }
        );
        return userDataSave;
      }
    } catch (error) {
      console.log("Appwrite Service Error tmkc::::  ", error);
    }
  }

    

}

const authService = new AuthService();

export default authService;
