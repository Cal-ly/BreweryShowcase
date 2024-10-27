namespace BreweryAPI.Data;

public class DataSeeder
{
    private readonly BreweryContext _context;

    public DataSeeder(BreweryContext context)
    {
        _context = context;
    }

    public void SeedData()
    {
        if (!_context.Customers.Any())
        {
            var customers = new List<Customer>
            {
                new Customer { Name = "Soren Sorensen", Email = "sorensorensen@test.dk" },
                new Customer { Name = "Jorn Jorgensen", Email = "jornjorgensen@test.dk" },
                new Customer { Name = "Hans Hansen", Email = "hanshansen@test.dk" },
                new Customer { Name = "Lars Larsen", Email = "larslarsen@test.dk" },
                new Customer { Name = "Peter Petersen", Email = "peterpetersen@test.dk" },
                new Customer { Name = "Ole Olsen", Email = "oleolsen@test.dk" },
                new Customer { Name = "Karl Karlsen", Email = "karlkarlsen@test.dk" },
                new Customer { Name = "Morten Mortensen", Email = "mortenmortensen@test.dk" },
                new Customer { Name = "Frederik Frederiksen", Email = "frederikfrederiksen@test.dk" },
                new Customer { Name = "Niels Nielsen", Email = "nielsnielsen@test.dk" },
                new Customer { Name = "Anders Andersen", Email = "andersandersen@test.dk" },
                new Customer { Name = "Poul Poulsen", Email = "poulpoulsen@test.dk" },
                new Customer { Name = "Jens Jensen", Email = "jensjensen@test.dk" },
                new Customer { Name = "Erik Eriksen", Email = "erikeriksen@test.dk" },
                new Customer { Name = "Mads Madsen", Email = "madsmadsen@test.dk" },
                new Customer { Name = "Kristian Kristiansen", Email = "kristiankristiansen@test.dk" },
                new Customer { Name = "Michael Michaelsen", Email = "michaelmichaelsen@test.dk" },
                new Customer { Name = "Henrik Henriksen", Email = "henrikhenriksen@test.dk" },
                new Customer { Name = "Thomas Thomassen", Email = "thomasthomassen@test.dk" },
                new Customer { Name = "Martin Martinsen", Email = "martinmartinsen@test.dk" },
            };
            _context.Customers.AddRange(customers);
            _context.SaveChanges();

            var users = customers.Select(c => new User
            {
                Email = c.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                CustomerId = c.Id,
                Customer = c
            }).ToList();

            _context.Users.AddRange(users);
            _context.SaveChanges();

            // Update customers with UserId and User reference
            foreach (var customer in customers)
            {
                var user = users.FirstOrDefault(u => u.CustomerId == customer.Id);
                if (user != null)
                {
                    customer.UserId = user.Id;
                    customer.User = user;
                }
            }
            _context.Customers.UpdateRange(customers);
            _context.SaveChanges();

        }

        if (!_context.Beverages.Any())
        {
            var beverages = new List<Beverage>
            {
                new Beverage { Name = "Faxe Kondi", Description = "Refreshing lemon-lime soda", Price = 15.99m, Size = SizeEnum.MediumCan },
                new Beverage { Name = "Ceres Top", Description = "Classic Danish pilsner beer", Price = 20.50m, Size = SizeEnum.MediumBottle },
                new Beverage { Name = "Royal Pilsner", Description = "Light and crisp pilsner beer", Price = 18.00m, Size = SizeEnum.MediumBottle },
                new Beverage { Name = "Royal Export", Description = "Strong lager with a rich taste", Price = 19.50m, Size = SizeEnum.LargeBottle },
                new Beverage { Name = "Royal Classic", Description = "Smooth, amber lager", Price = 17.50m, Size = SizeEnum.MediumBottle },
                new Beverage { Name = "Royal Organic", Description = "Organic pilsner with a mild taste", Price = 22.00m, Size = SizeEnum.SmallBottle },
                new Beverage { Name = "Faxe Kondi Booster", Description = "Energy drink with a lemon-lime flavor", Price = 12.99m, Size = SizeEnum.SmallCan },
                new Beverage { Name = "Egekilde Citrus", Description = "Sparkling water with a hint of citrus", Price = 10.00m, Size = SizeEnum.SmallBottle },
                new Beverage { Name = "Egekilde Elderflower", Description = "Sparkling water with elderflower taste", Price = 10.00m, Size = SizeEnum.SmallBottle },
                new Beverage { Name = "Albani Odense Classic", Description = "Full-bodied dark lager", Price = 18.50m, Size = SizeEnum.MediumBottle },
                new Beverage { Name = "Albani Giraf Beer", Description = "Strong beer with a distinct flavor", Price = 24.00m, Size = SizeEnum.XLargeBottle },
                new Beverage { Name = "Albani Mosaic IPA", Description = "Hoppy IPA with tropical notes", Price = 25.00m, Size = SizeEnum.MediumBottle },
                new Beverage { Name = "Faxe Kondi Free", Description = "Sugar-free version of the classic soda", Price = 15.99m, Size = SizeEnum.SmallCan },
                new Beverage { Name = "Pepsi Max", Description = "Sugar-free cola", Price = 16.50m, Size = SizeEnum.MediumCan },
                new Beverage { Name = "Royal Beer", Description = "Rich, full-bodied lager", Price = 18.99m, Size = SizeEnum.LargeBottle }
            };
            _context.Beverages.AddRange(beverages);
            _context.SaveChanges();
        }

        if (!_context.Orders.Any())
        {
            var random = new Random();
            var oneYearAgo = DateTime.Now.AddYears(-1);
            var statuses = Enum.GetValues(typeof(StatusEnum));

            var orders = new List<Order>();

            for (int i = 0; i < 100; i++)
            {
                var customer = _context.Customers
                    .AsEnumerable()
                    .OrderBy(c => random.Next())
                    .First();

                var orderDate = oneYearAgo.AddDays(random.Next(0, 365));
                var status = random.NextDouble() < 0.95 ? StatusEnum.Completed : (StatusEnum)(statuses.GetValue(random.Next(0, 4)) ?? StatusEnum.Pending);

                var order = new Order
                {
                    CustomerId = customer.Id,
                    Customer = customer,
                    OrderDate = orderDate,
                    Status = status,
                    OrderItems = new List<OrderItem>()
                };

                int numOrderItems = random.Next(1, 11);

                for (int j = 0; j < numOrderItems; j++)
                {
                    var beverage = _context.Beverages
                        .AsEnumerable()
                        .OrderBy(b => random.Next())
                        .First();

                    var quantity = random.Next(1, 21);

                    var orderItem = new OrderItem
                    {
                        OrderId = order.Id,
                        BeverageId = beverage.Id,
                        Beverage = beverage,
                        Quantity = quantity,
                        Order = order // Set the required Order property
                    };

                    order.OrderItems.Add(orderItem);
                }

                // Calculate the total amount for the order using the existing method
                order.CalculateTotalAmount();
                orders.Add(order);
            }

            _context.Orders.AddRange(orders);
            _context.SaveChanges();
        }
    }
}
