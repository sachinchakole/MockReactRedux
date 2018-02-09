using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MockReactRedux.Models;

namespace MockReactRedux.Infrastructure
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        //public DbSet<Album> Albums { get; set; }
        //public DbSet<Artist> Artists { get; set; }
        //public DbSet<Genre> Genres { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Configure pluralization
            //builder.Entity<Album>().ToTable("Albums");
            //builder.Entity<Artist>().ToTable("Artists");
            //builder.Entity<Order>().ToTable("Orders");
            //builder.Entity<Product>().ToTable("Products");
            //builder.Entity<CartItem>().ToTable("CartItems");
            //builder.Entity<OrderDetail>().ToTable("OrderDetails");

            base.OnModelCreating(builder);
        }
    }
}
