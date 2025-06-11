import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";

export const ApiGetApplicationInfo = async (
  currentUser: CurrentUser
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/application`)
      .get();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
