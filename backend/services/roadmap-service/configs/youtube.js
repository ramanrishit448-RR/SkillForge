import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") });
dotenv.config();
import axios from "axios";
import ytSearch from "yt-search";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

/**
 * Fallback direct video search using yt-search when Google Cloud YouTube Data API quota is reached
 */
const searchDirectVideoViaScraper = async (topic) => {
  try {
    // 1. Try Virtual Code specific tutorial first
    const r1 = await ytSearch(`Virtual Code ${topic}`);
    const vcVideo = r1?.videos?.find((v) =>
      v.author?.name?.toLowerCase().includes("virtual code")
    );

    if (vcVideo) {
      return {
        title: vcVideo.title,
        channel: vcVideo.author?.name || "Virtual Code",
        url: vcVideo.url.startsWith("http")
          ? vcVideo.url
          : `https://www.youtube.com/watch?v=${vcVideo.videoId}`,
      };
    }

    // 2. Search general top tutorial video
    const r2 = await ytSearch(`${topic} tutorial`);
    if (r2?.videos && r2.videos.length > 0) {
      const topVideo = r2.videos[0];
      return {
        title: topVideo.title,
        channel: topVideo.author?.name || "YouTube",
        url: topVideo.url.startsWith("http")
          ? topVideo.url
          : `https://www.youtube.com/watch?v=${topVideo.videoId}`,
      };
    }
  } catch (err) {
    console.error("[yt-search fallback error]:", err.message);
  }
  return null;
};

const searchVideo = async (topic) => {
  try {
    // If YouTube API Key is available, attempt official Google YouTube Data API
    if (process.env.YOUTUBE_API_KEY) {
      try {
        // 1. Search Virtual Code first
        let query = `Virtual Code ${topic}`;
        let { data } = await axios.get(BASE_URL, {
          params: {
            key: process.env.YOUTUBE_API_KEY,
            part: "snippet",
            q: query,
            maxResults: 1,
            type: "video",
          },
        });

        if (data.items && data.items.length > 0) {
          const video = data.items[0];
          if (
            video.snippet.channelTitle.toLowerCase().includes("virtual code")
          ) {
            return {
              title: video.snippet.title,
              channel: video.snippet.channelTitle,
              url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            };
          }
        }

        // 2. General Search via Google API
        query = `${topic} tutorial`;
        ({ data } = await axios.get(BASE_URL, {
          params: {
            key: process.env.YOUTUBE_API_KEY,
            part: "snippet",
            q: query,
            maxResults: 1,
            type: "video",
          },
        }));

        if (data.items && data.items.length > 0) {
          const video = data.items[0];
          return {
            title: video.snippet.title,
            channel: video.snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          };
        }
      } catch (apiError) {
        console.warn(
          `[YouTube API Quota/Error] Falling back to direct video finder for "${topic}":`,
          apiError.response?.data?.error?.message || apiError.message
        );
      }
    }

    // Direct video finder fallback (always finds an exact video without quota exhaustion)
    const directVideo = await searchDirectVideoViaScraper(topic);
    if (directVideo) {
      return directVideo;
    }

    return null;
  } catch (error) {
    console.error("[searchVideo Error]:", error.message);
    return null;
  }
};

export default searchVideo;