namespace UrlShortener.Api;

public class ShortUrlService(AppDbContext dbContext)
{
    private AppDbContext _dbContext = dbContext;

    public async Task<ShortUrl> CreateShortUrlAsync(CreateShortUrlRequest request, CancellationToken cancellationToken)
    {
        // use same transaction for the two saves.
        await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

        var shortUrl = new ShortUrl
        {
            OriginalUrl = request.OriginalUrl
        };
        await _dbContext.ShortUrls.AddAsync(shortUrl);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // computes code from auto populated ID.
        shortUrl.Code = Base62Encoding.Encode(shortUrl.Id);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await transaction.CommitAsync(cancellationToken);
        return shortUrl;
    }

    public async Task<ShortUrl> GetShortUrlByCodeAsync(string code, CancellationToken cancellationToken)
    {
        if (!Base62Encoding.TryDecode(code, out long id))
            throw new ShortUrlInvalidCodeException();

        var shortUrl = await _dbContext.ShortUrls.FindAsync(id, cancellationToken) ?? throw new ShortUrlNotFoundException();
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
