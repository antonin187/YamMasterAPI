// import { Request, Response } from "express";
import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../lib/mongodb";
import { OrmService } from "../../services/OrmServices";


import { MongoConfigService } from "../../services/MongoConfigServices";
import { ApiResponseManager, CustomError } from "../../services/ApiResponseManager";

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Operations related to user authentication
 * /api/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Register a new user
 *     requestBody:
 *       description: User data needed to create a new account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     username:
 *                       type: string
 *                       example: "newuser"
 *       400:
 *         description: Invalid input, data provided is incorrect
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
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyParam = req.body;

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
