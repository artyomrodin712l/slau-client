import React, { Component } from "react";
import "./App.css";
import InputData from "./InputData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      rows: 2,
      columns: 2,
      tableRowData: [],
    };
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColumnsChange = this.handleColumnsChange.bind(this);
  }
  createMass(n, m) {
    var tableRowData = []
    var tableColumnData = []
    for (var i = 0; i < m; i++) {
      tableRowData[i] = new Map();
      for (var j = 0; j < n; j++) {
        tableColumnData[j] = 0
      }
      tableRowData[i].set("rowData", tableColumnData)
    }
    console.log(tableRowData)
    this.setState({
      tableRowData: tableRowData,
    });
  }
  handleRowsChange(rows) {
    this.setState({
      rows: rows,
    });
    console.log(this.state.rows);
    this.createMass(this.state.rows,this.state.columns)
  }

  handleColumnsChange(columns) {
    this.setState({
      columns: columns,
    });
    console.log(this.state.columns);
    this.createMass(this.state.rows,this.state.columns)
  }
  componentDidMount() {
 
  }
  render() {
    
    const headers = ["1", "2"];
    return (
      <React.Fragment>
        <InputData
          rows={this.state.rows}
          columns={this.state.columns}
          onRowsChange={this.handleRowsChange}
          onColumnsChange={this.handleColumnsChange}
          tableRowData={this.state.tableRowData}
          headers={headers}
        />
      </React.Fragment>
    );
  }
}
export default App;
