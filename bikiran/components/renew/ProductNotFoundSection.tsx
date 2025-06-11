import { FC } from "react";
import { Button } from "@bikiran/button";
import Link from "next/link";
import InfoWrapper from "@/bik-lib/features/info-wrapper/InfoWrapper";

const ProductNotFoundSection: FC = () => {
  return (
    <InfoWrapper className="w-full min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-primary text-xl font-medium mb-4">
          Product not found
        </p>
        <Link href="/user/subscriptions">
          <Button variant="secondary" className="px-5 py-2.5">
            Back to list
          </Button>
        </Link>
      </div>
    </InfoWrapper>
  );
};

export default ProductNotFoundSection;
