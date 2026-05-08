using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace UrlShortener.Api;

public static class ShortUrlEndpoints
{
    public static void MapShortUrlEndpoints(this IEndpointRouteBuilder app)
    {
        var shortUrlApi = app.MapGroup("/api/short-urls");
        shortUrlApi.MapPost("/", CreateShortUrlAsync);
        
        shortUrlApi.MapGet("/{code}", GetOriginalUrlAsync)
            .WithName("GetOriginalUrl")
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status410Gone)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        app.MapGet("/{code}", RedirectToOriginalUrl)
            .ExcludeFromDescription(); // exclude from Swagger
    }

    public static async Task<Results<CreatedAtRoute<ShortUrlResponse>, BadRequest>> CreateShortUrlAsync(
        HttpRequest httpRequest, ShortUrlService shortUrlSvc, CreateShortUrlRequest request)
    {
        var shortUrl = await shortUrlSvc.CreateShortUrl(request);
        var response = shortUrl.ToResponse(httpRequest);
        return TypedResults.CreatedAtRoute(response, "GetOriginalUrl", new { code = shortUrl.Code });
    }

    public static async Task<Results<Ok<ShortUrlResponse>, ProblemHttpResult>> GetOriginalUrlAsync(
        HttpRequest httpRequest, ShortUrlService shortUrlSvc, [FromRoute] string code)
    {
        try
        {
            var shortUrl = await shortUrlSvc.GetShortUrlByCodeAsync(code);
            return TypedResults.Ok(shortUrl.ToResponse(httpRequest));
        }
        catch (ShortUrlBaseException ex)
        {
            return ex.ToProblem();
        }
    }

    public static async Task<Results<RedirectHttpResult, ProblemHttpResult>> RedirectToOriginalUrl(
        ShortUrlService service, [FromRoute] string code)
    {
        try
        {
            var shortUrl = await service.GetShortUrlByCodeAsync(code);
            return TypedResults.Redirect(shortUrl.OriginalUrl, permanent: false);
        }
        catch (ShortUrlBaseException ex)
        {
            return ex.ToProblem();
        }
    }
}
