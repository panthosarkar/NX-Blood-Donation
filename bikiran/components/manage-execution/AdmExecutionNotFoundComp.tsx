import Image from "next/image";
import notFound from "@/public/assets/images/not-found.png";

const AdmExecutionNotFoundComp = () => {
  return (
    <div className="flex items-center justify-center my-20 md:py-16">
      <div className="flex flex-col justify-center items-center space-y-2.5">
        <div className="w-full max-w-92">
          <Image
            src={notFound}
            alt="Not Found"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-primary text-xl lg:text-2xl font-normal">
          No Execution Found!
        </h2>
      </div>
    </div>
  );
};

export default AdmExecutionNotFoundComp;
