import {
    ShellBar,
    Avatar,
    ShellBarItem,
    StandardListItem,
  } from "@ui5/webcomponents-react";
  
  import React from "react";
  
  function ShellBar1(props) {
    return (
      <ShellBar
        logo={
          <img
            alt="SAP"
            src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg"
          />
        }
        menuItems={
          <>
            <StandardListItem
              data-key="onDebtChart"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Debtors' debt chart
            </StandardListItem>
            <StandardListItem
              data-key="2"
              iconEnd={false}
              infoState="None"
              selected={false}
              type="Active"
            >
              Creditors' debt chart
            </StandardListItem>
          </>
        }
        notificationCount={10}
        onCoPilotClick={function noRefCheck() {}}
        onLogoClick={function noRefCheck() {}}
        onMenuItemClick={(item) => {
          if (item.detail.item.dataset.key == "onDebtChart") {
            props.onDebtChart();
          }
        }}
        onNotificationsClick={function noRefCheck() {}}
        onProductSwitchClick={function noRefCheck() {}}
        onProfileClick={function noRefCheck() {}}
        primaryTitle="SAP ERP"
        profile={
          <Avatar
            backgroundColor="Accent6"
            image="https://avatars1.githubusercontent.com/u/55128809"
            imageFitType="Cover"
            shape="Circle"
            size="L"
          />
        }
        searchField={null}
        secondaryTitle="SAP Fiori design"
        showCoPilot
        showNotifications
        showProductSwitch
        startButton={null}
      >
        <ShellBarItem count="2" icon="add" text="ShellBarItem" />
      </ShellBar>
    );
  }
  export default ShellBar1;