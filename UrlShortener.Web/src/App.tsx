import { useState } from "react"
import ShortUrlForm from "./components/ShortUrlForm";
import ShortUrlResult from "./components/ShortUrlResult";

const App = () => {
  const [shortUrlResult, setShortUrlResult] = useState("");

  const handleCreate = (shortUrl: string) => {
    setShortUrlResult(shortUrl);
  }

  return (
    <>
      <ShortUrlForm onCreate={handleCreate} />
      <ShortUrlResult result={shortUrlResult} />
    </>
  );
}

export default App
