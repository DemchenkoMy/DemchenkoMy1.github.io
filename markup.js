class Markup{
	constructor(selector) {
		this.markup = document.querySelector(selector);
		this.table = this.markup.querySelector('tbody');
		this.btnDeleteRow = this.markup.querySelector('.buttonDelete.buttonRow');
		this.btnDeleteCol = this.markup.querySelector('.buttonDelete.buttonColumn');
		this.btnAddRow = this.markup.querySelector('.buttonAdd.buttonRow');
		this.btnAddCol = this.markup.querySelector('.buttonAdd.buttonColumn');
		
		this.table.addEventListener('mouseout', this.hideButton.bind(this));
		this.table.addEventListener('mouseover', this.displayButton.bind(this));
		this.btnDeleteRow.addEventListener('mouseover', this.stopTimeout.bind(this));
		this.btnDeleteCol.addEventListener('mouseover', this.stopTimeout.bind(this));
		this.btnAddRow.addEventListener('click', this.addRow.bind(this));
		this.btnAddCol.addEventListener('click', this.addCol.bind(this));
		this.btnDeleteRow.addEventListener('click', this.deleteRow.bind(this));
		this.btnDeleteCol.addEventListener('click', this.deleteCol.bind(this));
		
		let cells = this.markup.querySelectorAll('td');
		this.blockSide =cells[0].offsetLeft + cells[0].offsetWidth;
	}

	addRow() {
		this.table.appendChild(this.createRow());
	}
	
	addCol() {
		this.markup.querySelectorAll('tr').forEach((row) => {
			row.appendChild(this.createCol());
		});
	}
	
		displayButton() {
		clearTimeout(this.deleteRowButtonTimer);
		clearTimeout(this.deleteColButtonTimer);
		if (this.table.rows.length > 1) {
		let topOffset = event.target.offsetTop;
		this.btnDeleteRow.style.display = "block";
		this.btnDeleteRow.style.top = topOffset +'px';
		}
		if (this.markup.querySelector('tr').cells.length > 1){
		let leftOffset = event.target.offsetLeft;
		this.btnDeleteCol.style.display = "block";
		this.btnDeleteCol.style.left = leftOffset +'px';
		}
	}

	hideButton() {
		clearTimeout(this.deleteRowButtonTimer);
		clearTimeout(this.deleteColButtonTimer);
		
		this.deleteRowButtonTimer = setTimeout(() => {
			this.btnDeleteRow.style.display = "none";}, 100);
		
		this.deleteColButtonTimer = setTimeout(()=> {
			this.btnDeleteCol.style.display = "none";}, 100);
	}

	stopTimeout() {
		if (event.target == this.btnDeleteRow) {
			clearTimeout(this.deleteRowButtonTimer);
		}
		if (event.target == this.btnDeleteCol) {
			clearTimeout(this.deleteColButtonTimer);
		}
	}

	getSelectedRowIndex() {
		let top = this.btnDeleteRow.offsetTop;
		return Math.round(top / this.blockSide);
	}

	getSelectedColIndex() {
		let left = this.btnDeleteCol.offsetLeft;
		return Math.round(left / this.blockSide);}

	createCol() {
		let newColumn = document.createElement('td');
		newColumn.className = "tableCube";
		return newColumn;}
	
		deleteCol() {
		let index = this.getSelectedColIndex();
		this.markup.querySelectorAll("tr").forEach(function(row) {
		row.cells[index].remove();
		});
		this.btnDeleteCol.style.display = "none";
	}

	createRow() {
		let row = this.markup.querySelector('tr');
		let columnsInRow = row.cells.length;
		let newRow = document.createElement('tr');
		newRow.className = "tableRow";
		for (let i = 0; i< columnsInRow; i++) {
		newRow.appendChild(this.createCol());};
		return newRow;
	}
	
	deleteRow() {
		let index = this.getSelectedRowIndex();
		this.markup.querySelectorAll("tr")[index].remove();
		this.btnDeleteRow.style.display = "none";
	}

}
let markup = new Markup('.markup');