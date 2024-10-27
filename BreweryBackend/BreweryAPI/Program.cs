var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = "server=localhost:3306;database=brewerydb;user=root;password=mypassword;";
builder.Services.AddDbContext<BreweryContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(ServerVersion.AutoDetect(connectionString))));


builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
