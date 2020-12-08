using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using Dapper;
using System.Linq;

namespace Gameshop_Dapper.Db
{
	public class Kompanija_Crud
	{
		public List<Company> GetAll()
		{
			using(var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				return conn.Query<Company>("SELECT * FROM Company").ToList();
			}			
		}
	}
}
