import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import PaymentMethodTableSkeleton from "./PaymentMethodTableSkeleton";
import { usePaymentMethod } from "./context/PaymentMethodProvider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Reorder } from "framer-motion";
import { cn } from "@/bik-lib/utils/cn";
import { Button } from "@/bik-lib/lib/button";
import PaymentTableRow from "./PaymentTableRow";
import useApi from "@/bik-lib/utils/useApi";

const PaymentMethodTable = () => {
  const { loading, reload, data, query } = usePaymentMethod();
  const [items, setItems] = useState(data.gateways && data.gateways);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isReordered, setIsReordered] = useState(false);

  const { put } = useApi();
  const { setMessage } = useTemplate();

  useEffect(() => {
    if ((data.gateways && data.gateways.length) !== 0) {
      setItems(data.gateways);
    }
  }, [data]);

  useEffect(() => {
    if (!isDragging) {
      // compare array items with data items to check if the order has changed or not
      const isSameOrder =
        items &&
        items.every((item, index) => item.id === data.gateways[index]?.id);
      setIsReordered(!isSameOrder);
    }
  }, [items, isDragging, data]);

  const currency = query?.currency;

  const handleSaveReorder = () => {
    if (isReordered) {
      setIsLoading(true);
      const sequence = items.map((item) => item.id);
      put(`/admin/gateway/configuration/${currency}/update-sequence`, {
        sequence,
      })
        .then(({ message }) => {
          setIsLoading(false);
          reload();
          setIsReordered(false);
          setMessage(message);
        })
        .catch((ex: Error) => {
          setIsLoading(false);
          setMessage(ex.message);
        });
    }
  };

  const placeholder = Array.from(
    { length: (data.gateways && data.gateways.length) || 3 },
    (_, i) => i
  );

  return (
    <div>
      <div className="w-full h-10 bg-primary-100  grid grid-flow-col items-center *:text-primary *:text-[13px] *:px-2 *:font-medium rounded-8 table-container">
        <div className="w-[80px] hr !text-center">Priority</div>
        <div className="w-[100px] hr">ID</div>
        <div className="w-[80px] text-center">Icon</div>
        <div className="w-[100px] text-start">Provider</div>
        <div className="2xl:w-[350px] w-[250px] text-start">Title</div>
        <div className="w-[200px] text-start">Button Text</div>
        <div className="w-[100px] text-center">Status</div>
        <div className="text-right pr-5 w-[80px]">#</div>
      </div>
      {loading ? (
        placeholder?.map((i) => <PaymentMethodTableSkeleton key={i} />)
      ) : !loading && data.gateways.length ? (
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
          <motion.div>
            {items &&
              items.map((data) => (
                <PaymentTableRow
                  key={data.id}
                  item={data}
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                />
              ))}
            <div
              className={cn("w-full mt-10 flex gap-2 opacity-0 invisible", {
                "opacity-100 visible": isReordered,
              })}
            >
              <Button
                title="Save Re-order"
                onClick={() => handleSaveReorder()}
                loading={isLoading}
              />
              <Button
                variant="red"
                title={"Close"}
                onClick={() => setItems(data.gateways)}
              />
            </div>
          </motion.div>
        </Reorder.Group>
      ) : (
        <div className="not-found">
          <div className="text-center h-40 flex justify-center items-center">
            No gateway found!
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodTable;
