using API.Interfaces;
using API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient<IFatsecretRepository, FatsecretService>();

var app = builder.Build();

app.MapControllers();

app.Run();
