import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const TransactionTableSkeletonComp: FC<{ length: number }> = ({ length }) => {
  const arr = Array.from({ length: length || 4 }, (_, i) => i);

  return (
    <tbody>
      {arr.map((i: number) => (
        <tr key={i}>
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
          <td>
            <Skeleton className="h-5" />
          </td>
          <td>
            <Skeleton className="h-5" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TransactionTableSkeletonComp;
