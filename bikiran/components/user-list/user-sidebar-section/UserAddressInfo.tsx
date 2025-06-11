import InfoWrapper, {
  InfoDivider,
} from "@/bik-lib/features/info-wrapper/InfoWrapper";
import { FC } from "react";
import { TAddress } from "../userListType";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";

const UserAddressInfo: FC<{ data: TAddress[] }> = ({ data }) => {
  return (
    <InfoWrapper className="!p-5">
      <InfoDivider title="Address" />
      <table className="table-container mt-2">
        <thead>
          <tr>
            <th className="w-[190px] text-start">Name</th>
            <th className="text-start">Address</th>
            <th className="w-[80px] !text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined && data?.length > 0 ? (
            data.map((address) => (
              <tr key={address.id}>
                <td className="flex flex-col gap-2">
                  <span className="font-medium">{address.email}</span>
                  <span className="text-xs text-primary-500 ">
                    +{address.mobile}
                  </span>
                </td>
                <td className="space-x-2">
                  <span>
                    {address.line1 || "--"}, {address.line2 || "--"}{" "}
                    {address.line3 || "--"}
                  </span>
                  <span>
                    {address.city || "--"}, {address.state || "--"},{" "}
                    {address.country || "--"}, {address.zipCode || "--"}
                  </span>
                  {address.isPrimary && (
                    <span className="text-xs bg-green-400 text-white px-1 py-0.5 rounded-full ">
                      Primary
                    </span>
                  )}
                </td>
                <td className="text-center">
                  <span
                    className={
                      address.status === "active"
                        ? "text-success"
                        : "text-warning"
                    }
                  >
                    {capitalizeFirstLetter(address.status)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="not-found !h-22">
              <td colSpan={3}>No Address Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </InfoWrapper>
  );
};

export default UserAddressInfo;
