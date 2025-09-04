import {Client, Account, Databases, ID, Query, OAuthProvider} from "appwrite";
import * as Google from "expo-auth-session/providers/google";
import { CreateUserParams } from "@/type";
import { SignInParams } from "@/type";


export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.jsm.Momentum" ,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: "68b6bc360003e7e978eb",
    userCollectionId: "user"
}

// create a function to allow the user to create an accoutn and then save it into the database
export const setClient = new Client();

setClient
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)

export const setAccount = new Account(setClient);
export const setDatabase = new Databases(setClient);
const databases = new Databases(setClient);

export const createUser = async ({email,password,name}: CreateUserParams) => {
  try {
    const newAccount = await setAccount.create(ID.unique(), email, password, name)

    if(!newAccount) throw Error;

    await signIn({email,password});

    

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { 
        email,
        name,
        accountId :newAccount.$id
      }
    );
    return newUser;

  } catch (e) {
    throw new Error (e as string);
  }
}

export const signIn = async ({email,password}: SignInParams) => {
  try{
    const session = await setAccount.createEmailPasswordSession(email,password);

    const currentUser = await getCurrentUser();
    return currentUser;
    
  } catch (e) {
    throw new Error(e as string);
  }
}

export const getCurrentUser = async () => {
  try{
    const currentAccount = await setAccount.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]

    
    )
    if(!currentUser) throw Error;

    return currentUser.documents[0];

  } catch (e) {
    throw new Error(e as string);
  }
}

export async function signInWithGoogle (accessToken:string) {
  try{
    // create an OAuth session
    const user = await account.createOAuth2Session(
      OAuthProvider.Google,
      undefined,
      undefined,
      [accessToken]
    )

    const userInfo = await account.get();
    return userInfo;

  } catch (e) {
    throw new Error (e as string);
  }
}


const client = new Client()
  .setEndpoint("https://syd.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/68b6baa900208d4391ae") // your Appwrite API endpoint
  .setProject("68b6baa900208d4391ae"); // project ID from Appwrite console

export const account = new Account(client);