import React from "react";
import { Input, Label, FlexBox, Button } from "@ui5/webcomponents-react";
import { Shellbar, InfoLabel, Table, FormInput } from "fundamental-react";

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
    console.log(this.props.apiData)
    var tableRowData = this.props.tableRowData;
    var tableData = tableRowData.map((item, j) => {
      var rowData = [];

      item.map((itemRowData, i) => {
        console.log(i);
        rowData.push(
          <FormInput  aria-label={i + j} value={itemRowData} name={i + j} />
        );
      });
      return {
        rowData: rowData,
      };
    });

    var calculatedData = this.props.calculatedData;
    console.log(calculatedData);
    var calculatedDataFormat = calculatedData.map((item, j) => {
      var rowData = [];
      rowData.push(<FormInput aria-label={j} value={item} name={j} />);
      return {
        rowData: rowData,
      };
    });

    console.log(calculatedDataFormat);
    var apiData = this.props.apiData;
    console.log(calculatedData);
    var apiDataFormat = apiData.map((item, j) => {
      var rowData = [];
      rowData.push(<FormInput aria-label={j} value={item} name={j} />);
      return {
        rowData: rowData,
      };
    });

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
        </FlexBox>
        <InfoLabel color={7}>
          {this.props.apiResponse}
          <br></br>
        </InfoLabel>
        {console.log(this.props.headers)}
        <Table
          compact={true}
          condensed={true}
          headers={this.props.headers}
          tableData={tableData}
        />
        <InfoLabel color={7}>
          Сonjugate gradient method<br></br>
        </InfoLabel>
        <Table
          compact={true}
          condensed={true}
          headers={this.props.headers}
          tableData={calculatedDataFormat}
        />
        <InfoLabel color={7}>
          Gauss method<br></br>
        </InfoLabel>
        <Table
          compact={true}
          condensed={true}
          headers={this.props.headers}
          tableData={apiDataFormat}
        />
         <InfoLabel color={7}>
          Gauss method<br></br>
        </InfoLabel>
      </React.Fragment>
    );
  }
}
export default InputData;
