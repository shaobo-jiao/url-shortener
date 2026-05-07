namespace UrlShortener.Api;

public record ShortUrlResponse(long Id, string ShortUrl, string OriginalUrl);

public static class ShortUrlResponseMapper
{
    public static ShortUrlResponse ToResponse(this ShortUrl shortUrl, HttpRequest httpRequest)
    {
        var shortUrlPath = new UriBuilder()
        {
            Scheme = httpRequest.Scheme,
            Host = httpRequest.Host.Host,
            Port = httpRequest.Host.Port ?? (httpRequest.Scheme == "https" ? 443 : 80),
            Path = shortUrl.Code
        }.Uri.ToString();
        return new ShortUrlResponse(shortUrl.Id, shortUrlPath, shortUrl.OriginalUrl);
    }
}