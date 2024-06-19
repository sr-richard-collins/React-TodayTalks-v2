// utils.js
import { IMAGE_BASE_URL } from '../config/';

export const updateFavicon = (faviconUrl) => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = IMAGE_BASE_URL + faviconUrl;
      document.head.appendChild(newLink);
    } else {
      link.href = IMAGE_BASE_URL + faviconUrl;
    }
  };
  