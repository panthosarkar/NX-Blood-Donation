import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import UserPopover from "@/src/shared/user-search/UserPopover";
import { ApiSearchUser } from "@/src/shared/user-search/UserSearchOperation";
import { TUser } from "@/src/shared/user-search/UserSearchType";
import { InputField } from "@src/inputs";
import { Loader2 } from "lucide-react";
import React, { FC, useEffect, useRef, useState } from "react";

type TProps = {
  selectedUser: TUser;
  setSelectedUser: (user: TUser) => void;
};

const FilterUser: FC<TProps> = ({ selectedUser, setSelectedUser }) => {
  const { authInfo, chkLoginReq } = useAuth2();
  const [formData, setFormData] = useState<any>({});
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

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
              setShow(true);
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
      }
    }, 800); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout); // Cleanup on input or component unmount
  }, [debouncedValue, authInfo, chkLoginReq]);

  useEffect(() => {
    // outside click
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the clicked target is outside the referenced element
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        debouncedValue.length < 4
      ) {
        setShow(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [debouncedValue]);

  // clear user data when user input is less than 3 characters
  useEffect(() => {
    if (formData?.user?.length < 3 && !show) {
      setUserData([]);
    }
  }, [formData, show]);

  return (
    <div ref={ref}>
      <div className="relative">
        <InputField
          formData={formData}
          label={"User"}
          name="user"
          placeholder="Type minimum 3 character.."
          autoComplete="off"
          onChange={handleOnChange}
          onFocus={() => setShow(true)}
          parentClassName="filter-parent-class"
          className="!h-[35px] !text-sm"
        />
        {loading && (
          <div className="absolute right-0 top-0 h-full flex items-center pr-3">
            <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
          </div>
        )}

        <div
          className="absolute w-[500px]"
          style={{ top: "50px", zIndex: 1000, right: "0" }}
        >
          <UserPopover
            data={userData}
            show={show && userData.length > 0}
            setSelectedUser={setSelectedUser}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterUser;
