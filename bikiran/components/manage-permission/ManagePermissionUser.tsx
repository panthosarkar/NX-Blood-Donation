import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { icons } from "@/bikiran/lib/icons";
import Image from "next/image";
import { FC } from "react";
import { TProjectPermissionItem } from "./dummydata";
import { PendingTag } from "./ManagePermissionActionComp";

const ManagePermissionUser: FC<{ data: TProjectPermissionItem }> = ({ data }) => {
    const { displayName, email } = data.user || {};
    // const isCurrentUser = authInfo.currentUser.email === email;

    const isActive = data.status === "active";
    const showStatus = ["active", "inactive"].indexOf(data.status) !== -1;

    return (
        <div className="flex items-start gap-[15px] mt-4 " >
            <div className="size-8 ">
                <Image
                    src={data.user.photoUrl !== "" ? data?.user?.photoUrl : icons.iconUser}
                    alt="avatar"
                    width={25}
                    height={25}
                    className="w-full h-auto rounded-full"
                />
            </div>
            <div>
                <div className="flex items-center gap-[5px]">
                    {/* User information */}
                    {data.user ? (
                        <h4 className="text-primary font-medium text-lg leading-6">
                            {displayName}{" "}
                            {/* {isCurrentUser ? (
                        <span className="text-primary-700 text-sm">(You)</span>
                    ) : null} */}
                        </h4>
                    ) : (
                        <h4 className="text-primary font-medium text-lg leading-6">
                            [New User]
                        </h4>
                    )}
                    {data.status === "hold" ? (
                        <TooltipWrapper content={capitalizeFirstLetter(data.status || "")}>
                            <div className="size-[14px]">
                                <Image
                                    src={icons.iconHold}
                                    alt="hold"
                                    width={0}
                                    height={0}
                                    className="size-full"
                                />
                            </div>
                        </TooltipWrapper>
                    ) : null}
                    {/* Status Icon */}
                    {showStatus ? (
                        <TooltipWrapper content={capitalizeFirstLetter(data.status)}>
                            <div className="size-[14px]">
                                <Image
                                    src={isActive ? icons.iconCheckGreen : icons.iconInactiveRed}
                                    alt="status"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto"
                                />
                            </div>
                        </TooltipWrapper>
                    ) : null}

                    <div className="flex items-center gap-[5px]">
                        <PendingTag show={data.status === "pending"} />
                    </div>
                </div>
                <div>
                    <p className="text-primary-700 text-sm font-normal">{data.email}</p>
                    <p className="text-sm text-[#009CCC] font-normal">{"Permission is assigned only for Accessing PROJECT"}</p>
                </div>
            </div>
        </div>
    );
};
export default ManagePermissionUser;