import { FC, ReactNode } from "react";
import invoiceHeader from "@/public/assets/images/pricing-header.png";
import invoiceFooter from "@/public/assets/images/pricing-footer.png";
import Image from "next/image";

type Props = {
  pdfHeader?: string;
  pdfFooter?: any;
  children: ReactNode;
  className?: string;
};

const Wrapper: FC<Props> = ({ children, pdfHeader, pdfFooter, className }) => {
  return (
    <div
      className={`w-[800px] h-full mx-auto flex items-center justify-center print:items-start print:w-full print:h-screen px-0 print:px-16 bg-white ${className}`}
    >
      {/* Fixed Header for Print */}
      {/* <div className="w-full fixed top-0 left-0 z-[999999] px-0 hidden print:block print:px-10">
        <Image
          src={pdfHeader || invoiceHeader}
          alt="invoiceHeader"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
        />
      </div> */}

      <table className="w-full table-fixed">
        <thead className="break-inside-avoid table-header-group">
          <tr>
            <th className=" print:table-cell !h-[120px] px-5 print:px-0">
              <Image
                src={pdfHeader || invoiceHeader}
                alt="invoiceHeader"
                sizes="100vw"
                priority
                className="w-full h-auto"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{children}</td>
          </tr>
        </tbody>
        <tfoot className="break-inside-avoid table-footer-group">
          <tr>
            <td style={{ height: "120px" }}>
              <Image
                src={invoiceFooter}
                alt="invoiceFooter"
                priority
                className="w-full h-auto block print:hidden"
              />
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Fixed Footer for Print */}
      <div className="w-full fixed bottom-0 left-0 z-[999999] hidden print:block">
        <Image
          src={pdfFooter || invoiceFooter}
          alt="invoiceFooter"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Wrapper;
