namespace BreweryAPI.Models.Classes;

public class Beverage
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public SizeEnum Size { get; set; }

    public void Validate()
    {
        if (string.IsNullOrEmpty(Name)) throw new ArgumentException("Name is required.");
        if (Price <= 0) throw new ArgumentException("Price must be greater than zero.");
    }

    public override string ToString() => $"{Name} - {Size} - {Price}";
    public override bool Equals(object? obj) => obj is Beverage other && Id == other.Id;
    public override int GetHashCode() => Id.GetHashCode();
}