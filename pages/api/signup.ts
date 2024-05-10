// import { Request, Response } from "express";
import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../lib/mongodb";
import { OrmService } from "../../services/OrmServices";


import { MongoConfigService } from "../../services/MongoConfigServices";
import { ApiResponseManager, CustomError } from "../../services/ApiResponseManager";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyParam = req.body;

  console.log(bodyParam);
  

  switch (req.method) {
    case "POST":
      try {
        
        // Utilisation du service OrmService responsable de la connexion à la BDD et des actions réalisées
        const newUser = await OrmService.connectAndPostOne(
          MongoConfigService.collections.users,
          bodyParam
        );

        // Utilisation du gestionnaire de réponse HTTP, global pour toutes les réponses
        ApiResponseManager.respond(201, res, newUser);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;

    default:
      ApiResponseManager.respond(500, res);
      break;
  }
}
