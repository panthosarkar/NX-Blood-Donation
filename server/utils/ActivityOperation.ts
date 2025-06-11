import { DataSource } from "typeorm";
import { AuthData } from "../auth/AuthData";
import { generateToken } from "./tokens";
import axios from "axios";
import { Activity } from "../entities/Activity";
import { getAccountUrl } from "@/bik-lib/utils/Env";

interface IResponse {
  error: number;
  message: string;
  data: any;
}

export const AddActivity = async (
  defAppKey: string,
  key: string,
  description: string,
  cuVal: object | null,
  newVal: object | null,
  weight: string,
  creator: number,
  ip: string,
  AppDataSource: DataSource
) => {
  try {
    const activity = new Activity();
    activity.appKey = defAppKey;
    activity.activityKey = key;
    activity.description = description;
    activity.currentValues = JSON.stringify(cuVal);
    activity.newValues = JSON.stringify(newVal);
    activity.weight = weight;
    activity.creator = creator;
    activity.ip = ip;
    await AppDataSource.manager.insert(Activity, activity);
  } catch (ex: any) {
    throw ex;
  }
};

export const AddActivityApi = async (
  auth: AuthData,
  defAppKey: string,
  key: string,
  description: string,
  cuVal: object | null,
  newVal: object | null,
  weight: "normal" | "medium" | "critical",
  creator: number,
  ip: string,
  status: "active" | "inactive" | "deleted" = "active"
) => {
  const addActivityUrl = `${getAccountUrl()}/api/activity`;
  const token = generateToken(auth.id);

  try {
    // If auth is not valid
    if (!auth.id) {
      throw new Error("Invalid User");
    }

    const response = await axios.post<IResponse>(
      addActivityUrl,
      {
        appKey: defAppKey,
        activityKey: key,
        description: description,
        currentValues: cuVal,
        newValues: newVal,
        weight: weight,
        creator: creator,
        ip: ip,
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.data.error !== 0) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (ex: any) {
    throw ex;
  }
};
