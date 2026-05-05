namespace UrlShortener.Api;

public class ShortUrl
{
    public long Id { get; set;}
    public string Code {get; set;} // converted from Id to a short code as the short URL identifier.
    public string OriginalUrl { get; set; } // original long url to shorten
}
