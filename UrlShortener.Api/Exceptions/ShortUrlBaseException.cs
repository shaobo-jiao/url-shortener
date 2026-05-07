namespace UrlShortener.Api;

public class ShortUrlBaseException: Exception
{
    public ShortUrlBaseException() : base() { }
    public ShortUrlBaseException(string message) : base(message){}
}
