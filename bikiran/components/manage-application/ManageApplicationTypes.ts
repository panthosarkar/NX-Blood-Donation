import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import React from "react";

export interface IAppList {
  id: number;
  title: string;
  uniqueName: string;
  websiteUrl: string;
  logoUrl: string;
  priority: number;
  status: string;
  note: string;
  timeCreated: number;
  timeUpdated: number;
}

export interface IManageApplicationContext {
  appList: IAppList[] | null | undefined;
  reFetch: () => void;
  reFetching: boolean;
}

export interface FormDataType {
  id?: number | null;
  logoUrl?: string | null;
  title?: string;
  uniqueName?: string;
  websiteUrl?: string;
  status?: "active" | "inactive";
  note?: string;
}
