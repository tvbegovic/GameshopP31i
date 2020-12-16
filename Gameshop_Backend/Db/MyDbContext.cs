﻿using System;
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


	}
}