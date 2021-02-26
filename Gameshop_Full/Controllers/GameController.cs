using Gameshop.Db;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace Gameshop.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class GameController : ControllerBase
	{
		private readonly MyDbContext context;
		private readonly ILogger<GameController> _logger;
		private readonly IWebHostEnvironment hostEnvironment;		
		private readonly IConfiguration configuration;

		public GameController(MyDbContext context, ILogger<GameController> logger, IWebHostEnvironment hostEnvironment,
			IConfiguration configuration)
		{
			this.context = context;
			_logger = logger;
			this.hostEnvironment = hostEnvironment;
			
			this.configuration = configuration;
		}

		[HttpGet("bygenre/{id:int}")]
		public List<Game> GetByGenre(int id)
		{
			return context.Games.Where(g => g.IdGenre == id).ToList();
		}

		[HttpGet("bycompany/{id:int}")]
		public List<Game> GetByCompany(int id)
		{
			return context.Games.Where(g => g.IdDeveloper == id || g.IdPublisher == id).ToList();
		}

		[HttpGet("search/{text}")]
		public List<Game> Search(string text)
		{
			var lText = text.ToLower();
			return context.Games.Include(g => g.Publisher).Include(g => g.Developer).Include(g => g.Genre).
				Where(g => g.Title.ToLower().Contains(lText) || g.Publisher.Name.ToLower().Contains(lText)
				|| g.Developer.Name.ToLower().Contains(lText) || g.Genre.Name.ToLower().Contains(lText)).ToList();
		}

		[HttpGet("homeModel")]
		public HomeModel GetHomeModel()
		{
			return new HomeModel
			{
				Genres = context.Genres.ToList(),
				Companies = context.Companies.ToList()
			};
		}

		[HttpGet("genres")]
		public List<Genre> GetGenres()
		{
			return context.Genres.ToList();
		}

		[HttpGet("companies")]
		public List<Company> GetCompanies()
		{
			return context.Companies.ToList();
		}

		[HttpGet("getById/{id}")]
		public Game GetById(int id)
		{
			return context.Games.FirstOrDefault(g => g.Id == id);
		}

		[HttpGet("listModel")]
		[Authorize]
		public GameListModel GetListModel()
		{
			return new GameListModel
			{
				Companies = context.Companies.ToList(),
				Games = context.Games.Include(g => g.Developer).Include(g => g.Publisher).Include(g => g.Genre).ToList(),
				Genres = context.Genres.ToList()
			};
		}

		[HttpPost("")]
		[Authorize]
		public Game Create(Game game)
		{
			HandleFile(game);
			context.Games.Add(game);
			context.SaveChanges();
			return game;
		}

		[HttpPut("")]
		[Authorize]
		public Game Update(Game game)
		{
			HandleFile(game);
			context.Games.Update(game);
			context.SaveChanges();
			return game;
		}

		[HttpDelete("{id}")]
		[Authorize]
		public void Delete(int id)
		{
			context.Database.ExecuteSqlInterpolated($"DELETE FROM Game WHERE id = {id}");
		}

		[HttpGet("editModel/{id}")]
		[Authorize]
		public GameEditModel GetEditModel(int id)
		{
			return new GameEditModel
			{
				Companies = context.Companies.ToList(),
				Game = id > 0 ? context.Games.FirstOrDefault(g => g.Id == id) : new Game(),
				Genres = context.Genres.ToList()
			};
		}

		[HttpPost("uploadImage")]
		[Authorize]
		public void UploadImage(string id)
		{
			var file = Request.Form.Files[0];
			var fileStorageMode = configuration.GetValue<string>("uploadFilesMode"); //folder or cache
			if (file.Length > 0)
			{
				if(fileStorageMode == "folder")
				{
					var filePath = Path.Combine(hostEnvironment.WebRootPath, "assets\\tmpImages", $"{id}.jpg");
					var sw = new StreamWriter(filePath);
					file.CopyTo(sw.BaseStream);
					sw.Close();
				}								
			}
		}

		private void HandleFile(Game game) 
		{
			if (!string.IsNullOrEmpty(game.FileId))
			{
				var fileStorageMode = configuration.GetValue<string>("uploadFilesMode"); //folder or cache
				if(fileStorageMode == "folder")
				{
					var tmpFilePath = Path.Combine(hostEnvironment.WebRootPath, "assets\\tmpImages", $"{game.FileId}.jpg");
					if (System.IO.File.Exists(tmpFilePath))
					{
						var finalFilePath = Path.Combine(hostEnvironment.WebRootPath, "assets\\gameImages", $"{game.FileId}.jpg");
						System.IO.File.Copy(tmpFilePath, finalFilePath);
						game.Image = $"{game.FileId}.jpg";
						System.IO.File.Delete(tmpFilePath);
					}
				}
			}
		}
	}
}
