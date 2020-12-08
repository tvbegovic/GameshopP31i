using Gameshop_EFCore.Db;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.Linq;

namespace Gameshop_EFCore
{
	public partial class IgreEdit : Form
	{

		//TODO: Ubaci context u constructor
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
				//TODO: Učitaj zapis iz baze s tim id-om				
			}
			else
			{
				Igra = new Game();
			}
			bindingSource.DataSource = Igra;
			txtId.DataBindings.Add(new Binding("Text", bindingSource, "Id"));
			txtNaziv.DataBindings.Add(new Binding("Text", bindingSource, "Title"));
			txtCijena.DataBindings.Add(new Binding("Text", bindingSource, "Price", true));
			txtDatumIzdavanja.DataBindings.Add(new Binding("Text", bindingSource, "ReleaseDate", true));
			cboDeveloper.DataBindings.Add(new Binding("SelectedValue", bindingSource, "IdDeveloper", true));
			cboIzdavac.DataBindings.Add(new Binding("SelectedValue", bindingSource, "IdPublisher", true));
			cboVrsta.DataBindings.Add(new Binding("SelectedValue", bindingSource, "IdGenre", true));
		}

		private void SetupComboBoxes()
		{
			//TODO: Učitaj kompanije
			
			cboDeveloper.DisplayMember = "Name";
			cboDeveloper.ValueMember = "Id";
			cboDeveloper.FormattingEnabled = true;
			//TODO: Učitaj kompanije

			cboIzdavac.DisplayMember = "Name";
			cboIzdavac.ValueMember = "Id";
			cboIzdavac.FormattingEnabled = true;
			//Učitaj žanrove
			
			cboVrsta.DisplayMember = "Name";
			cboVrsta.ValueMember = "Id";
			cboVrsta.FormattingEnabled = true;
		}

		private void toolStrip1_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
		{
			bindingSource.EndEdit();
			if(e.ClickedItem.Name == "tsbSpremi")
			{
				if(Igra.Id > 0)
				{
					//TODO: Attach
				}
				else
				{
					//TODO: Add
				}
				//TODO: save changes
				
				Id = Igra.Id;
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
