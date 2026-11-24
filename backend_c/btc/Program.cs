using btc;
using DotNetEnv;
Env.Load();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSingleton(_ =>
{
    var options = new Supabase.SupabaseOptions
    {
        Schema = "mmust_homes"
    };
    Console.WriteLine(Environment.GetEnvironmentVariable("URL"));
    string URL = Environment.GetEnvironmentVariable("URL")??"";
    var client = new Supabase.Client(URL, Environment.GetEnvironmentVariable("KEY"),options);
    client.InitializeAsync().GetAwaiter().GetResult();
    return client;
});

builder.Services.AddScoped<IHomesInterface,HomesService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
