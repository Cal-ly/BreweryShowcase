namespace BreweryAPI.Services;

public class AnalyticsService
{
    private readonly BreweryContext _context;

    public AnalyticsService(BreweryContext context)
    {
        _context = context;
    }

    public async Task<List<TopBeverageDto>> GetTopBeverages()
    {
        return await _context.OrderItems
            .GroupBy(oi => oi.BeverageId)
            .OrderByDescending(g => g.Sum(oi => oi.Quantity))
            .Select(g => new TopBeverageDto { BeverageId = g.Key, TotalQuantity = g.Sum(oi => oi.Quantity) })
            .Take(5)
            .ToListAsync();
    }

    public async Task<decimal> GetTotalSales()
    {
        return await _context.Orders.SumAsync(o => o.TotalAmount);
    }

    public async Task<List<TopCustomerDto>> GetTopCustomers()
    {
        return await _context.Orders
            .GroupBy(o => o.CustomerId)
            .OrderByDescending(g => g.Sum(o => o.TotalAmount))
.Select(g => new TopCustomerDto { CustomerId = g.Key ?? string.Empty, TotalSpent = g.Sum(o => o.TotalAmount) })
            .Take(5)
            .ToListAsync();
    }

    public async Task<List<MonthlyRevenueDto>> GetMonthlyRevenue()
    {
        return await _context.Orders
            .Where(o => o.OrderDate.HasValue)
            .GroupBy(o => new { o.OrderDate!.Value.Year, o.OrderDate!.Value.Month })
            .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
            .Select(g => new MonthlyRevenueDto
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                Revenue = g.Sum(o => o.TotalAmount)
            })
            .ToListAsync();
    }

    public async Task<List<SalesBySizeDto>> GetSalesBySize()
    {
        return await _context.OrderItems
            .GroupBy(oi => oi.Beverage.Size)
            .Select(g => new SalesBySizeDto
            {
                Size = g.Key,
                TotalSales = g.Sum(oi => oi.Quantity * oi.Beverage.Price)
            })
            .ToListAsync();
    }
}
