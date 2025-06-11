import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TUser } from "./UserSearchType";

export const ApiSearchUser = async (
    currentUser: CurrentUser,
    chkLoginReq: (data: TApiResponse<{ users: TUser[] }>) => void,
    q: string
): Promise<TApiResponse<{ users: TUser[] }>> => {
    try {
        const {
            data,
        }: {
            data: TApiResponse<{ users: TUser[] }>;
        } = await AxiosAuth.currentUserAuth(currentUser)
            .setUrl(`${getApi2Url()}/admin/user/search`, { q })
            .get();

        chkLoginReq(data);
        if (data.error) {
            throw new Error(data.message);
        }

        return data;
    } catch (err) {
        throw err;
    }
};