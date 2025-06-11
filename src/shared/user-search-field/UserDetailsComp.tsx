import { cn } from "@/bik-lib/utils/cn";
import style from "./UserSearch.module.css";

const UserDetailsComp = ({
  data,
  className,
}: {
  data: any;
  className?: any;
}) => {
  return (
    <div className={cn(style.container)}>
      <div className={cn(style.wrapper, className)}>
        <div className={style.photo}>
          <img src={data?.photoUrl} alt="" className="rounded-full" />
        </div>
        <div className={style.infoContainer}>
          <div className={style.displayName}>{data?.displayName}</div>
          <div className={style.email}>{data?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsComp;
