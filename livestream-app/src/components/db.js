import {Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk"
export const client= Stitch.initializeDefaultAppClient("application-0-ikqxo");
export const mongodb= client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");