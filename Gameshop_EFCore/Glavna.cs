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

		//TODO: Ubaci context u constructor
		public Glavna()
		{
			InitializeComponent();			
		}

		private void Form1_Load(object sender, EventArgs e)
		{

		}

		private void btnKatalog_Click(object sender, EventArgs e)
		{
			//TODO: Pošalji context formi lista
			var igreForma = new IgreLista();
			igreForma.ShowDialog();
		}
	}
}
