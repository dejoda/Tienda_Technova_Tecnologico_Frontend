import { environment } from "../../environments/environment.development";

export const ImageService = {
  resolve(url?: string) {
    if (!url) return "";

    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("data:")
    ) {
      return url;
    }

    return `${environment.apiBaseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  }
};