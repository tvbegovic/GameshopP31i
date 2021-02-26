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
	public class CompanyController : ControllerBase
	{
		private readonly MyDbContext context;

		public CompanyController(MyDbContext context)
		{
			this.context = context;
		}

		[HttpGet("")]
		public List<Company> GetAll()
		{
			return context.Companies.ToList();
		}
	}
}
