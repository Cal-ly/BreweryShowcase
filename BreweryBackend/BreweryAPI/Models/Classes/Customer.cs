namespace BreweryAPI.Models.Classes;

public class Customer
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string Email { get; set; }

    public string? UserId { get; set; }
    public User? User { get; set; }

    public ICollection<Order> Orders { get; set; } = new List<Order>();

    public void Validate()
    {
        if (string.IsNullOrEmpty(Name)) throw new ArgumentException("Name is required.");
        if (string.IsNullOrEmpty(Email)) throw new ArgumentException("Email is required.");
    }

    public override string ToString() => $"{Name} - {Email}";
    public override bool Equals(object? obj) => obj is Customer other && Id == other.Id;
    public override int GetHashCode() => Id.GetHashCode();
}