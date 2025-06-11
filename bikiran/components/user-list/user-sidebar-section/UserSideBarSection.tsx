import { TOverview } from "../userListType";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Image from "next/image";
import UserPhoneInfo from "./UserPhoneInfo";
import UserEmailInfo from "./UserEmailInfo";
import UserAddressInfo from "./UserAddressInfo";
import UserPersonalInfo from "./UserPersonalInfo";
import notFoundImage from "@/public/assets/images/not-found.svg";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import UserProjectInfo from "./UserProjectInfo";

import Link from "next/link";
import UserOverviewSkeleton from "./UserOverviewSkeleton";
import useApi from "@/bik-lib/utils/useApi";

const UserInformation: FC<{ data: TOverview }> = ({ data }) => {
  const userData = data?.userProfile;
  const emailData = data?.emails;
  const phoneData = data?.phones;
  const addressData = data?.addresses;
  const projectData = data?.projects;
  return (
    <div className="space-y-3">
      <UserPersonalInfo data={userData} />
      <UserAddressInfo data={addressData} />
      <UserPhoneInfo data={phoneData} />
      <UserEmailInfo data={emailData} />
      <UserProjectInfo data={projectData} />
    </div>
  );
};

const UserOverviewComp: FC<{
  data: any;
}> = ({ data }) => {
  return (
    <Link
      href={`/user/${data?.id}/overview`}
      className="size-11 p-2 rounded-8 bg-[rgba(0,166,255,0.10)] hover:bg-[#00A6FF] transition-colors group"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#00A6FF] group-hover:text-white"
      >
        <path
          d="M13.9995 4C16.4815 4 18.8345 4.861 20.8835 6.455C22.9325 8.036 24.6765 10.353 25.9295 13.251C26.0235 13.471 26.0235 13.728 25.9295 13.938C23.4235 19.732 18.9635 23.2 13.9995 23.2H13.9875C9.03552 23.2 4.57452 19.732 2.06952 13.937C1.97552 13.727 1.97552 13.47 2.06952 13.25C4.57552 7.455 9.03552 4 13.9875 4H13.9995ZM13.9995 8.945C11.4125 8.945 9.31652 11.028 9.31652 13.6C9.31652 16.16 11.4125 18.243 13.9995 18.243C16.5755 18.243 18.6705 16.16 18.6705 13.6C18.6705 11.028 16.5755 8.945 13.9995 8.945Z"
          fill="currentColor"
        />
        <path
          d="M16.9172 13.596C16.9172 15.19 15.6062 16.494 14.0022 16.494C12.3862 16.494 11.0752 15.191 11.0752 13.596C11.0752 13.398 11.0982 13.213 11.1342 13.027H11.1932C12.4932 13.027 13.5462 12.003 13.5932 10.722C13.7222 10.7 13.8622 10.687 14.0032 10.687C15.6062 10.687 16.9172 11.99 16.9172 13.596Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
};

const UserHeader: FC<any> = ({ user, data }) => {
  return (
    <div className="flex justify-between items-center  py-2 border-b border-gray-200 mb-4 sticky top-0 bg-white z-10">
      <div className="flex items-center gap-2  py-2">
        <div className="size-11 overflow-hidden">
          <Avatar className="relative !size-full mb-3 group">
            <AvatarImage src={user?.userProfile?.photoUrl} />
            <AvatarFallback className="uppercase bg-secondary-300">
              X
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="text-lg font-medium">
          <div className=" flex items-center gap-2">
            <div className="text-primary">
              {user?.userProfile?.displayName || "--"}
            </div>
            <div className="text-xs text-white bg-success px-2 rounded-30">
              {capitalizeFirstLetter(user?.userProfile?.status || "")}
            </div>
          </div>
          {user?.emails.map((email: any) => (
            <div key={email.id} className="text-primary-700 text-sm">
              {email.isPrimary ? email.identity : null}
            </div>
          ))}
        </div>
      </div>
      <UserOverviewComp data={data} />
    </div>
  );
};

const UserSideBarSection: FC<any> = ({ data }) => {
  const [userData, setUserData] = useState<TOverview | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const userId = data?.id || 0;

  const { setMessage } = useTemplate();
  const { get } = useApi();

  useEffect(() => {
    if (userId !== 0) {
      setLoading(true);
      get(`/admin/user/${userId}/overview`)
        .then((data) => {
          setUserData(data?.data);
        })
        .catch((err: Error) => {
          setMessage(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div>
      {data ? (
        loading ? (
          <UserOverviewSkeleton />
        ) : (
          <div>
            <UserHeader user={userData} data={data} />
            {/* <UserUsedDetails data={data} /> */}
            {userData && <UserInformation data={userData} />}
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center h-[100vh] ">
          <div className="mb-40">
            <Image
              alt="No invoice selected"
              src={notFoundImage}
              width={0}
              height={0}
            />
            <div className="flex justify-center items-center">
              <h3 className="text-primary text-lg font-medium text-center">
                No user selected
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSideBarSection;
