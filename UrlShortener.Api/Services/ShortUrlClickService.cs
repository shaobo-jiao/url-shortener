namespace UrlShortener.Api;

public class ShortUrlClickService(AppDbContext dbContext)
{
    private AppDbContext _dbContext = dbContext;

    public async Task CreateShortUrlClickAsync(ShortUrl shortUrl, DateTimeOffset clickedAt)
    {
        var click = new ShortUrlClick()
        {
            ShortUrl = shortUrl,
            ClickedAt = clickedAt
        };
        await _dbContext.ShortUrlClicks.AddAsync(click);
        await _dbContext.SaveChangesAsync();
    }
}
