import React, { useState } from "react"
import { createShortUrl, type ShortUrlResponse } from "./ShortUrlApi";
import CreateShortUrlForm from "./components/CreateShortUrlForm";
import ShortUrlResultCard from "./components/ShortUrlResultCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, CircleX, Copy, CopyCheck } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

// const App = () => {
//   const [shortUrlResponse, setShortUrlResponse] = useState(null as ShortUrlResponse | null);

//   const handleCreate = (response: ShortUrlResponse) => {
//     // console.log("App received short URL result:", response);
//     setShortUrlResponse(response);
//   }

//   return (
//     <>
//       <CreateShortUrlForm onCreate={handleCreate} />
//       {shortUrlResponse && <ShortUrlResultCard result={shortUrlResponse} />}
//     </>
//   );
// }

// input, output


const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [response, setResponse] = useState(null as ShortUrlResponse | null)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResponse(null);
    setIsCreating(true);
    setHasError(false);
    try {
      const response = await createShortUrl({ originalUrl });
      setResponse(response);
      setIsCreating(false);
    }
    catch (e) {
      setHasError(true);
      setIsCreating(false);
    }
  }


  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (response === null) return;
    await navigator.clipboard.writeText(response.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <>
      <main className="min-h-flex flex items-center justify-center p-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>URL Shortener</CardTitle>
            <CardDescription>Enter your URL to shorten.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Field orientation="horizontal">
                <Input id="original-url" type="url" placeholder="https://example.com" className="rounded-md" value={originalUrl} onChange={e => setOriginalUrl(e.target.value)} />
                {!isCreating ? <Button type="submit" variant="outline" className="rounded-md" disabled={isCreating}>Create</Button>
                  : <Button variant="outline" disabled><Spinner data-icon="inline-start" /> Creating...</Button>}
              </Field>
            </form>
          </CardContent>

          {response &&
            <CardFooter>
              <div className="flex flex-col w-full items-start gap-2">
                <h3 className="font-medium flex items-center gap-1"><CircleCheck className="size-4"/> Successful!</h3>
                <div className="flex flex-row w-full items-center gap-2">
                  <a href={response.shortUrl} target="_blank" className="hover:underline flex-1 ">{response.shortUrl}</a>
                  <Button type="button" variant="outline" size="icon" className="ml-auto" onClick={handleCopy}>
                    {copied ? <CopyCheck /> : <Copy />}
                  </Button>
                </div>
                <Separator />
                <p className="text-muted-foreground">The link will expire at {response.expiresAt.toLocaleString()}</p>
              </div>
            </CardFooter>
          }

          {hasError &&
            <CardFooter>
              <div className="flex flex-col w-full items-start gap-2">
                <h3 className="font-medium flex items-center gap-1"><CircleX className="size-4" /> Oops, something went wrong.</h3>
                <p className="text-muted-foreground">Please try again later. If the issue persists, please contact the website owner.</p>
              </div>
            </CardFooter>
          }
        </Card>
      </main>
    </>
  )
}

export default App
