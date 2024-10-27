namespace BreweryAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly BreweryContext _context;
    private readonly TokenService _tokenService;

    public UsersController(BreweryContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    // Create User (Admin only)
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserRegisterDto registerDto)
    {
        var user = new User
        {
            Email = registerDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
            Role = UserRoleEnum.Customer  // Or allow admins to set roles in registerDto
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    // Get User by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        return Ok(user);
    }

    // Update User (password or role)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] UserUpdateDto updateDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        if (!string.IsNullOrEmpty(updateDto.Password))
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateDto.Password);

        if (updateDto.Role.HasValue)
            user.Role = updateDto.Role.Value;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // Delete User
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

