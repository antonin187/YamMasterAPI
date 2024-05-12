import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
// import clientPromise from "../../../lib/mongodb";
import { OrmService } from "../../services/OrmServices";
import { MongoConfigService } from "../../services/MongoConfigServices"
import { ApiResponseManager } from "../../services/ApiResponseManager";


/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Operations related to user authentication
 * /api/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Authenticate a user and retrieve their data
 *     requestBody:
 *       description: User credentials needed to authenticate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "s3cr3tp4ssw0rd"
 *     responses:
 *       200:
 *         description: Successful authentication
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
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f191e810c19729de860ea"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *       400:
 *         description: Invalid username or password
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
  const { username } = req.query;
  const bodyParam = req.body;

  switch (req.method) {
    case "POST":
      try {
        const user = await OrmService.connectAndFindOneUserByCredentials(
          MongoConfigService.collections.users,
          bodyParam.username,
          bodyParam.password
        );
        ApiResponseManager.respond(200, res, user);
      } catch (error: any) {
        ApiResponseManager.respond(error.code, res);
      }
      break;

    default:
      ApiResponseManager.respond(500, res);
      break;
  }
}
