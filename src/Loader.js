import React from "react";
import { BusyIndicator, Text } from "@ui5/webcomponents-react";

function busyIndicator() {
  return (
    <BusyIndicator active={true}>
      <Text>Wait please, data is loading from productive SAP system</Text>
    </BusyIndicator>
  );
}

export default busyIndicator;
