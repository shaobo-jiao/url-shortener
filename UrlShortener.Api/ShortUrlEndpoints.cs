using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace UrlShortener.Api;

public static class ShortUrlEndpoints
{
    public static void MapShortUrlEndpoints(this IEndpointRouteBuilder app)
    {
        var shortUrlApi = app.MapGroup("/api/short-url");
        shortUrlApi.MapPost("/", CreateShortUrlAsync);
        shortUrlApi.MapGet("/{code}", GetOriginalUrlAsync).WithName("GetOriginalUrl");

        app.MapGet("/{code}", RedirectToOriginalUrl);
    }

    public static async Task<Results<Ok<ShortUrlResponse>, CreatedAtRoute<ShortUrlResponse>, BadRequest>> CreateShortUrlAsync(HttpRequest httpRequest,
        ShortUrlService shortUrlSvc, CreateShortUrlRequest request)
    {
        var shortUrlEntity = await shortUrlSvc.CreateShortUrl(request);
        var shortUrl = new UriBuilder()
        {
            Scheme = httpRequest.Scheme,
            Host = httpRequest.Host.Host,
            Port = httpRequest.Host.Port ?? (httpRequest.Scheme == "https" ? 443 : 80),
            Path = shortUrlEntity.Code
        }.Uri.ToString();
        var response = new ShortUrlResponse(shortUrlEntity.Id, shortUrl, shortUrlEntity.OriginalUrl);
        // return TypedResults.CreatedAtRoute(response, "GetOriginalUrl", shortUrlEntity.Code);
        return TypedResults.Ok(response);
    }

    public static async Task GetOriginalUrlAsync(ShortUrlService service, [FromRoute] string code)
    {
        throw new NotImplementedException();
    }

    public static async Task<Results<RedirectHttpResult, NotFound>> RedirectToOriginalUrl(ShortUrlService service, [FromRoute] string code)
    {
        // var shortUrl = await service.GetShortUrlByCodeAsync(code);
        // if (shortUrl is null) return TypedResults.NotFound();
        // return TypedResults.Redirect(shortUrl.OriginalUrl, permanent: false);
        throw new NotImplementedException();
    }
}
