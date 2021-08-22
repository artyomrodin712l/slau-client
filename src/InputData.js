import React from "react";
import { Input, FlexBox, Button } from "@ui5/webcomponents-react";
import { Shellbar, InfoLabel, Table, FormInput } from "fundamental-react";
import Loader from "./Loader";

class InputData extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColumnsChange = this.handleColumnsChange.bind(this);
    this.handleGetRandomInt = this.handleGetRandomInt.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleGauss = this.handleGauss.bind(this);
    this.handleGetRandomFreeElements = this.handleGetRandomFreeElements.bind(this)
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
  handleGetRandomFreeElements() {
    this.props.onClickGetRandomFree();
  }
  handleGauss(){
    this.props.onClickGauss();
  }
  render() {
    var tableRowData = this.props.tableRowData;
    var tableData = tableRowData.map((item, j) => {
      var rowData = [];

      item.map((itemRowData, i) => {
        console.log(i);
        rowData.push(<Input value={itemRowData} />);
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
    var gaussData = this.props.gaussData;
    console.log(gaussData)
    var gaussDataFormat = gaussData.map((item, j) => {
      var rowData = [];
        rowData.push(
          <FormInput aria-label={j} value={item} name={j} />
        );
      return {
        rowData: rowData,
      };
    });
    var matrixData = this.props.matrixFreeElements;
    var matrixDataFormat = matrixData.map((item, j) => {
      var rowData = [];
      rowData.push(<Input aria-label={j} value={item} name={j} />);
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
    const gaussTable = (
      <React.Fragment>
        {this.props.isCalculated ? (
          <Table
            compact={true}
            condensed={true}
            headers={this.props.headers}
            tableData={gaussDataFormat}
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
          <Input
            tooltip="Enter rows"
            type="Text"
            valueState="None"
            value={this.props.rows}
            onChange={this.handleRowsChange}
          />
         <InfoLabel>Time of calculating conjugate gradient method</InfoLabel>
         <FormInput value = {this.props.timeCGM}></FormInput>
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
              design="Default"
              disabled={false}
              icon="employee"
              iconEnd={false}
              onClick={this.handleGetRandomFreeElements}
              slot=""
              style={{}}
              submits={false}
              tooltip=""
            >
              Random free elements
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
            <Button
              className=""
              design="Positive"
              disabled={false}
              icon="employee"
              iconEnd={false}
              onClick={this.handleGauss}
              slot=""
              style={{}}
              submits={false}
              tooltip=""
            >
              Gauss
            </Button>
          </FlexBox>
          <InfoLabel color={7}>
            Сonjugate gradient method<br></br>
          </InfoLabel>
          {calculatedTable}
          <InfoLabel color={7}>
            Gauss method<br></br>
          </InfoLabel>
          {gaussTable}
          <InfoLabel color={7}>
            Table
            <br></br>
          </InfoLabel>
          <Table
            compact={true}
            condensed={true}
            headers={this.props.headers}
            tableData={tableData}
            onChange = {tableData}
          />
          <InfoLabel color={7}>
            Matrix free elements
            <br></br>
          </InfoLabel>
          <Table
            compact={true}
            condensed={true}
            headers={this.props.headers}
            tableData={matrixDataFormat}
            onChange = {this.props.matrixFreeElements}

          />
        </FlexBox>
      </React.Fragment>
    );
  }
}
export default InputData;
