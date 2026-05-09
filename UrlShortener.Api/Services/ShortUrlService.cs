namespace UrlShortener.Api;

public class ShortUrlService(AppDbContext dbContext)
{
    private AppDbContext _dbContext = dbContext;

    public async Task<ShortUrl> CreateShortUrl(CreateShortUrlRequest request)
    {
        var shortUrl = new ShortUrl();
        _dbContext.Add(shortUrl);
        await _dbContext.SaveChangesAsync();

        shortUrl.Code = Base62Encoding.Encode(shortUrl.Id);
        shortUrl.OriginalUrl = request.OriginalUrl;

        await _dbContext.SaveChangesAsync();
        return shortUrl;
    }

    public async Task<ShortUrl> GetShortUrlByCodeAsync(string code)
    {
        if (!Base62Encoding.TryDecode(code, out long id))
            throw new ShortUrlInvalidCodeException();

        var shortUrl = await _dbContext.ShortUrls.FindAsync(id) ?? throw new ShortUrlNotFoundException();
        if (shortUrl.ExpiresAt < DateTime.UtcNow) throw new ShortUrlExpiredException();
        return shortUrl;
    }

    /// <summary>
    /// Saves a Short URL click event into database.
    /// </summary>
    /// <param name="clickEvent"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task SaveClickEventAsync(ShortUrlClickEvent clickEvent, CancellationToken cancellationToken)
    {
        var click = new ShortUrlClick()
        {
            ShortUrlId = clickEvent.ShortUrlId,
            ClickedAt = clickEvent.ClickedAt
        };
        await _dbContext.ShortUrlClicks.AddAsync(click, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
