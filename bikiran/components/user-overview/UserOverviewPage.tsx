"use client";
import React, { FC, useEffect, useState } from "react";
import { TOverview } from "../user-list/userListType";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import Image from "next/image";
import notFoundImage from "@/public/assets/images/not-found.svg";
import UserPersonalInfo from "./UserPersonalInfo";
import UserAddressInfo from "./UserAddressInfo";
import UserPhoneInfo from "./UserPhoneInfo";
import UserEmailInfo from "./UserEmailInfo";
import UserProjectInfo from "./UserProjectInfo";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { icons } from "@/bikiran/lib/icons";
import UserOverviewSkeleton from "../user-list/user-sidebar-section/UserOverviewSkeleton";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import useApi from "@/bik-lib/utils/useApi";

const UserBackButton: FC = () => {
  const router = useRouter();
  return (
    <Link
      href=""
      onClick={() => router.back()}
      aria-label="Go Back"
      className=" flex gap-3 items-center w-fit"
    >
      <Image
        src={icons.iconRightArrow}
        alt="Back to projects"
        width={0}
        height={0}
        sizes="100"
        className="size-7.5"
      />
      <h1 className="text-primary text-lg font-medium leading-[25px]">
        {/* Back to User List */}
      </h1>
    </Link>
  );
};

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

const UserHeader: FC<{ user: TOverview }> = ({ user }) => {
  return (
    <div className=" w-full flex justify-between items-center p-4 rounded-20 mb-4 top-0 bg-white z-10">
      <div className="flex  items-center  ">
        <UserBackButton />
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
      </div>
      {/* <ButtonRefresh/> */}
    </div>
  );
};

const UserOverviewPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { get } = useApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<TOverview | undefined>(undefined);
  const data = query;
  const { id } = useParams();
  const userId = id || 0;

  const { setMessage } = useTemplate();

  useEffect(() => {
    if (userId !== 0) {
      setLoading(true);
      get(`/admin/user/${id}/overview`)
        .then(({ data }) => {
          setUserData(data);
        })
        .catch((err: Error) => {
          setMessage(err.message);
          setUserData(undefined);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data]);

  return (
    <div>
      {data ? (
        loading ? (
          <UserOverviewSkeleton />
        ) : (
          <div>
            {userData && <UserHeader user={userData} />}
            {userData && <UserInformation data={userData} />}
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center h-[100vh] ">
          <div className="mb-40">
            <Image
              alt="No user selected"
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

export default UserOverviewPage;
