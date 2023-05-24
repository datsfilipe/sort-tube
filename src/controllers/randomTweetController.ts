import { Request, Response } from "express";

class RandomTweetController {
  async handle(_: Request, response: Response) {
    return response.json({ message: "soon..." });
  }
}

export { RandomTweetController };
