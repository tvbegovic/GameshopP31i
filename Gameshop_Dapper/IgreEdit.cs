using Gameshop_Dapper.Db;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace Gameshop_Dapper
{
	public partial class IgreEdit : Form
	{
		public IgreEdit()
		{
			InitializeComponent();
		}

		public int Id { get; set; }
		public Game Igra { get; set; }

		private void IgreEdit_Load(object sender, EventArgs e)
		{
			SetupComboBoxes();
			if (Id > 0)
			{
				var igreCrud = new Igra_Crud();
				Igra = igreCrud.GetById(Id);
			}
			else
			{
				Igra = new Game();
			}
			txtId.DataBindings.Add(new Binding("Text", Igra, "Id"));
			txtNaziv.DataBindings.Add(new Binding("Text", Igra, "Title"));
			txtCijena.DataBindings.Add(new Binding("Text", Igra, "Price", true));
			txtDatumIzdavanja.DataBindings.Add(new Binding("Text", Igra, "ReleaseDate", true));
			cboDeveloper.DataBindings.Add(new Binding("SelectedValue", Igra, "IdDeveloper", true));
			cboIzdavac.DataBindings.Add(new Binding("SelectedValue", Igra, "IdPublisher", true));
			cboVrsta.DataBindings.Add(new Binding("SelectedValue", Igra, "IdGenre", true));
		}

		private void SetupComboBoxes()
		{
			var kompanijaCrud = new Kompanija_Crud();
			var vrstaCrud = new Vrsta_Crud();
			cboDeveloper.DataSource = kompanijaCrud.GetAll();
			cboDeveloper.DisplayMember = "Name";
			cboDeveloper.ValueMember = "Id";
			cboDeveloper.FormattingEnabled = true;
			cboIzdavac.DataSource = kompanijaCrud.GetAll();
			cboIzdavac.DisplayMember = "Name";
			cboIzdavac.ValueMember = "Id";
			cboIzdavac.FormattingEnabled = true;
			cboVrsta.DataSource = vrstaCrud.GetAll();
			cboVrsta.DisplayMember = "Name";
			cboVrsta.ValueMember = "Id";
			cboVrsta.FormattingEnabled = true;
		}

		private void toolStrip1_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
		{
			if(e.ClickedItem.Name == "tsbSpremi")
			{
				var igreCrud = new Igra_Crud();
				if(Igra.Id > 0)
				{
					igreCrud.Update(Igra);
				}
				else
				{
					Igra.Id = igreCrud.Insert(Igra);
				}
				DialogResult = DialogResult.OK;
			}
			else
			{
				DialogResult = DialogResult.Cancel;
			}
			Close();
		}
	}
}
