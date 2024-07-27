import env from "@/app/env";

import sdk, { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

let client = new sdk.Client();

client
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId) // Your project ID
  .setKey(env.appwrite.apikey); // Your secret API key

  
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client)

export {databases,avatars,storage,users,client}