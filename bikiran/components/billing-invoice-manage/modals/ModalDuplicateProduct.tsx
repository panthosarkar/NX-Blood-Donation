import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { cn } from "@/bik-lib/utils/cn";
import { Button } from "@bikiran/button";
import { Checkbox } from "../../ui/checkbox";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useApi from "@/bik-lib/utils/useApi";

const OPTIONS = ["Address", "Products"];

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string[]>(OPTIONS);

  const { put } = useApi();
  const { setMessage, closeModal } = useTemplate();

  const { id } = useParams();
  const router = useRouter();

  const handleDuplicate = () => {
    setLoading(true);
    setMessage("Duplicating invoice...");
    put(`/admin/invoice/${id as string}/duplicate`, { types: selectedOption })
      .then(({ message, data }) => {
        setMessage(message);
        closeModal();
        // reload();
        router.push(`/billing/invoice/${data?.newInvoiceId}/update`);
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const selectOption = (option: string) => {
    setSelectedOption((prev: string[]) => {
      if (prev.indexOf(option) === -1) {
        return [...prev, option];
      }
      return prev.filter((item) => item !== option);
    });
  };

  return (
    <div className="space-y-4">
      {OPTIONS.map((option: string) => {
        const isSelected = selectedOption.indexOf(option) !== -1;
        return (
          <div
            key={option}
            className={cn(
              "flex gap-3 items-center cursor-pointer border border-primary-300 rounded-10 py-2 px-2.5",
              {
                "bg-secondary-50 border-secondary-500": isSelected,
              }
            )}
            onClick={() => selectOption(option)}
          >
            <Checkbox
              className={`border-primary ring-0 data-[state=checked]:border-secondary  data-[state=checked]:bg-secondary data-[state=checked]:text-white`}
              checked={isSelected || false}
            />
            {option}
          </div>
        );
      })}

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-28 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-28 h-10"
          loading={loading}
          onClick={handleDuplicate}
        >
          Duplicate
        </Button>
      </div>
    </div>
  );
};

const ModalDuplicateProduct = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "duplicate-product"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Duplicate Invoice</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDuplicateProduct;
