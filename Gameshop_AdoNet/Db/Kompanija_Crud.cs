using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;


namespace Gameshop_AdoNet.Db
{
	public class Kompanija_Crud
	{
		public List<Company> GetAll()
		{
			var rezultat = new List<Company>();
			using(var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Open();
				var cmd = new SqlCommand("SELECT * FROM Company", conn);
				var dr = cmd.ExecuteReader();
				while(dr.Read())
				{
					var kompanija = new Company
					{
						Id = dr.GetInt32(0),
						Name = dr.GetString(1)
					};
					rezultat.Add(kompanija);
				}
				dr.Close();
			}
			return rezultat;
		}
	}
}
