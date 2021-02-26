using Gameshop.Db;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gameshop.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GenreController : ControllerBase
	{
		private readonly MyDbContext context;

		public GenreController(MyDbContext context)
		{
			this.context = context;
		}

		[HttpGet("")]
		public List<Genre> GetAll()
		{
			return context.Genres.ToList();
		}
	}
}
