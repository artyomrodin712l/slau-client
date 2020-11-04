import React from "react";
import { Input, Label, FlexBox, Button } from "@ui5/webcomponents-react";
import { Shellbar, InfoLabel, Table, FormInput } from "fundamental-react";
import Loader from "./Loader";

class InputData extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColumnsChange = this.handleColumnsChange.bind(this);
    this.handleGetRandomInt = this.handleGetRandomInt.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }
  handleCalculate() {
    this.props.onClickCalculate();
  }
  handleRowsChange(e) {
    this.props.onRowsChange(e.target.value);
  }
  handleColumnsChange(e) {
    this.props.onColumnsChange(e.target.value);
  }
  handleGetRandomInt() {
    this.props.onClickGetRandom();
  }
  render() {
    var tableRowData = this.props.tableRowData;
    var tableData = tableRowData.map((item, j) => {
      var rowData = [];

      item.map((itemRowData, i) => {
        console.log(i);
        rowData.push(<FormInput value={itemRowData} />);
      });
      return {
        rowData: rowData,
      };
    });

    var apiData = this.props.apiData;
    var apiDataFormat = apiData.map((item, j) => {
      var rowData = [];
      rowData.push(<FormInput aria-label={j} value={item} name={j} />);
      return {
        rowData: rowData,
      };
    });
    const calculatedTable = (
      <React.Fragment>
        {this.props.isCalculated ? (
          <Table
            compact={true}
            condensed={true}
            headers={this.props.headers}
            tableData={apiDataFormat}
          />
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
    return (
      <React.Fragment>
        {console.log(this.props.tableData)}
        <Shellbar
          logo={
            <img
              alt="GGTU"
              src="//unpkg.com/fundamental-styles/dist/images/sap-logo.png"
            />
          }
          productTitle="System of linear algebraic equations"
        />
        <InfoLabel color={7}>
          Enter matrix size<br></br>
        </InfoLabel>
        <FlexBox
          alignItems="Stretch"
          direction="Column"
          justifyContent="Start"
          wrap="NoWrap"
        >
          <Label> Enter matrix size:</Label>
          <Input
            tooltip="Enter rows"
            type="Text"
            valueState="None"
            value={this.props.rows}
            onChange={this.handleRowsChange}
          />
          <FlexBox
            alignItems="Start"
            direction="Row"
            displayInline={false}
            justifyContent="Start"
            wrap="NoWrap"
          >
            <Button
              className=""
              design="Default"
              disabled={false}
              icon="employee"
              iconEnd={false}
              onClick={this.handleGetRandomInt}
              slot=""
              style={{}}
              submits={false}
              tooltip=""
            >
              Random
            </Button>
            <Button
              className=""
              design="Positive"
              disabled={false}
              icon="employee"
              iconEnd={false}
              onClick={this.handleCalculate}
              slot=""
              style={{}}
              submits={false}
              tooltip=""
            >
              Calculate
            </Button>
          </FlexBox>
          {calculatedTable}
          <InfoLabel color={7}>
            Table
            <br></br>
          </InfoLabel>
          <Table
            compact={true}
            condensed={true}
            headers={this.props.headers}
            tableData={tableData}
          />
          <InfoLabel color={7}>
            Сonjugate gradient method<br></br>
          </InfoLabel>
          <InfoLabel color={7}>
            Gauss method<br></br>
          </InfoLabel>
        </FlexBox>
      </React.Fragment>
    );
  }
}
export default InputData;
