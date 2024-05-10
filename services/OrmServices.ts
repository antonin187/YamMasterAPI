import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";
import { MongoConfigService } from "./MongoConfigServices";
import { ApiResponseManager, CustomError } from "./ApiResponseManager";
// import { FormatValidator } from "../utils/FormatValidator";

// On passe par une fonction pour avoir une connexion à la BDD ponctuelle à l'instanciation de la fonction
const connectToDb = async () => {
  const client = await clientPromise;
  return await client.db(MongoConfigService.databases.yammaster);
};

export const OrmService = {
  connectAndFind: async (collectionName: string) => {
    const db = await connectToDb();

    const elements = await db
        .collection(collectionName)
        .find()
        .toArray();

      return elements
  },

  connectAndFindOne: async (
    collectionName: string,
    idObjectToFind: string,
    optionalUsername?: string
  ) => {
    const db = await connectToDb();
    var elementToFind;

    if (optionalUsername === undefined) {
      elementToFind = await db
        .collection(collectionName)
        .findOne({ _id: new ObjectId(idObjectToFind) });
    } else {
      elementToFind = await db.collection(collectionName).findOne({
        username: new ObjectId(optionalUsername),
      });
    }
    if (elementToFind !== null) {
      return elementToFind;
    } else {
      throw new CustomError(404);
    }
  },

  connectAndFindOneUserByCredentials: async (
    collectionName: string,
    username: String,
    password: string
  ) => {
    const db = await connectToDb();
    var elementToFind;

    
    elementToFind = await db.collection(collectionName).findOne({
        username: username,
        password: password
      });
    if (elementToFind !== null) {
      return elementToFind;
    } else {
      throw new CustomError(404);
    }
  },

  connectAndFindGamesByUsername: async (
    username: String,
  ) => {
    const db = await connectToDb();
    var elementToFind;

    
    const games = await db.collection(MongoConfigService.collections.games).find({
        username: username
      }).toArray();
    if (elementToFind !== null) {
      return games;
    } else {
      throw new CustomError(404);
    }
  },

  connectAndPostOne: async (collectionName: string, objectToInsert: object) => {
    console.log("test");
    
    const db = await connectToDb();

    // Si le format du json dans notre body de requête ne convient pas, on renvoie un erreur "Invalid input"
    // if (!FormatValidator.hasAllGoodProperties(objectToInsert, collectionName)) {
    //   throw new CustomError(400);
    // }

    const newDocument = await db
      .collection(collectionName)
      .insertOne(objectToInsert);

    if (newDocument.insertedId) {
      const newDocumentInserted = await OrmService.connectAndFindOne(
        collectionName,
        newDocument.insertedId.toString()
      );
      return newDocumentInserted;
    }
  },

//   connectAndUpdateOne: async (
//     collectionName: string,
//     bodyParam: any,
//     idObjectToUpdate: string
//   ) => {
//     const db = await connectToDb();

//     const updateParams: { [key: string]: any } = {};

//     Object.keys(bodyParam).forEach((key) => {
//       if (bodyParam[key] !== undefined) {
//         updateParams[key] = bodyParam[key];
//       }
//     });

//     const documentToUpdate = await db
//       .collection(collectionName)
//       .updateOne(
//         { _id: new ObjectId(idObjectToUpdate) },
//         { $set: updateParams }
//       );

//     return await OrmService.connectAndFindOne(collectionName, idObjectToUpdate);
//   },

//   connectAndDeleteOne: async (
//     collectionName: string,
//     idObjectToDelete: string
//   ) => {
//     const db = await connectToDb();
//     const documentToDelete = await db
//       .collection(collectionName)
//       .deleteOne({ _id: new ObjectId(idObjectToDelete) });

//     if (documentToDelete.deletedCount === 0) {
//       throw new CustomError(404);
//     }
//   },
};
