export const LINKS_PER_PAGE = 3;

export const getDomain = (url: string) => {
  return url.replace(/^https?:\/\//i, "");
};

/* EMAIL REGEX: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) */
/* URL REGEX: !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) */
