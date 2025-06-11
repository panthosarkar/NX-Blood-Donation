import Cors from "@/server/utils/Cors";

var corses: Cors[] = [
  new Cors("/api/data")
    .setMethod("GET")
    .acceptOrigins("*")
    .acceptHeaders("User-Uid,Content-Type,client-time,locale,init-id"),
  new Cors("/api/pricing/domain")
    .setMethod("GET", "POST", "PUT")
    .acceptOrigins("*")
    .acceptHeaders("User-Uid,Content-Type,client-time,locale,init-id"),
];

export default corses;
