using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Gameshop_EFCore.Db;

namespace Gameshop_EFCore 
{
	public partial class Glavna : Form
	{
		private readonly MyDbContext context;

		public Glavna(MyDbContext context)
		{
			InitializeComponent();
			this.context = context;
		}

		private void Form1_Load(object sender, EventArgs e)
		{

		}

		private void btnKatalog_Click(object sender, EventArgs e)
		{
			var igreForma = new IgreLista(context);
			igreForma.ShowDialog();
		}
	}
}
