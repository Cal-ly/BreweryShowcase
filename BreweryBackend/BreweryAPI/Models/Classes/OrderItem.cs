namespace BreweryAPI.Models.Classes;

public class OrderItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string BeverageId { get; set; }
    public required Beverage Beverage { get; set; }
    public int Quantity { get; set; }
    public required string OrderId { get; set; }
    public required Order Order { get; set; }

    public void Validate()
    {
        if (Quantity < 0) throw new ArgumentException("Quantity must be positive.");
    }

    public override string ToString() => $"{Quantity} x {Beverage.Name} at {Beverage.Price} each";
    public override bool Equals(object? obj) => obj is OrderItem other && Id == other.Id;
    public override int GetHashCode() => Id.GetHashCode();
}