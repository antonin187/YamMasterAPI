// import { Request, Response } from "express";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { OrmService } from "../../services/OrmServices"

import { MongoConfigService } from "../../services/MongoConfigServices";
import { error, log } from "console";
import { ApiResponseManager, CustomError } from "../../services/ApiResponseManager";

/**
 * @swagger
 * /api/games:
 *   get:
 *     tags:
 *       - Games
 *     description: Returns all games
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
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
 *                     $ref: '#/components/schemas/Game'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 *   post:
 *     tags:
 *       - Games
 *     description: Create a new game
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error400'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 *     requestBody:
 *       description: Provide the details of the new game
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewGameRequest'
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
