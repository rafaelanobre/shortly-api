import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlsSchema } from "../schemas/urlsSchema.js";
import {deleteUrl, detailsUrl, openUrl, shortenUrl} from "../controllers/urls.controllers.js";
import validateToken from "../middlewares/validateToken.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlsSchema), validateToken, shortenUrl);
urlsRouter.get("/urls/:id", detailsUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);
urlsRouter.get("/users/me", validateToken, );
urlsRouter.get("/ranking", )

export default urlsRouter;