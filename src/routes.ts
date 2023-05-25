import { Router } from "express";
import { SearchVideosController } from "./controllers/searchVideosController";

const router = Router();

const routes = {
  "/": {
    get: {
      description: "Show the API status and endpoints.",
    },
  },
  "/random-tweet": {
    get: {
      description: "Show a random tweet.",
    },
  },
};

router.get("/", (_, response) => {
  return response.json({
    message: "Welcome to the ScrapAI API!",
    routes,
  });
});
  
router.get("/videos", new SearchVideosController().handle);

export default router;
