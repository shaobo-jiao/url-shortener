using Microsoft.EntityFrameworkCore;
using UrlShortener.Api;

var builder = WebApplication.CreateBuilder(args);
// database
builder.Services.AddDbContext<AppDbContext>(opts =>
{
    opts.UseSqlite(builder.Configuration.GetConnectionString("Default"));
});
// swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "UrlShortener.API";
    config.Title = "UrlShortener.API v1";
    config.Version = "v1";
});

builder.Services.AddScoped<ShortUrlService>();

var app = builder.Build();
// swagger
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "UrlShortener.API Swagger UI";
        config.DocExpansion = "list";
    });
}

app.MapShortUrlEndpoints();

app.Run();
