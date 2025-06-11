import { FC } from "react";
import { guidelines } from "./projectInvitationConstants";
import { TProjectInvGuideline } from "./projectInvitationTypes";

const InvitationGuidelineComp: FC = () => {
  return (
    <div className="w-full  border border-[#D0CFD9] rounded-20 py-4 pl-2.5">
      <ul className="list-decimal pl-4 max-h-[546px] overflow-auto scroll-hover">
        {guidelines.map((item: TProjectInvGuideline) => (
          <li key={item.id} className="mb-3">
            <h3 className="text-primary font-medium leading-5 mb-1.5">
              {item.title}
            </h3>{" "}
            {item.description.map((desc: string) => (
              <p
                key={desc}
                className="text-primary-700 text-sm font-normal leading-5 mb-2.5 last:mb-0"
              >
                • {desc}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvitationGuidelineComp;
