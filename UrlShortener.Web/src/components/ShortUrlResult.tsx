// represents short url creation result

interface Props {
  result: string;
}

const ShortUrlResult = (props: Props) => {
  // get shortened url;
  const shortUrl = props.result;

  return (
    <label>Your Shortened URL: <a href={shortUrl} target="_blank">{shortUrl}</a></label>
  );
}

export default ShortUrlResult;