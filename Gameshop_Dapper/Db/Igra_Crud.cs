using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper;
using System.Linq;

namespace Gameshop_Dapper.Db
{
	public class Igra_Crud
	{
		public List<Game> GetAll()
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				return conn.Query<Game>(@"SELECT * FROM Game").ToList();
			}
			
		}

		public Game GetById(int id)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				return conn.QueryFirstOrDefault<Game>("SELECT * FROM Game WHERE id = @id", new { id });				
			}

		}

		public int Insert(Game igra)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				return conn.Execute(@"INSERT INTO [dbo].[Game]
							   ([title],[idGenre],[idPublisher],[price],[idDeveloper],[releaseDate]) OUTPUT INSERTED.id
								VALUES (@title,@idGenre,@idPublisher,@price,@idDeveloper,@releaseDate)", igra);				
			}
		}

		public int Update(Game igra)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				return conn.Execute(@"UPDATE [dbo].[Game]
							   SET [title] = @title ,[idGenre]= @idGenre ,[idPublisher] = @idPublisher
								  ,[price] = @price ,[idDeveloper] = @idDeveloper,[releaseDate] = @releaseDate
							 WHERE id = @id", igra);				
			}
		}

		public void Delete(int id)
		{
			using (var conn = new SqlConnection(Properties.Settings.Default.connString))
			{
				conn.Execute("DELETE FROM Game WHERE id = @id", new { id });				
			}
		}
	}
	
}
