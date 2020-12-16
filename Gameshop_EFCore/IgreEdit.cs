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
		private readonly MyDbContext context;

		public IgreEdit(MyDbContext context)
		{
			InitializeComponent();			
			this.context = context;
		}

		public int Id { get; set; }
		public Game Igra { get; set; }

		private void IgreEdit_Load(object sender, EventArgs e)
		{
			SetupComboBoxes();
			if (Id > 0)
			{
				Igra = context.Set<Game>().FirstOrDefault(g => g.Id == Id);
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
			cboDeveloper.DataSource = context.Set<Company>().ToList();
			cboDeveloper.DisplayMember = "Name";
			cboDeveloper.ValueMember = "Id";
			cboDeveloper.FormattingEnabled = true;
			cboIzdavac.DataSource = context.Set<Company>().ToList();
			cboIzdavac.DisplayMember = "Name";
			cboIzdavac.ValueMember = "Id";
			cboIzdavac.FormattingEnabled = true;
			cboVrsta.DataSource = context.Set<Genre>().ToList();
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
					context.Set<Game>().Attach(Igra);
				}
				else
				{
					context.Set<Game>().Add(Igra);
				}
				context.SaveChanges();
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
