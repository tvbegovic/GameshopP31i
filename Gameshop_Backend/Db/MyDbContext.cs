using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Gameshop_Backend.Db
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

			modelBuilder.Entity<Game>().HasOne(g => g.Genre).WithMany().HasForeignKey(g => g.IdGenre);
			modelBuilder.Entity<Game>().HasOne(g => g.Developer).WithMany().HasForeignKey(g => g.IdDeveloper);
			modelBuilder.Entity<Game>().HasOne(g => g.Publisher).WithMany().HasForeignKey(g => g.IdPublisher);
		}


	}
}
