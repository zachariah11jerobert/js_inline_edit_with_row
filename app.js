let tableObj = {
  tableData: {},
  tableFields: [
    {
      name: "object_id",
      title: "Object Id",
      type: "text",
    },
    {
      name: "supplier",
      title: "Supplier",
      type: "text",
    },
    {
      name: "model",
      title: "Model",
      type: "text",
    },
    {
      name: "test",
      title: "test",
      type: "text",
    },
  ],

  counter: 0,
  createElement: function (field) {
    let elm = null;
    switch (field.type) {
      case "text":
        elm = document.createElement("input");
        elm.setAttribute("type", "text");
        elm.id = field.id;
        elm.name = field.name;
        break;
      case "select":
        elm = document.createElement("select");
        elm.id = field.id;
        elm.name = field.name;
        field.options.forEach(function (option) {
          let optionObj = new Option(option.label, option.value);
          elm.options.add(optionObj);
        });
        elm.addEventListener(
          "change",
          function (e) {
            this.tableData[field.name] = e.target.value;
            document.getElementById("formdata").value = JSON.stringify(
              this.tableData
            );
          }.bind(this)
        );
        break;
    }
    return elm;
  },
  createTable: function () {
    container = document.getElementById("table-container");
    tblElement = document.createElement("table");
    let tblHeadElement = document.createElement("thead");
    let row = tblHeadElement.insertRow(0);
    this.tableFields.forEach(function (tableField, index) {
      let cell = row.insertCell(index);
      cell.innerHTML = tableField.title;
    });
    tblElement.appendChild(tblHeadElement);

    tableContent = document.createElement("tbody");
    tableContent.addEventListener(
      "click",
      function (e) {
        if (e.target.className == "action-btn") {
          let id = e.target.parentNode.parentNode.rowIndex;

          this.addRowWithIndex(id);
        }
      }.bind(this)
    );
    tableContent.addEventListener(
      "keyup",
      function (e) {
        if (e.target.tagName == "INPUT") {
          let uniqueID=e.target.parentNode.parentNode.getAttribute('row-unique-id')
          let obj=this.tableData[uniqueID] == null ? {status:'NEW',exist:'NO'}:this.tableData[uniqueID] ;
          
          obj[e.target.name] = e.target.value;
          this.tableData[uniqueID]= obj;
          document.getElementById("formdata").value = JSON.stringify(
            this.tableData
          );
        }
      }.bind(this)
    );
    tableContent.id = "tcontent";
    tblElement.appendChild(tableContent);
    container.appendChild(tblElement);
  },

  addRow: function () {
    console.log(this.counter);
    let tbodyElem = document.getElementById("tcontent");
    let row = tbodyElem.insertRow(this.counter);
    let i = 0;
    this.tableFields.forEach(function (tableField,index) {
      let cell = row.insertCell(index);
      cell.innerHTML = tableField.title;
      i = index;
    });
    let cell = row.insertCell(i + 1);
    cell.innerHTML = "<button class='action-btn'>+</button>";
    this.counter++;
  },

  addRowWithIndex: function (index) {
    console.log(this.counter);
    let tbodyElem = document.getElementById("tcontent");
    let row = tbodyElem.insertRow(index);
    row.setAttribute('row-unique-id',`row_${(new Date()).getTime()}`)
    let i = 0;
    this.tableFields.forEach(
      function (tableField, index) {
        let cell = row.insertCell(index);
        cell.appendChild(this.createElement(tableField));
        i = index;
      }.bind(this)
    );
    let cell = row.insertCell(i + 1);
    cell.innerHTML = "<button class='action-btn'>+</button>";
  },
};

tableObj.createTable();
tableObj.addRow();

function addRowToTable(index) {
  var table = document.getElementById("myTable");
  var row = table.insertRow(index);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
}
