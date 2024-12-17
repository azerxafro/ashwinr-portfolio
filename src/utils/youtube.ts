export function getYouTubeId(url: string): string | null {
  // Check if it's a YouTube Shorts URL
  const shortsRegExp = /^.*((youtube.com\/shorts\/)([^#&?]*))/;
  const shortsMatch = url.match(shortsRegExp);
  if (shortsMatch && shortsMatch[3]) {
    return shortsMatch[3];
  }

  // Regular YouTube video URL
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

export function isYouTubeShorts(url: string): boolean {
  return url.includes('youtube.com/shorts/');
}

export function getRegularYouTubeUrl(shortsUrl: string): string {
  const videoId = getYouTubeId(shortsUrl);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : shortsUrl;
}