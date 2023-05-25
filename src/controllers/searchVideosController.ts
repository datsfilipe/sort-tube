import { Request, Response } from "express";
import type { Video } from "../utils/getSearch";
import { getSearch } from "../utils/getSearch";
import { getWeight } from "../utils/getWeight";

class SearchVideosController {
  async handle(request: Request, response: Response) {
    const search = request.query?.search as string;
    if (!search) {
      return response.json({ message: "Missing search parameter." });
    }

    try {
      const videos: Video[] = await getSearch(search);

      if (!videos.length) {
        return response.json({ message: "No videos found." });
      }

      return response.json(
        await getWeight(search, videos)
      );

    } catch (error) {
      console.error(error);
      return response.json({ message: "Error while retrieving videos." });
    }
  }
}

export { SearchVideosController };
