// Short Url Creation Form

import { useState } from "react";
import { createShortUrl, type ShortUrlResponse } from "../ShortUrlApi";

interface Props {
  onCreate: (response: ShortUrlResponse) => void;
}

const CreateShortUrlForm = (props: Props) => {
  // console.log("CreateShortUrlForm rendered");
  const [originalUrl, setOriginalUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // console.log("Form submitted with URL:", originalUrl);
    setIsCreating(true);
    
    try
    {
      // console.log("Calling createShortUrl API...");
      const response = await createShortUrl({ originalUrl });
      // console.log("API response:", response);
      props.onCreate(response); // callback
      setIsCreating(false);
      // console.log("API response:", response);
    }
    catch (error)
    {
      setIsCreating(false);
      if (error instanceof Error)
        setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="url" value={originalUrl} onChange={e => setOriginalUrl(e.target.value)}
          placeholder="Enter your URL to shorten..." />
        <button type="submit" disabled={isCreating}>{isCreating ? "Creating..." : "Go"}</button>
      </form>
      {error && <p>Error: {error}</p>}
    </>
  );
}


export default CreateShortUrlForm;
