using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;


namespace Gameshop_AdoNet.Db
{
	public class Vrsta_Crud
	{
		public List<Genre> GetAll()
		{
			var rezultat = new List<Genre>();
			using(var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Open();
				var cmd = new SqlCommand("SELECT * FROM Genre", conn);
				var dr = cmd.ExecuteReader();
				while(dr.Read())
				{
					var vrsta = new Genre
					{
						Id = dr.GetInt32(0),
						Name = dr.GetString(1)
					};
					rezultat.Add(vrsta);
				}
				dr.Close();
			}
			return rezultat;
		}
	}
}
