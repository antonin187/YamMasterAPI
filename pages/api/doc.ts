import { withSwagger } from "next-swagger-doc";

const swaggerHandler = withSwagger({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yam Master API",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Authentication",
        description: "Operations related to user authentication",
      },
      {
        name: "Games",
        description: "Operations related to games management",
      },
    ],
    components: {
      schemas: {
        LoginRequest: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
        SignupRequest: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            status: { type: "integer", example: 200 },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                username: { type: "string" },
                password: { type: "string" }, // Consider removing password for security reasons
              },
            },
          },
        },
        SignupResponse: {
          type: "object",
          properties: {
            status: { type: "integer", example: 201 },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                username: { type: "string" },
                password: { type: "string" }, // Consider removing password for security reasons
              },
            },
          },
        },
        GamesListResponse: {
          type: "object",
          properties: {
            status: { type: "integer", example: 200 },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Game",
              },
            },
          },
        },
        NewGameRequest: {
          type: "object",
          properties: {
            username: { type: "string" },
            gameState: { type: "object" },
          },
        },
        GameResponse: {
          type: "object",
          properties: {
            status: { type: "integer", example: 200 },
            data: {
              $ref: "#/components/schemas/Game",
            },
          },
        },
        Game: {
          type: "object",
          properties: {
            _id: { type: "string" },
            username: { type: "string" },
            gameState: { type: "object" },
            date: { type: "string", format: "date-time" },
          },
        },
        // Adding standard response schemas
        Message200: {
          type: "object",
          properties: {
            status: { type: "integer", example: 200 },
            data: { type: "object" }, // You may need to further define or reference other schemas
          }
        },
        Message201: {
          type: "object",
          properties: {
            status: { type: "integer", example: 201 },
            data: { type: "object" }, // You may need to further define or reference other schemas
          }
        },
        Message204: {
          type: "object",
          properties: {
            status: { type: "integer", example: 204 },
            message: { type: "string", example: "Resource deleted successfully." },
          }
        },
        Error400: {
          type: "object",
          properties: {
            status: { type: "integer", example: 400 },
            message: { type: "string", example: "Bad Request" },
            description: { type: "string", example: "The request cannot be fulfilled due to bad syntax." }
          }
        },
        Error404: {
          type: "object",
          properties: {
            status: { type: "integer", example: 404 },
            message: { type: "string", example: "Not Found" },
            description: { type: "string", example: "The requested resource could not be found." }
          }
        },
        Error500: {
          type: "object",
          properties: {
            status: { type: "integer", example: 500 },
            message: { type: "string", example: "Internal Server Error" },
            description: { type: "string", example: "An unexpected error occurred while processing the request." }
          }
        },
      },
    },
  },
  apiFolder: "pages/api",
});

export default swaggerHandler();
