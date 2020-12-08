using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using Dapper;

namespace Gameshop_Dapper.Db
{
	public class Vrsta_Crud
	{
		public List<Genre> GetAll()
		{
			
			using(var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Open();
				return conn.Query<Genre>("SELECT * FROM Genre").ToList();				
			}			
		}
	}
}
