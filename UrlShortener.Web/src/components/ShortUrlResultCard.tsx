// represents short url creation result

import type { ShortUrlResponse } from "../ShortUrlApi";

interface Props {
  result: ShortUrlResponse;
}

const ShortUrlResultCard = (props: Props) => {
  // get shortened url;
  // console.log("ShortUrlResultCard rendered with result:", props.result);
  const result = props.result;

  return (
    <section>
      Short URL Created:<br />
      Original URL: {result.originalUrl}<br />
      Short URL: <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">{result.shortUrl}</a><br />
      Expires At: {result.expiresAt}<br />
    </section>
  );
}

export default ShortUrlResultCard;