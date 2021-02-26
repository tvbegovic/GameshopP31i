using Gameshop.Db;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gameshop
{
	public class HomeModel
	{
		public List<Genre> Genres { get; set; }
		public List<Company> Companies { get; set; }
	}

	public class GameListModel
	{
		public List<Genre> Genres { get; set; }
		public List<Company> Companies { get; set; }
		public List<Game> Games { get; set; }
	}

	public class GameEditModel
	{
		public List<Genre> Genres { get; set; }
		public List<Company> Companies { get; set; }
		public Game Game { get; set; }
	}
}
