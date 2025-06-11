
import { DataSource } from "typeorm";
import { Activity } from "@/server/entities/Activity";
import { MediaFiles } from "@/server/entities/MediaFiles";
import { AdsSlot } from "@/server/entities/ads/AdsSlot";
import { AdsSlotMedia } from "@/server/entities/ads/AdsSlotMedia";
import { Application } from "@/server/entities/docs/Application";
import { DocsPage } from "@/server/entities/docs/DocsPage";
import { DocsContent } from "@/server/entities/docs/DocsContent";
import { DomainPricing } from "@/server/entities/admin/DomainPricing";
import { getDBConnectionString } from "@/bik-lib/utils/Env";

const AppDataSource = new DataSource({
  type: "postgres",
  url: getDBConnectionString(),
  synchronize: false,
  logging: false,
  entities: [
    // Global entities
    Activity,
    MediaFiles,
    // Ads entities
    AdsSlot,
    AdsSlotMedia,
    Application,
    // Docs entities
    DocsPage,
    DocsContent,
    // Domain entities
    DomainPricing,
  ],
  migrations: [],
});

const DbConfig = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    return AppDataSource;
  } catch (ex: any) {
    throw ex;
  }
};

export default DbConfig;
