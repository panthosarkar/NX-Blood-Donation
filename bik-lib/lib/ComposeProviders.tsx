import React, { ReactNode, ComponentType } from "react";

interface ComposeProvidersProps {
  components?: ComponentType<{ children: ReactNode }>[];
  children: ReactNode;
}

const ComposeProviders: React.FC<ComposeProvidersProps> = ({
  components = [],
  children,
}) => {
  return components.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, children);
};

export default ComposeProviders;
