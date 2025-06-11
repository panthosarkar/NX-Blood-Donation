"use client";
import { cn } from "@/bik-lib/utils/cn";
import { motion } from "motion/react";
import { Reorder } from "framer-motion";
import { IAppList } from "../../ManageApplicationTypes";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useEffect, useState } from "react";
import ApplicationTableBodyItem from "./ApplicationTableBodyItem";
import { Button } from "@bikiran/button";
import useApi from "@/bik-lib/utils/useApi";

type Props = {
  data: IAppList[];
  handleReload: () => void;
  formData: any;
};

const ApplicationTableBody = ({ data = [], handleReload, formData }: Props) => {
  const [items, setItems] = useState([...data]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isReordered, setIsReordered] = useState(false);

  const { put } = useApi();
  const { setMessage } = useTemplate();

  // filter data based on search text

  const filteredData = data?.filter((data) =>
    data.title && typeof data.title === "string"
      ? data.title.toLowerCase().includes(formData.text?.toLowerCase() || "")
      : false
  );

  useEffect(() => {
    // Filter items whenever formData.searchQuery changes
    const filteredItems = filteredData;
    setItems(filteredItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.text, data]);

  useEffect(() => {
    if (!isDragging) {
      // compare array items with data items to check if the order has changed or not
      const isSameOrder = items.every(
        (item, index) => item.id === data[index].id
      );
      setIsReordered(!isSameOrder);
    }
  }, [items, isDragging, data]);

  const handleSaveReorder = () => {
    if (isReordered) {
      setIsLoading(true);
      const priorityArr = items.map((item) => item.id);

      put(`/admin/application/update-sequence`, { priorityArr })
        .then(({ message }) => {
          setIsLoading(false);
          handleReload();
          setIsReordered(false);
          setMessage(message);
        })
        .catch((ex) => {
          setIsLoading(false);
          setMessage(ex);
        });
    }
  };

  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      <motion.div className="table-body flex flex-col w-full">
        {items.map((item) => (
          <ApplicationTableBodyItem
            key={item.id}
            item={item}
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
            onClick={() => setItems([...data])}
          />
        </div>
      </motion.div>
    </Reorder.Group>
  );
};

export default ApplicationTableBody;
