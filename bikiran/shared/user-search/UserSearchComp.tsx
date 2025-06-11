import React, { FC, useEffect, useState } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { ApiSearchUser } from "../user-search/UserSearchOperation";
import { UserSearchField } from "@bikiran/inputs";

type TProps = {
  formData: any;
  setFormData: (data: any) => void;
  selectedUser: any;
  setSelectedUser: (data: any) => void;
  userData: any[];
  setUserData: (data: any[]) => void;
};

const UserSearchComp: FC<TProps> = ({
  setUserData,
  formData,
  selectedUser,
  setFormData,
  setSelectedUser,
  userData,
}) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const { authInfo, chkLoginReq } = useAuth2();

  // get user
  useEffect(() => {
    // Set loading immediately when search criteria is met
    if (debouncedValue.length > 2) {
      setLoading(true);
    }
    const debounceTimeout = setTimeout(() => {
      if (debouncedValue.length > 2) {
        ApiSearchUser(authInfo, chkLoginReq, debouncedValue)
          .then(({ data }) => {
            setUserData(data?.users || []);
          })
          .catch((err: Error) => {
            console.error("Error fetching user data:", err);
            setUserData([]);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUserData([]);
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(debounceTimeout);
  }, [reloadKey, debouncedValue, authInfo, chkLoginReq]);

  return (
    <UserSearchField
      formData={formData}
      label="Search User"
      loading={loading}
      selectedUser={selectedUser}
      setDebouncedValue={setDebouncedValue}
      setFormData={setFormData}
      setSelectedUser={setSelectedUser}
      userData={userData}
      btnClick={() => {
        window.open(`/user/list#create-user?name=${formData?.user}`, "_blank");
      }}
      reload={() => {
        setReloadKey((prev) => prev + 1);
      }}
    />
  );
};

export default UserSearchComp;
