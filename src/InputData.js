import React from "react";
import { Input, Label, FlexBox } from "@ui5/webcomponents-react";
import { Shellbar, InfoLabel, Table } from "fundamental-react";

class InputData extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColumnsChange = this.handleColumnsChange.bind(this);
  }
  handleRowsChange(e) {
    this.props.onRowsChange(e.target.value);
  }
  handleColumnsChange(e) {
    this.props.onColumnsChange(e.target.value);
  }
  render() {
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
          <Label>Enter rows:</Label>
          <Input
            tooltip="Enter rows"
            type="Text"
            valueState="None"
            value={this.props.rows}
            onChange={this.handleRowsChange}
          />
          <Label>Enter columns:</Label>
          <Input
            tooltip="Enter columns"
            type="Text"
            valueState="None"
            value={this.props.columns}
            onChange={this.handleColumnsChange}
          />
        </FlexBox>
        {console.log(this.props.headers)}
        <Table
          compact={true}
          condensed={true}
          headers={this.props.headers}
          tableData={this.props.tableRowData}
        />
      </React.Fragment>
    );
  }
}
export default InputData;
