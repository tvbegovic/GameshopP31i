using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gameshop_Backend.Db;

namespace Gameshop_Backend.Models
{
	public class GameListModel
	{
		public List<Game> Games { get; set; }
		public List<Genre> Genres { get; set; }
		public List<Company> Companies { get; set; }
	}
}
