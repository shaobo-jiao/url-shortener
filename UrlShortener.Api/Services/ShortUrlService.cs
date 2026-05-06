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

    public async Task<ShortUrl?> GetShortUrlByCodeAsync(string code)
    {
        // var id = Base62Encoding.Decode(code);
        // var shortUrl = await _dbContext.ShortUrls.FindAsync(id);
        // return shortUrl;
        throw new NotImplementedException();
    }
}
