// import { Request, Response } from "express";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { OrmService } from "../../services/OrmServices"

import { MongoConfigService } from "../../services/MongoConfigServices";
import { error, log } from "console";
import { ApiResponseManager, CustomError } from "../../services/ApiResponseManager";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags:
 *       - Movies
 *     description: Returns all the movies
 *     responses:
 *       200:
 *         description: successful operation
 *         content :
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 *   post:
 *     tags:
 *       - Movies
 *     description: Add a new movie
 *     responses:
 *       201:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer,
 *                   example: 201
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error400'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 *     requestBody:
 *       description: Create a new movie in the catalogue
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyParam = req.body;

  switch (req.method) {
    case "POST":

    console.log(bodyParam);
      try {
        // Utilisation du service OrmService responsable de la connexion à la BDD et des actions réalisées
        const newGame = await OrmService.connectAndPostOne(
          MongoConfigService.collections.games,
          bodyParam
        );
        // Utilisation du gestionnaire de réponse HTTP, global pour toutes les réponses
        ApiResponseManager.respond(201, res, newGame);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;
    case "GET":
      try {
        const games = await OrmService.connectAndFind(
          MongoConfigService.collections.games
        );
        ApiResponseManager.respond(200, res, games);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;

    default:
      ApiResponseManager.respond(500, res);
      break;
  }
}
