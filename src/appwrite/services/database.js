import { Client, Databases, ID, Query, } from "appwrite";
import appwritekeys from "../../conf/conf";

export class DatabaseService {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(appwritekeys.appwriteUrl)
      .setProject(appwritekeys.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createTodo(data) {
    try {
      return await this.databases.createDocument(
        appwritekeys.appwriteDatabaseId,
        appwritekeys.appwriteCollectionId,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log("Appwrite Database Error:", error);
    }
  }

  async getTodos(userId) {
    try {
      return await this.databases.listDocuments(
        appwritekeys.appwriteDatabaseId,
        appwritekeys.appwriteCollectionId,
        [Query.equal("userId",userId)]
      );
    } catch (error) {
      console.log("Appwrite Database Error:", error);
    }
  }
}

const appwriteDataService = new DatabaseService();

export default appwriteDataService;
