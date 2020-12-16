using Gameshop_EFCore.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Gameshop_EFCore
{
	static class Program
	{
		/// <summary>
		///  The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main()
		{
			var builder = new HostBuilder()
			  .ConfigureServices((hostContext, services) =>
			  {
				  services.AddDbContext<MyDbContext>(options =>
				  {
					  options.UseSqlServer(Properties.Settings.Default.connString);
				  });
				  services.AddSingleton<Glavna>();
			  });

			var host = builder.Build();

			using(var serviceScope = host.Services.CreateScope())
			{
				var services = serviceScope.ServiceProvider;
				Application.SetHighDpiMode(HighDpiMode.SystemAware);
				Application.EnableVisualStyles();
				Application.SetCompatibleTextRenderingDefault(false);
				var glavna = services.GetRequiredService<Glavna>();				
				Application.Run(glavna);
			}
			
		}
	}
}
