import React from "react";
import { Input, Label, FlexBox } from "@ui5/webcomponents-react";
import { Shellbar, InfoLabel, Table } from "fundamental-react";
function InputData(props) {
  return (
    <React.Fragment>
      {console.log(props.rows)}
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
        <Input tooltip="Enter rows" type="Text" valueState="None" />
        <Label>Enter columns:</Label>
        <Input tooltip="Enter columnss" type="Text" valueState="None" />
      </FlexBox>
      {console.log(props.headers)}
      <Table
            compact={true}
            condensed={true}
            headers={props.headers}
            tableData={props.tableRowData} />
    </React.Fragment>
  );
}
export default InputData;
