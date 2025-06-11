import { BUCKET_NAME } from "@/config/Bucket.Config";
import { Storage } from "@google-cloud/storage";
import { env } from "process";

// GCS_BUCKET_NAME = "media-files-ads";
// GCS_PROJECT_ID = "bikiran-app";
// GCS_PRIVATE_KEY_ID = "c6cc53b2e74a88bcc45f12a12d592b90406b4e0d";
// GCS_PRIVATE_KEY = "";
// GCS_CLIENT_EMAIL = "media-files-ads@bikiran-app.iam.gserviceaccount.com";
// GCS_CLIENT_ID = "115297158077790500191";

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    type: "service_account",
    project_id: env.GOOGLE_CLOUD_PROJECT_ID,
    private_key_id: env.GCS_PRIVATE_KEY_ID,
    private_key: env.GCS_PRIVATE_KEY,
    client_email: env.GCS_CLIENT_EMAIL,
    client_id: env.GCS_CLIENT_ID,
  },
});

const bucket = storage.bucket(BUCKET_NAME);

export { bucket };
