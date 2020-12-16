using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gameshop_EFCore.Db
{
	public class MyDbContext : DbContext
	{
		public DbSet<Genre> Genres { get; set; }
		public DbSet<Company> Companies { get; set; }
		public DbSet<Game> Games { get; set; }

		public MyDbContext(DbContextOptions options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Genre>().ToTable("Genre");
			modelBuilder.Entity<Company>().ToTable("Company");
			modelBuilder.Entity<Game>().ToTable("Game");			
			base.OnModelCreating(modelBuilder);
		}
	}
}
