using API.Interfaces;
using API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient<IFatsecretRepository, FatsecretService>();
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(policy =>
   policy.AllowAnyHeader()
   .AllowAnyMethod()
   .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.MapControllers();

app.Run();
