import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import UserPopover from "@/bikiran/shared/user-search/UserPopover";
import { ApiSearchUser } from "@/bikiran/shared/user-search/UserSearchOperation";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { Button } from "@bikiran/button";
import { InputField } from "@bikiran/inputs";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

type TProps = {
  selectedUser: TUser;
  setSelectedUser: (user: TUser) => void;
};

const FilterUser3: FC<TProps> = ({ selectedUser, setSelectedUser }) => {
  const { authInfo, chkLoginReq } = useAuth2();
  const [formData, setFormData] = useState<any>({});
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "user") {
      setDebouncedValue(value); // Update the debounced input value
    }
  };

  useEffect(() => {
    // Clear the search field if a user is selected
    if (selectedUser) {
      setFormData({
        ...formData,
        user: "",
      });
    }
  }, [selectedUser]);

  // get user
  useEffect(() => {
    // Debounce the search input
    const debounceTimeout = setTimeout(() => {
      if (debouncedValue.length > 2) {
        setLoading(true);
        ApiSearchUser(authInfo, chkLoginReq, debouncedValue)
          .then(({ data }) => {
            if (data?.users) {
              setUserData(data.users);
            } else {
              setUserData([]);
            }
          })
          .catch((err: Error) => {
            console.error("Error fetching user data:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUserData([]);
      }
    }, 800); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout); // Cleanup on input or component unmount
  }, [debouncedValue, authInfo, chkLoginReq]);

  if (selectedUser?.id) {
    return (
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <Image
            src={selectedUser.photoUrl}
            alt="user"
            width={0}
            height={0}
            sizes="100vw"
            className="size-7 rounded-full"
          />
          <span>{selectedUser.displayName}</span>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={() => setSelectedUser({} as TUser)}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <InputField
        formData={formData}
        label={""}
        name="user"
        placeholder="Type Name..."
        autoComplete="off"
        onChange={handleOnChange}
        className="!h-[35px]"
      />
      <div className="absolute w-full" style={{ top: "50px", zIndex: 1000 }}>
        <UserPopover
          data={userData}
          show={formData?.["user"]?.length > 2 && userData.length > 0}
          setSelectedUser={setSelectedUser}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FilterUser3;
