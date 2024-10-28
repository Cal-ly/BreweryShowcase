namespace BreweryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly AnalyticsService _analyticService;

    public AnalyticsController(AnalyticsService analyticService)
    {
        _analyticService = analyticService;
    }

    // Top Beverages
    [HttpGet("top-beverages")]
    public async Task<IActionResult> GetTopBeverages()
    {
        var topBeverages = await _analyticService.GetTopBeverages();
        return Ok(topBeverages);
    }

    // Total Sales
    [HttpGet("total-sales")]
    public async Task<IActionResult> GetTotalSales()
    {
        var totalSales = await _analyticService.GetTotalSales();
        return Ok(new { TotalSales = totalSales });
    }

    // Top Customers
    [HttpGet("top-customers")]
    public async Task<IActionResult> GetTopCustomers()
    {
        var topCustomers = await _analyticService.GetTopCustomers();
        return Ok(topCustomers);
    }

    // Monthly Revenue Trends
    [HttpGet("monthly-revenue")]
    public async Task<IActionResult> GetMonthlyRevenue()
    {
        var monthlyRevenue = await _analyticService.GetMonthlyRevenue();
        return Ok(monthlyRevenue);
    }

    // Sales by Product Size
    [HttpGet("sales-by-size")]
    public async Task<IActionResult> GetSalesBySize()
    {
        var salesBySize = await _analyticService.GetSalesBySize();
        return Ok(salesBySize);
    }
}
