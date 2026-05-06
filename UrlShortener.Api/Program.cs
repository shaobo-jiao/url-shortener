using Microsoft.EntityFrameworkCore;
using UrlShortener.Api;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opts =>
{
    opts.UseSqlite(builder.Configuration.GetConnectionString("Default"));
});
builder.Services.AddScoped<ShortUrlService>();

var app = builder.Build();
app.MapShortUrlEndpoints();

app.Run();
