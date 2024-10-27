namespace BreweryAPI.Models.Classes;

public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public UserRoleEnum Role { get; set; }

    public string? CustomerId { get; set; }
    public Customer? Customer { get; set; }

    public void Validate()
    {
        if (string.IsNullOrEmpty(Email)) throw new ArgumentException("Email is required.");
        if (string.IsNullOrEmpty(PasswordHash)) throw new ArgumentException("PasswordHash is required.");
    }

    public override string ToString() => $"{Email} - {Role}";
    public override bool Equals(object? obj) => obj is User other && Id == other.Id;
    public override int GetHashCode() => Id.GetHashCode();
}