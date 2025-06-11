import { FC } from "react";
import style from "./UserSearch.module.css";
import UserSkeletonComp from "./UserSkeletonComp";
import { cn } from "@/bik-lib/utils/cn";
import { TState } from "@/bik-lib/types/event";

const UserInformation: FC<{
  data: any[];
  setSelectedUser: TState<any>;
}> = ({ data, setSelectedUser }) => {
  return (
    <div className={cn(style.userInfoContainer)}>
      {data.map((item) => (
        <div
          key={item.id}
          className={style.userWrapper}
          onClick={() => setSelectedUser(item)}
        >
          <div className="size-9 flex-shrink-0">
            <img src={item?.photoUrl} alt="" className="rounded-full" />
          </div>

          <div className="flex flex-col">
            <div className="text-primary text-base font-medium ">
              {item?.displayName}
            </div>
            <div className="text-primary-700 text-sm font-normal">
              {item?.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const UserPopover = ({
  data,
  show,
  setSelectedUser,
  loading,
}: {
  data: any[];
  show: boolean;
  setSelectedUser: TState<any>;
  loading: boolean;
}) => {
  return (
    <div
      className={cn(
        style.popOverContainer,
        show ? style.popOverShow : style.popOverHide
      )}
    >
      {/* {loading && <UserSkeletonComp />} */}
      {!loading && data.length > 0 && show && (
        <div>
          <UserInformation data={data} setSelectedUser={setSelectedUser} />
        </div>
      )}
      {loading && show && (
        <div>
          {Array.from({ length: 2 }).map((_, index) => (
            <UserSkeletonComp key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPopover;
