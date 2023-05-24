import { Router } from "express";
import { RandomTweetController } from "./controllers/randomTweetController";

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
  
router.get("/random-tweet", new RandomTweetController().handle);

export default router;
