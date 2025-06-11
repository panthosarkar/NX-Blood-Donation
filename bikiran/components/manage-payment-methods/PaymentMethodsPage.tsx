"use client";
import React, { FC } from "react";
import ModalChangeIcon from "./modals/ModalChangeIcon";
import PaymentMethodTable from "./PaymentMethodTable";
import PaymentMethodHeader from "./PaymentMethodHeader";
import PaymentMethodProvider from "./context/PaymentMethodProvider";
import ModalAddPaymentMethod from "./modals/ModalAddPaymentMethod";
import ModalUpdateInformation from "./modals/ModalUpdateInformation";

const PaymentMethodsPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <PaymentMethodProvider query={query}>
      <PaymentMethodHeader />
      <PaymentMethodTable />

      {/* modals  */}
      <ModalAddPaymentMethod />
      <ModalChangeIcon />
      <ModalUpdateInformation />
    </PaymentMethodProvider>
  );
};

export default PaymentMethodsPage;
