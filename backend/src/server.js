import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Swagger
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

// Routes
import usersRoute from "./routes/users.route.js";
import authRoute from "./routes/auth.route.js";
import categoriesRoute from "./routes/categories.route.js";
import foodsRoute from "./routes/foods.route.js";
import addressesRoute from "./routes/addresses.route.js";
import ordersRoute from "./routes/orders.route.js";

// Middlewares
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const server = express();

// Middlewares
server.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());

// Swagger
server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
server.use("/api/auth", authRoute);
server.use("/api/users", usersRoute);
server.use("/api/categories", categoriesRoute);
server.use("/api/foods", foodsRoute);
server.use("/api/addresses", addressesRoute);
server.use("/api/orders", ordersRoute);

// Error handler
server.use(errorHandler);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
