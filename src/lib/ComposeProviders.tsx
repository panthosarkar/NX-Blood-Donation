import React, { ReactNode, ComponentType } from "react";

interface IComposeProvidersProps {
  components?: ComponentType<{ children: ReactNode }>[];
  children: ReactNode;
}

const ComposeProviders: React.FC<IComposeProvidersProps> = ({ components = [], children }) => {
  return components.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, children);
};

export default ComposeProviders;
