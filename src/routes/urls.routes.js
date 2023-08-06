import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlsSchema } from "../schemas/urlsSchema.js";
import {detailsUrl, openUrl, shortenUrl} from "../controllers/urls.controllers.js";
import validateToken from "../middlewares/validateToken.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlsSchema), validateToken, shortenUrl);
urlsRouter.get("/urls/:id", detailsUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);

export default urlsRouter;