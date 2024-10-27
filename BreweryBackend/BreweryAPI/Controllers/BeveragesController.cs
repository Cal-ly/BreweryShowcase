namespace BreweryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BeveragesController : ControllerBase
{
    private readonly BreweryContext _context;

    public BeveragesController(BreweryContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBeverages()
    {
        var beverages = await _context.Beverages.ToListAsync();
        return Ok(beverages);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBeverage(string id)
    {
        var beverage = await _context.Beverages.FindAsync(id);
        if (beverage == null) return NotFound();

        return Ok(beverage);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBeverage([FromBody] Beverage beverage)
    {
        _context.Beverages.Add(beverage);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBeverage), new { id = beverage.Id }, beverage);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBeverage(string id, [FromBody] Beverage updatedBeverage)
    {
        if (id != updatedBeverage.Id) return BadRequest();

        _context.Entry(updatedBeverage).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBeverage(string id)
    {
        var beverage = await _context.Beverages.FindAsync(id);
        if (beverage == null) return NotFound();

        _context.Beverages.Remove(beverage);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

