var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//builder.Services.AddDbContext<BreweryContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Database connection string is not configured.");
}
builder.Services.AddDbContext<BreweryContext>(options => options.UseMySQL(connectionString));


builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<AnalyticsService>();

// JWT Configuration
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("JWT Key is not configured.");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
        ValidAudience = null,
        ValidIssuer = null,
        ValidateLifetime = false
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