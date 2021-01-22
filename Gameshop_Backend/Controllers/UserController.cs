using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gameshop_Backend.Db;
using Gameshop_Backend.JWT;
using System.Security.Claims;

namespace Gameshop_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly MyDbContext context;
		private readonly IJwtAuthManager jwtAuthManager;

		public UserController(MyDbContext context, IJwtAuthManager jwtAuthManager)
		{
			this.context = context;
			this.jwtAuthManager = jwtAuthManager;
		}

		//api/user/login?email=admin@gameshop.com&password=1234
		[HttpGet("login")]
		public LoginResult Login(string email, string password)
		{
			var user = context.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
			if(user != null)
			{
				var claims = new[]
				{
					new Claim(ClaimTypes.Email, email)					
				};
				var jwtResult = jwtAuthManager.GenerateTokens(email, claims, DateTime.Now);
				var loginResult = new LoginResult
				{
					User = user,
					AccessToken = jwtResult.AccessToken,
					RefreshToken = jwtResult.RefreshToken.TokenString
				};
				return loginResult;
			}
			return null;
		}
		
	}

	public class LoginResult
	{
		public User User { get; set; }
		public string AccessToken { get; set; }
		public string RefreshToken { get; set; }
	}
}
