import React, { Component } from "react";
import "./App.css";
import InputData from "./InputData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      rows: 5,
      columns: 7,
    };
  }
  render() {
    const tableRowData = [
      {
        rowData: ["1", "2", "3", "4", "5"],
      },
      {
        rowData: ["1", "2", "3", "4", "5","6"],
      },
      {
        rowData: ["1", "2", "3", "4", "5","6"],
      },
      {
        rowData: ["1", "2", "3", "4", "5", "8"],
      },
      {
        rowData: ["1", "2", "3", "4", "77"],
      },
      {
        rowData: ["1", "2", "3", "4", "5"],
      },
      {
        rowData: ["1", "2", "3", "4", "5"],
      }
    ];
    const headers = ["1", "2", "3", "4", "5","6","7"];
    return (
      <React.Fragment>
        <InputData
          rows={this.state.rows}
          columns={this.state.columns}
          tableRowData={tableRowData}
          headers={headers}
        />
      </React.Fragment>
    );
  }
}
export default App;
