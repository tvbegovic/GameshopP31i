using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gameshop.Db;
using Microsoft.EntityFrameworkCore;

namespace Gameshop.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly MyDbContext context;

		public OrderController(MyDbContext context)
		{
			this.context = context;
		}

		[HttpPost("")]
		public IActionResult Create(Order order)
		{
			context.Orders.Add(order);
			context.SaveChanges();
			return Ok(order);
		}

	}
}
