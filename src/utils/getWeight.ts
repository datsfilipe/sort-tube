import { Configuration, OpenAIApi } from "openai";
import { env } from "../env";
import { Video } from "./getSearch";

export async function getWeight(search: string, list: Video[]) {
  const prompt = `
    The following is a list of videos about ${search}:
    ${list.map((video) => `- ${video.title}, url: (${video.href})`).join("\n")}

    Order the videos by relevance to the search term, keeping the original list format.
  `;

  const configuration = new Configuration({
    apiKey: env.OPEN_AI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1024,
    temperature: 0.3,
    top_p: 1.0,
    n: 1,
    frequency_penalty: 1,
    presence_penalty: 0.5,
  });

  try {
    if (!response.data.choices[0].text) {
      throw new Error("No choices found. Probably exceeded the API limit.");
    }

    // transform the text answer in Video[] format
    const answer = response.data.choices[0].text.split("\n").slice(1, -1);
    let videos = answer.map((video) => {
      const title = video.split(", url: ")[0].slice(2);
      const href = video.split(", url: ")[1].slice(1, -1);
      return { title, href };
    });

    videos = videos.filter((video) => {
      const index = list.findIndex((item) => item.title === video.title);
      if (index === -1) {
        return false;
      }
      if (video.href !== list[index].href) {
        return false;
      }
      return true;
    });

    return videos;
  } catch (error) {
    console.error(error);
    throw new Error("Error while retrieving videos.");
  }
}
