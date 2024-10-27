namespace BreweryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly BreweryContext _context;

    public AnalyticsController(BreweryContext context)
    {
        _context = context;
    }

    // Top Beverages
    [HttpGet("top-beverages")]
    public async Task<IActionResult> GetTopBeverages()
    {
        var topBeverages = await _context.OrderItems
            .GroupBy(oi => oi.BeverageId)
            .OrderByDescending(g => g.Sum(oi => oi.Quantity))
            .Select(g => new { BeverageId = g.Key, TotalQuantity = g.Sum(oi => oi.Quantity) })
            .Take(5)
            .ToListAsync();

        return Ok(topBeverages);
    }

    // Total Sales
    [HttpGet("total-sales")]
    public async Task<IActionResult> GetTotalSales()
    {
        var totalSales = await _context.Orders.SumAsync(o => o.TotalAmount);
        return Ok(new { TotalSales = totalSales });
    }

    // Top Customers
    [HttpGet("top-customers")]
    public async Task<IActionResult> GetTopCustomers()
    {
        var topCustomers = await _context.Orders
            .GroupBy(o => o.CustomerId)
            .OrderByDescending(g => g.Sum(o => o.TotalAmount))
            .Select(g => new { CustomerId = g.Key, TotalSpent = g.Sum(o => o.TotalAmount) })
            .Take(5)
            .ToListAsync();

        return Ok(topCustomers);
    }

    // Monthly Revenue Trends
    [HttpGet("monthly-revenue")]
    public async Task<IActionResult> GetMonthlyRevenue()
    {
        var monthlyRevenue = await _context.Orders
            .Where(o => o.OrderDate.HasValue)
            .GroupBy(o => new { o.OrderDate!.Value.Year, o.OrderDate!.Value.Month })
            .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                Revenue = g.Sum(o => o.TotalAmount)
            })
            .ToListAsync();

        return Ok(monthlyRevenue);
    }

    // Sales by Product Size
    [HttpGet("sales-by-size")]
    public async Task<IActionResult> GetSalesBySize()
    {
        var salesBySize = await _context.OrderItems
            .GroupBy(oi => oi.Beverage.Size)
            .Select(g => new
            {
                Size = g.Key,
                TotalSales = g.Sum(oi => oi.Quantity * oi.Beverage.Price)
            })
            .ToListAsync();

        return Ok(salesBySize);
    }
}
