
namespace Gameshop_Dapper
{
	partial class IgreLista
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(IgreLista));
			this.dgvIgre = new System.Windows.Forms.DataGridView();
			this.toolStrip1 = new System.Windows.Forms.ToolStrip();
			this.tsbNovi = new System.Windows.Forms.ToolStripButton();
			this.tsbUredi = new System.Windows.Forms.ToolStripButton();
			this.tsbObrisi = new System.Windows.Forms.ToolStripButton();
			((System.ComponentModel.ISupportInitialize)(this.dgvIgre)).BeginInit();
			this.toolStrip1.SuspendLayout();
			this.SuspendLayout();
			// 
			// dgvIgre
			// 
			this.dgvIgre.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dgvIgre.Location = new System.Drawing.Point(14, 43);
			this.dgvIgre.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
			this.dgvIgre.Name = "dgvIgre";
			this.dgvIgre.Size = new System.Drawing.Size(905, 512);
			this.dgvIgre.TabIndex = 0;
			// 
			// toolStrip1
			// 
			this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbNovi,
            this.tsbUredi,
            this.tsbObrisi});
			this.toolStrip1.Location = new System.Drawing.Point(0, 0);
			this.toolStrip1.Name = "toolStrip1";
			this.toolStrip1.Size = new System.Drawing.Size(943, 25);
			this.toolStrip1.TabIndex = 16;
			this.toolStrip1.Text = "toolStrip1";
			this.toolStrip1.ItemClicked += new System.Windows.Forms.ToolStripItemClickedEventHandler(this.toolStrip1_ItemClicked);
			// 
			// tsbNovi
			// 
			this.tsbNovi.Image = ((System.Drawing.Image)(resources.GetObject("tsbNovi.Image")));
			this.tsbNovi.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsbNovi.Name = "tsbNovi";
			this.tsbNovi.Size = new System.Drawing.Size(81, 22);
			this.tsbNovi.Text = "Novi zapis";
			// 
			// tsbUredi
			// 
			this.tsbUredi.Image = ((System.Drawing.Image)(resources.GetObject("tsbUredi.Image")));
			this.tsbUredi.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsbUredi.Name = "tsbUredi";
			this.tsbUredi.Size = new System.Drawing.Size(55, 22);
			this.tsbUredi.Text = "Uredi";
			// 
			// tsbObrisi
			// 
			this.tsbObrisi.Image = ((System.Drawing.Image)(resources.GetObject("tsbObrisi.Image")));
			this.tsbObrisi.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsbObrisi.Name = "tsbObrisi";
			this.tsbObrisi.Size = new System.Drawing.Size(58, 22);
			this.tsbObrisi.Text = "Obriši";
			// 
			// IgreLista
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(943, 567);
			this.Controls.Add(this.toolStrip1);
			this.Controls.Add(this.dgvIgre);
			this.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
			this.Name = "IgreLista";
			this.Text = "Unos igara";
			this.Load += new System.EventHandler(this.KatalogForma_Load);
			((System.ComponentModel.ISupportInitialize)(this.dgvIgre)).EndInit();
			this.toolStrip1.ResumeLayout(false);
			this.toolStrip1.PerformLayout();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion
		private System.Windows.Forms.DataGridView dgvIgre;
		private System.Windows.Forms.ToolStrip toolStrip1;
		private System.Windows.Forms.ToolStripButton tsbNovi;
		private System.Windows.Forms.ToolStripButton tsbUredi;
		private System.Windows.Forms.ToolStripButton tsbObrisi;
	}
}