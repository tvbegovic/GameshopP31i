using Gameshop.Db;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gameshop.JWT;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace Gameshop.Controllers
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

		[HttpGet("login")]
		public IActionResult Login(string email, string password)
		{
			var user = context.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
			if(user == null)
			{
				return BadRequest("Invalid email or password");
			}
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
			return Ok(loginResult);
		}

		[HttpPost("logout")]
		public void Logout()
		{
			jwtAuthManager.RemoveRefreshTokenByUserName(User.Identity.Name);
		}

		[HttpPost("refreshtoken")]
		[Authorize]
		public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
		{
			try
			{
				var email = User.Identity.Name;
				
				if (string.IsNullOrWhiteSpace(request.RefreshToken))
				{
					return Unauthorized();
				}

				var user = context.Users.FirstOrDefault(u => u.Email == email);

				var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
				var jwtResult = jwtAuthManager.Refresh(request.RefreshToken, accessToken, DateTime.Now);				
				return Ok(new LoginResult
				{
					User = user,					
					AccessToken = jwtResult.AccessToken,
					RefreshToken = jwtResult.RefreshToken.TokenString
				});
			}
			catch (SecurityTokenException e)
			{
				return Unauthorized(e.Message); // return 401 so that the client side can redirect the user to login page
			}
		}
	}

	public class LoginResult
	{
		public User User { get; set; }
		public string AccessToken { get; set; }
		public string RefreshToken { get; set; }
	}
}
