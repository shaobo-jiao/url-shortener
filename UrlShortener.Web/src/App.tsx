import { useState } from "react"
import type { ShortUrlResponse } from "./ShortUrlApi";
import CreateShortUrlForm from "./components/CreateShortUrlForm";
import ShortUrlResultCard from "./components/ShortUrlResultCard";

const App = () => {
  const [shortUrlResponse, setShortUrlResponse] = useState(null as ShortUrlResponse | null);

  const handleCreate = (response: ShortUrlResponse) => {
    // console.log("App received short URL result:", response);
    setShortUrlResponse(response);
  }

  return (
    <>
      <CreateShortUrlForm onCreate={handleCreate} />
      {shortUrlResponse && <ShortUrlResultCard result={shortUrlResponse} />}
    </>
  );
}

export default App
