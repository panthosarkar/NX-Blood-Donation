import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center px-5 sm:px-0">
      <div className="flex flex-col gap-6">
        <div>
          <div className="w-60 sm:w-94 mb-2.5">
            <Image
              src="https://files.bikiran.com/assets/images/opps-text.svg"
              alt="Oops"
              width={0}
              height={0}
              className="w-full h-auto"
            />
          </div>
          <h1 className="text-sm sm:text-lg text-primary-700 font-normal">
            The link you are using to reach this page is Broken!!
          </h1>
        </div>

        <div>
          <Link
            href="/"
            className="text-sm sm:text-base py-2 px-4 bg-secondary rounded-5 cursor-pointer text-white w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
