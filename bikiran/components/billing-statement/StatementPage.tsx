"use client";
import React, { FC, useState } from "react";
import StatementProvider, {
  useStatementInfo,
} from "./context/StatementProvider";
import StatementHeaderComp from "./StatementHeaderComp";
import { useRouter } from "next/navigation";
import Image from "next/image";
import notFoundImage from "@/public/assets/images/not-found.svg";
import { Button } from "@bikiran/button";
import CustomerBalanceComp from "./CustomerBalanceComp";
import UsefulButtonComp from "./UsefulButtonComp";
import StatementInformationColumn from "./StatementInformationColumn";
import PdfWrapper from "@/bik-lib/features/pdf-wrapper/PdfWrapper";
import ModalFilterByCustomer from "./modals/ModalFilterByCustomer";

const PageBody: FC<{
  selectedComponent: any;
}> = ({ selectedComponent }) => {
  const { statement, loading } = useStatementInfo();
  const router = useRouter();

  if (statement?.transactions?.length === 0 && !loading) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="mb-40">
          <Image
            alt="No invoice selected"
            src={notFoundImage}
            width={0}
            height={0}
          />
          <div className="flex justify-center items-center">
            <h3 className="text-primary text-lg font-medium text-center">
              No Statement found
            </h3>
          </div>
          <div className="flex justify-center items-center mt-5">
            <Button
              variant="secondary"
              className="px-3 py-2"
              onClick={() => router.push("/billing/invoice")}
            >
              Back to the list
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="h-auto flex gap-5 ">
      {selectedComponent === "withHPrint" && (
        <PdfWrapper className="hidden print:block">
          <div className="flex-1 max-w-[800px] ">
            <StatementInformationColumn />
          </div>
        </PdfWrapper>
      )}
      {selectedComponent === "withoutHPrint" && (
        <div className="flex-1 max-w-[800px] hidden print:block">
          <StatementInformationColumn />
        </div>
      )}
      <div className="flex-1 max-w-[800px] print:hidden">
        <StatementInformationColumn />
      </div>
      <div className="w-[300px] xl:w-[350px] flex flex-col gap-5 print:hidden">
        <div className="invoice-action-cont">
          <UsefulButtonComp disabled={loading} />
        </div>
        <div className="invoice-action-cont">
          <CustomerBalanceComp data={statement} loading={loading} />
        </div>
      </div>
    </section>
  );
};

const StatementPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const [selectedComponent, setSelectedComponent] = useState<
    "withHPrint" | "withoutHPrint" | null
  >(null);

  const handlePrint = (component: "withHPrint" | "withoutHPrint") => {
    setSelectedComponent(component);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <StatementProvider query={query}>
      <section>
        <StatementHeaderComp handlePrint={handlePrint} />
      </section>
      <section>
        <PageBody selectedComponent={selectedComponent} />
      </section>

      {/* Modal */}
      <ModalFilterByCustomer />
    </StatementProvider>
  );
};

export default StatementPage;
