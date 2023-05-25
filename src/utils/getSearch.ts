import puppeteer from "puppeteer";

export type Video = {
  title: string | null;
  href: string | null;
  type: string;
};

export const getSearch = async (search: string) => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/results?search_query=${search.replace(" ", "+")}`);

  await page.waitForSelector("ytd-item-section-renderer");
  await page.waitForSelector("yt-image");
  const videos: Video[] = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("ytd-video-renderer")).filter((el) => el.querySelector("ytd-ad-slot-renderer") === null);
    return elements.map((el) => {
      // @ts-ignore
      const title: string | undefined = el?.querySelector("#video-title")?.innerText;
      // @ts-ignore
      const href: string | undefined = el?.querySelector("#video-title")?.href;
      return {
        title: title || null,
        href: href || null,
        type: "youtube"
      };
    });
  });

  await browser.close();
  return videos;
};
