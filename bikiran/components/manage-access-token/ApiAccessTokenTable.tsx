import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC } from "react";
import { useAccessToken } from "./context/ApiAccessTokenProvider";
import ApiAccessTokenSkeleton from "./ApiAccessTokenSkeleton";
import useApi from "@/bik-lib/utils/useApi";

const ApiAccessTableBodyComp: FC = () => {
  const { setMessage, setConfirm, setTemplateLoading } = useTemplate();
  const { remove } = useApi();

  const handleDeleteToken = (ev: MouseEvent, data: any) => {
    ev.stopPropagation();
    setConfirm({
      text: `Are you sure you want to delete this token? This action cannot be undone.`,
      textAction: "Yes, Delete",
      clickAction: () => {
        setTemplateLoading(true);
        remove(`/api/api-access-token/${data?.id || ""}/delete`)
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            setTemplateLoading(false);
          })
          .catch((err) => {
            setTemplateLoading(false);
            setMessage(err.message);
          });
      },
    });
  };
  return [1, 2].map((item) => (
    <tr key={item} className="even:bg-primary-50 !border-0">
      <td className="font-medium rounded-tl-8 rounded-bl-8">01</td>
      <td>
        <p className="text-primary-500 text-sm font-normal">
          Token Description
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal">User Role</p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal">
          Token Description
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal">12/12/2021</p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal">12/12/2021</p>
      </td>

      <td className="text-center">
        <p className="text-primary-500 text-sm font-normal">Active</p>
      </td>

      <td className="text-right rounded-tr-8 rounded-br-8">
        <InstOption>
          <button
            type="button"
            onClick={() => {
              handleDeleteToken;
            }}
          >
            Delete
          </button>
        </InstOption>
      </td>
    </tr>
  ));
};
const ApiAccessTokenTable = () => {
  const { accessTokenData, loading } = useAccessToken();
  const arr = Array.from({ length: accessTokenData?.length || 7 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead className="bg-primary-100 hover:!bg-primary-100">
        <tr className="!border-0">
          <th className="w-[50px] rounded-tl-8 rounded-bl-8">ID</th>
          <th className="w-[300px]">Token Name</th>
          <th className="w-[250px]">User</th>
          <th className="">Description</th>
          <th className="w-[130px]">Date Created</th>
          <th className="w-[130px]">Date Expired</th>
          <th className="w-[90px] text-center">Status</th>
          <th className="w-[80px] text-right rounded-tr-8 rounded-br-8">#</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          arr.map((i) => <ApiAccessTokenSkeleton key={i} />)
        ) : accessTokenData.length > 0 ? (
          <ApiAccessTableBodyComp />
        ) : (
          <tr>
            <td className="text-center top-20 relative" colSpan={7} rowSpan={3}>
              No Api Access Token List yet!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ApiAccessTokenTable;
