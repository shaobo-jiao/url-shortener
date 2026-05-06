using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace UrlShortener.Api;

public static class ShortUrlEndpoints
{
    public static void MapShortUrlEndpoints(this IEndpointRouteBuilder app)
    {
        var shortUrlApi = app.MapGroup("/api/short-url");
        shortUrlApi.MapPost("/", CreateShortUrlAsync);
        shortUrlApi.MapGet("/{code:string}", GetOriginalUrlAsync).WithName("GetOriginalUrl");

        app.MapGet("/{code:string}", RedirectToOriginalUrl);
    }

    public static async Task<Results<CreatedAtRoute<ShorturlResponse>, BadRequest>> CreateShortUrlAsync(ShortUrlService service, CreateShortUrlRequest request)
    {
        throw new NotImplementedException();
    }

    public static async Task GetOriginalUrlAsync(ShortUrlService service, [FromRoute] string code)
    {
        throw new NotImplementedException();
    }

    public static async Task<RedirectHttpResult> RedirectToOriginalUrl(ShortUrlService service, [FromRoute] string code)
    {
        throw new NotImplementedException(); // later use TypedResults.Redirect to redirect
    }
}
