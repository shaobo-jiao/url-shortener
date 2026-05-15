import React, { useState } from "react"
import type { ShortUrlResponse } from "./ShortUrlApi";
import CreateShortUrlForm from "./components/CreateShortUrlForm";
import ShortUrlResultCard from "./components/ShortUrlResultCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Copy, CopyCheck } from "lucide-react";

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

const App = () => {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ..
  }

  return (
    <>
    <main className="min-h-flex flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>URL Shortener</CardTitle>
          <CardDescription>Enter your URL below to shorten.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Field orientation="horizontal">
              <Input id="original-url" type="url" placeholder="Enter your URL" className="rounded-md" />
              <Button type="submit" variant="outline" className="rounded-md">Create</Button>
            </Field>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <span>Successful!</span>
          <div className="flex flex-row w-full items-center gap-2">
            <a href="#" target="_blank" className="hover:underline flex-1">https://www.google.com</a>
            <Button type="button" variant="outline" size="icon" className="ml-auto"><Copy /></Button>
          </div>
          <Separator />
          <p>The link will expire at 01/01/2005</p>
        </CardFooter>
      </Card>
    </main>
    </>
  )
}

export default App
