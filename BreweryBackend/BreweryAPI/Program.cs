var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = "DefaultConnection";
builder.Services.AddDbContext<BreweryContext>(options =>
    options.UseMySQL(connectionString));

builder.Services.AddScoped<TokenService>();

// JWT Configuration
var jwtKey = builder.Configuration["Jwt:Key"];
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// Seed data if the database is empty
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<BreweryContext>();

    if (!context.Customers.Any() && !context.Beverages.Any() && !context.Orders.Any())
    {
        var seeder = new DataSeeder(context);
        seeder.SeedData();
    }
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();