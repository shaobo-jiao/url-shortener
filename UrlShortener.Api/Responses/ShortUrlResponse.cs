namespace UrlShortener.Api;

public record ShortUrlResponse(long Id, string ShortUrl, string OriginalUrl);
