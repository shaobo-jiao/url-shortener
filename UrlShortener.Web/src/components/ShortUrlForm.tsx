// Short Url Creation Form

import { useState } from "react";

interface Props {
  onCreate: (shortUrl: string) => void;
}


const ShortUrlForm = (props: Props) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    // todo: get original url, call API, get result, return upwards 

    const shortUrl = "https://www.google.com"; // simulate created short url
    props.onCreate(shortUrl); // callback

    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="url" value={originalUrl} onChange={e => setOriginalUrl(e.target.value)}
        placeholder="Enter your URL to shorten..." />
      <button type="submit">Go</button>
    </form>
  );
}


export default ShortUrlForm;
