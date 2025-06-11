export class AuthData {
  id: number;
  type: string;
  name: string;
  organization: string;
  nickName: string;
  username: string;
  primaryEmailId: number;
  primaryPhoneId: number;
  primaryAddressId: number;
  gender: string;
  dob: number;
  photoUrl: string;
  note: string;
  suspensionReason: string;
  status: string;
  companyId: number;
  creatorId: number;
  ip: string;
  timeCreated: number;
  timeUpdated: number;

  constructor(data: any) {
    this.id = data.sl;
    this.type = data.type;
    this.name = data.name;
    this.organization = data.organization || "";
    this.nickName = data.nick_name;
    this.username = data.username;
    this.primaryEmailId = data.primary_email;
    this.primaryPhoneId = data.primary_phone;
    this.primaryAddressId = data.primary_address;
    this.gender = data.gender;
    this.dob = data.dob;
    this.photoUrl = data.photo_url;
    this.note = data.note || "";
    this.suspensionReason = data.suspension_reason || "";
    this.status = data.status;
    this.companyId = data.company_sl;
    this.creatorId = data.creator;
    this.ip = data.ip_long;
    this.timeCreated = data.time_created;
    this.timeUpdated = data.time_updated;
    return this;
  }
}
