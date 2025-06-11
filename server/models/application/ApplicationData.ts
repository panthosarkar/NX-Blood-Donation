interface IApplicationData {
  id: number;
  name: string;
  appKey: string;
  description: string;
  website: string;
  logo: string;
  status: string;
}

export const getApplications = (applicationData: any) => {
  return applicationData.map((app: any): IApplicationData => {
    return {
      id: app.id,
      name: app.name,
      appKey: app.appKey,
      description: app.description,
      website: app.website,
      logo: app.logo,
      status: app.status,
    };
  });
};

// export class ApplicationData {
//   obj = {};

//   constructor() {
//     const apps = getApplications();
//     apps.forEach((app) => {
//       this.obj[app.appk] = app;
//     });
//   }
// }
