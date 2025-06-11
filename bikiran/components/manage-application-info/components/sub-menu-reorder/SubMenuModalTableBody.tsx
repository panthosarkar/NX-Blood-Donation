import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
// import { useRaisedShadow } from "@/bikiran/shared/framer-motion/use-raised-shadow";
import { cn } from "@/bik-lib/utils/cn";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { ReorderIcon } from "../BodyMenuTable/ReorderIcon";
import { useApplicationInfo } from "../../ApplicationInfoProvider";
import { ApiReorderDocSubMenu } from "../../operation/DocsMenuOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { Button } from "@bikiran/button";

type TItemsTr = {
  id: number;
  title: string;
  fullPermalink: string;
  priority: number;
};

type IItemsTrProps = {
  item: TItemsTr;
  isDragging: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsDragging: (val: boolean) => void;
};

const ItemsTr: FC<IItemsTrProps> = ({ item, isDragging, setIsDragging }) => {
  const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      as="tr"
      value={item}
      // style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={cn("group/row", {
        "select-none": isDragging,
      })}
    >
      <td className="!pl-1">
        <div className="flex gap-2">
          <ReorderIcon dragControls={dragControls} />
          <span>{item.id}</span>
        </div>
      </td>
      <td className="!w-42">{item.title}</td>
      <td>{item?.fullPermalink}</td>
      <td>{item.priority}</td>
    </Reorder.Item>
  );
};

const SubMenuModalTableBody = () => {
  const { authInfo } = useAuth2();
  const { setMessage, modalData, closeModal } = useTemplate();
  const { applicationData, handleReload } = useApplicationInfo();
  const [items, setItems] = useState(modalData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isReordered, setIsReordered] = useState<boolean>(false);

  useEffect(() => {
    if (!isDragging && modalData?.length) {
      // compare array items with data items to check if the order has changed or not
      const isSameOrder = items.every(
        (item: TItemsTr, index: number) => item.id === modalData[index]?.id
      );
      setIsReordered(!isSameOrder);
    }
  }, [items, isDragging, modalData]);
  const handleSaveReorder = () => {
    const priorityArr = items.map((item: TItemsTr) => item.id);
    const payload = {
      parentId: items[0]?.parentId || 0,
      applicationId: applicationData?.application?.id || 0,
      priorityArr,
    };
    setIsLoading(true);
    ApiReorderDocSubMenu(
      authInfo,
      payload.applicationId,
      payload.parentId,
      payload
    )
      .then(({ message }) => {
        setIsLoading(false);
        handleReload();
        closeModal();
        setMessage(message);
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage(err.message);
      });
  };
  return (
    <Reorder.Group as="tbody" axis="y" values={items} onReorder={setItems}>
      {items.map((item: TItemsTr) => (
        <ItemsTr
          key={item.id}
          item={item}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      ))}
      <tr className="hover:!bg-white !border-b-0">
        <td colSpan={4} className="">
          <div className="flex justify-end mt-5 gap-2">
            <Button
              title="Close"
              variant="red"
              disabled={isLoading}
              onClick={closeModal}
            />
            <Button
              title="Save Reorder"
              onClick={() => handleSaveReorder()}
              loading={isLoading}
              disabled={!isReordered}
            />
          </div>
        </td>
      </tr>
    </Reorder.Group>
  );
};

export default SubMenuModalTableBody;
