namespace BreweryAPI.Models.Dto;

public class TopBeverageDto
{
    public required string BeverageId { get; set; }
    public int TotalQuantity { get; set; }
}

public class TopCustomerDto
{
    public required string CustomerId { get; set; }
    public decimal TotalSpent { get; set; }
}

public class MonthlyRevenueDto
{
    public int Year { get; set; }
    public int Month { get; set; }
    public decimal Revenue { get; set; }
}

public class SalesBySizeDto
{
    public SizeEnum Size { get; set; }
    public decimal TotalSales { get; set; }
}
