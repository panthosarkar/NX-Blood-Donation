export interface ICurrencyConfContext {
  data: TCurrencyConfData[] | null | undefined;
  loading: boolean;
  reload: () => void;
  status  : string[];
}

export type TCurrencyConfData = {
  id: number;
  title: string;
  currency: string;
  rate: number;
  status: string;
  creator: number;
  timeCreated: number;
  timeUpdated: number;
};
