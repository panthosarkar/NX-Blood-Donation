import InfoWrapper, {
  InfoDivider,
} from "@/bik-lib/features/info-wrapper/InfoWrapper";
import { FC } from "react";
import { icons } from "@/bikiran/lib/icons";
import { TEmail } from "../userListType";
import Image from "next/image";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";

const UserEmailInfo: FC<{ data: TEmail[] }> = ({ data }) => {
  return (
    <InfoWrapper className="!p-5">
      <InfoDivider title="Email" />
      <table className="table-container mt-2">
        <thead>
          <tr>
            <th className="w-[150px] text-start">Provider</th>
            <th className="text-start">Email</th>
            <th className="w-[100px] !text-center">Verified</th>
            <th className="w-[80px] !text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined && data?.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{capitalizeFirstLetter(item.provider)}</td>
                <td>
                  <div className="flex gap-2 items-center">
                    {item.identity}
                    {item.isPrimary && (
                      <span className="text-xs bg-green-400 text-white px-1 py-0.5 rounded-full ">
                        Primary
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <TooltipWrapper
                      content={
                        item.isVerified === true ? "Verified" : "Not Verified"
                      }
                    >
                      {item.isVerified ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-success"
                        >
                          <path
                            d="M13 0.142853C5.89645 0.142853 0.142883 5.89642 0.142883 13C0.142883 20.1036 5.89645 25.8571 13 25.8571C20.1036 25.8571 25.8572 20.1036 25.8572 13C25.8572 5.89642 20.1036 0.142853 13 0.142853ZM19.3965 7.55714C19.3643 7.64285 19.3322 7.73928 19.2786 7.81428L12.325 18.6464C11.8215 19.375 11.2322 19.3857 10.8036 19.2464C10.5143 19.15 10.2572 18.9786 10.0643 18.7429L6.94645 15.0893C6.6036 14.6929 6.47503 14.1464 6.61431 13.6321C6.8286 12.925 7.39645 12.775 7.88931 12.7964C8.33931 12.8286 8.76788 13.0321 9.05717 13.375L10.525 15.0464C10.5465 15.0679 10.5679 15.1 10.6 15.1214C10.9 15.3679 11.35 15.325 11.6072 15.025L18.1536 7.13928C18.3036 6.96785 18.4857 6.82857 18.7 6.73214C19.4715 6.42142 19.4929 7.20357 19.3965 7.55714Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.1401 2.15974C13.7193 -0.213402 10.2807 -0.213401 8.85985 2.15974L0.52546 16.0798C-0.935157 18.5193 0.822257 21.6198 3.6656 21.6198H20.3344C23.1777 21.6198 24.9352 18.5193 23.4745 16.0798L15.1401 2.15974ZM11.4535 13.819C11.4925 14.3135 11.7333 14.5608 12.1757 14.5608C12.6051 14.5608 12.8394 14.3135 12.8784 13.819L13.425 6.63572C13.464 6.23231 13.3599 5.89396 13.1127 5.62069C12.8654 5.34741 12.5466 5.21077 12.1562 5.21077C11.7658 5.21077 11.447 5.34741 11.1997 5.62069C10.9655 5.89396 10.8614 6.23231 10.8874 6.63572L11.4535 13.819ZM11.1607 18.5818C11.3689 18.777 11.6617 18.8746 12.0391 18.8746H12.2928C12.6702 18.8746 12.9565 18.777 13.1517 18.5818C13.3599 18.3736 13.464 18.0808 13.464 17.7034V17.3716C13.464 16.9942 13.3599 16.7079 13.1517 16.5127C12.9565 16.3045 12.6702 16.2004 12.2928 16.2004H12.0391C11.6617 16.2004 11.3689 16.3045 11.1607 16.5127C10.9655 16.7079 10.8679 16.9942 10.8679 17.3716V17.7034C10.8679 18.0808 10.9655 18.3736 11.1607 18.5818Z"
                            fill="#F24A17"
                          />
                        </svg>
                      )}
                    </TooltipWrapper>
                  </div>
                </td>
                <td className="text-center">
                  <span
                    className={
                      item.status === "active" ? "text-success" : "text-warning"
                    }
                  >
                    {capitalizeFirstLetter(item.status)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="not-found !h-22">
              <td colSpan={4}>No Email Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </InfoWrapper>
  );
};

export default UserEmailInfo;
