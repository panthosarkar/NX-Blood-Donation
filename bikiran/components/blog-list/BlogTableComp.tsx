import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";
import React from "react";

const BlogTableComp = () => {
  return (
    <TableWrapper
      headers={[
        "ID + w-[100px] !text-center",
        "User + w-[80px]",
        "Title + text-left",
        "Category + w-[130px] !text-center",
        "Time Created + w-[200px]",
        "Total View + w-[100px]",
        "Read Time + w-[100px]",
        "Status + w-[100px] !text-center",
        "# + w-[50px]",
      ]}
      loading={false}
      notFoundText="No Blog Found!"
    >
      {[1, 2, 3]?.map((item) => {
        // const isInactive: boolean = "active" !== "active";
        return (
          <tr key={item}>
            <td className=" text-center"></td>
            <td className="text-left"></td>
            <td className="text-center"></td>
            <td className="text-left"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>

            <td className="text-center">
              {/* <StatusColor status={isInactive ? "Inactive" : "Active"} /> */}
            </td>
            <td>
              {/* <InstOption>
                <button
                  type="button"
                  // onClick={() => openModal("update:bank-account", item)}
                >
                  Update Info
                </button>
                <button
                  type="button"
                  // onClick={() => openModal("update-bank-status", item)}
                >
                  Update Status
                </button>
              </InstOption> */}
            </td>
          </tr>
        );
      })}
    </TableWrapper>
  );
};

export default BlogTableComp;
