import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const AdmExecutionSkeletonComp: FC = () => {
  const arr = Array.from({ length }, (_, i) => i);
  return arr.map((i) => (
    <tr key={i} className=" h-[50px]">
      <td className="font-medium ">
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
      <td>
        <Skeleton className="h-5" />
      </td>
    </tr>
  ));
};

export default AdmExecutionSkeletonComp;
