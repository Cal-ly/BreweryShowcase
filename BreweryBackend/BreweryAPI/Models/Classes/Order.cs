namespace BreweryAPI.Models.Classes;

public class Order
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTime? OrderDate { get; set; } = DateTime.Now;
    public StatusEnum? Status { get; set; }
    public decimal TotalAmount { get; private set; }

    public string? CustomerId { get; set; }
    public Customer? Customer { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public void CalculateTotalAmount()
    {
        TotalAmount = OrderItems.Sum(item => item.Beverage.Price * item.Quantity);
    }

    public void Validate()
    {
        CalculateTotalAmount();
        if (TotalAmount < 0) throw new ArgumentException("TotalAmount must be positive.");
    }

    public override string ToString() => $"{OrderDate} - {Status} - {TotalAmount}";
    public override bool Equals(object? obj) => obj is Order other && Id == other.Id;
    public override int GetHashCode() => Id.GetHashCode();
}