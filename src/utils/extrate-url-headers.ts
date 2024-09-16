export const extractUrlAndHeaders = (
  url: string
): { url: string; headers: { [key: string]: string } } => {
  const parsedUrl: URL = new URL(url);
  const path: string = parsedUrl.pathname;
  const queryParams: { [key: string]: string } = Array.from(
    parsedUrl.searchParams.entries()
  ).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const headers: { [key: string]: string } = {
    ...queryParams,
    "Content-Type": "application/pdf",
    host: parsedUrl.hostname + ":" + parsedUrl.port,
  };

  delete headers["X-Amz-Expires"];

  return {
    url: `${parsedUrl.origin}${path}`,
    headers,
  };
};
