import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
// import clientPromise from "../../../lib/mongodb";
import { OrmService } from "../../../services/OrmServices";
import { MongoConfigService } from "../../../services/MongoConfigServices";
import { ApiResponseManager } from "../../../services/ApiResponseManager";

interface RequestWithQuery extends NextApiRequest {
  query: {
    username: string;
  };
}

/**
 * @swagger
 * tags:
 *   - name: Games
 *     description: Operations related to games management
 * /api/games/{username}:
 *   get:
 *     tags:
 *       - Games
 *     description: Retrieve all games associated with a specific username
 *     parameters:
 *       - name: username
 *         in: path
 *         description: Username to retrieve games for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of games
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
 *       404:
 *         description: No games found for the specified username
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */
export default async function handler(
  req: RequestWithQuery,
  res: NextApiResponse
) {
  const { username } = req.query;
  const bodyParam = req.body;

  switch (req.method) {
    case "GET":
      try {
        const games = await OrmService.connectAndFindGamesByUsername(
          username
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
