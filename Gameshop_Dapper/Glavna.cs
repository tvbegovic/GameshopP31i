using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Gameshop_Dapper
{
	public partial class Glavna : Form
	{
		public Glavna()
		{
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e)
		{

		}

		private void btnKatalog_Click(object sender, EventArgs e)
		{
			var igreForma = new IgreLista();
			igreForma.ShowDialog();
		}
	}
}
