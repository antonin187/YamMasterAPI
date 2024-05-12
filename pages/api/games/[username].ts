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
 *   - name: Movies
 *     description: Operations related to movies
 * /api/movie/{idMovie}:
 *   get:
 *     tags:
 *       - Movies
 *     description: Returns a movie by its id
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the movie to find
 *         required: true
 *         schema:
 *           type: string
 *           format: string
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
 *                   type: object
 *                   $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error404'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 *   put:
 *     tags:
 *       - Movies
 *     description: Update a movie
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the movie to update
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     requestBody:
 *       description: Update a specific movie
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error404'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
 *   delete:
 *     tags:
 *       - Movies
 *     description: Delete a movie
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: id of the movie to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       204:
 *         description: Availability resource deleted.
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error404'
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Response/Error500'
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
