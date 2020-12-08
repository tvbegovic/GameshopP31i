using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Gameshop_AdoNet.Db
{
	public class Igra_Crud
	{
		public List<Game> GetAll()
		{
			var rezultat = new List<Game>();
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Open();
				var cmd = new SqlCommand("SELECT * FROM Game", conn);
				var dr = cmd.ExecuteReader();
				while (dr.Read())
				{
					var igra = new Game
					{
						Id = (int) dr["id"],
						Title = (string) dr["title"],
						IdGenre = (int?)dr["idGenre"],
						IdPublisher = (int?)dr["idPublisher"],
						Price = (decimal?)dr["price"],
						IdDeveloper = (int?)dr["idDeveloper"],
						ReleaseDate = (DateTime?)dr["releaseDate"]
					};
					rezultat.Add(igra);
				}
				dr.Close();
			}
			return rezultat;
		}

		public Game GetById(int id)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				Game rezultat = null;
				conn.Open();
				var cmd = new SqlCommand("SELECT * FROM Game WHERE id = @id", conn);
				cmd.Parameters.AddWithValue("@id", id);
				var dr = cmd.ExecuteReader();
				if (dr.Read())
				{
					rezultat = new Game
					{
						Id = (int)dr["id"],
						Title = (string)dr["title"],
						IdGenre = (int?)dr["idGenre"],
						IdPublisher = (int?)dr["idPublisher"],
						Price = (decimal?)dr["price"],
						IdDeveloper = (int?)dr["idDeveloper"],
						ReleaseDate = (DateTime?)dr["releaseDate"]
					};
				}
				dr.Close();
				return rezultat;
			}

		}

		public int Insert(Game igra)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Open();
				var cmd = new SqlCommand(@"INSERT INTO [dbo].[Game]
							   ([title],[idGenre],[idPublisher],[price],[idDeveloper],[releaseDate]) OUTPUT INSERTED.id
								VALUES (@title,@idGenre,@idPublisher,@price,@idDeveloper,@releaseDate)", conn);
				cmd.Parameters.AddWithValue("@title", igra.Title);
				cmd.Parameters.AddWithValue("@idGenre", igra.IdGenre);
				cmd.Parameters.AddWithValue("@idPublisher", igra.IdPublisher);
				cmd.Parameters.AddWithValue("@price", igra.Price);
				cmd.Parameters.AddWithValue("@idDeveloper", igra.IdDeveloper);
				cmd.Parameters.AddWithValue("@releaseDate", igra.ReleaseDate);
				var id = cmd.ExecuteScalar();
				return Convert.ToInt32(id);
			}
		}

		public int Update(Game igra)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Open();
				var cmd = new SqlCommand(@"UPDATE [dbo].[Game]
							   SET [title] = @title ,[idGenre]= @idGenre ,[idPublisher] = @idPublisher
								  ,[price] = @price ,[idDeveloper] = @idDeveloper,[releaseDate] = @releaseDate
							 WHERE id = @id", conn);
				cmd.Parameters.AddWithValue("@id", igra.Id);
				cmd.Parameters.AddWithValue("@title", igra.Title);
				cmd.Parameters.AddWithValue("@idGenre", igra.IdGenre);
				cmd.Parameters.AddWithValue("@idPublisher", igra.IdPublisher);
				cmd.Parameters.AddWithValue("@price", igra.Price);
				cmd.Parameters.AddWithValue("@idDeveloper", igra.IdDeveloper);
				cmd.Parameters.AddWithValue("@releaseDate", igra.ReleaseDate);
				return cmd.ExecuteNonQuery();				
			}
		}

		public void Delete(int id)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Open();
				var cmd = new SqlCommand("DELETE FROM Game WHERE id = @id", conn);
				cmd.Parameters.AddWithValue("@id", id);
				cmd.ExecuteNonQuery();
			}
		}
	}
	
}
