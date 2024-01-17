export function formatUrl(url: string): string {
  if (url !== undefined) {
    return url.split("/")[6];
  } else {
    return "";
  }
}
