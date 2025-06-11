import { useTemplate } from "../template/TemplateProvider";

type TFunction = (...args: any[]) => any;

const catchAsync = (func: TFunction) => {
  const { setMessage } = useTemplate();

  return (...args: any[]) => {
    Promise.resolve(func(...args)).catch((err: Error) => {
      setMessage(err.message);
    });
  };
};

export default catchAsync;
