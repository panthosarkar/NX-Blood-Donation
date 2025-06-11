export type TActivityAdmin = {
    id: number;
    displayName: string;
    email: string;
    phone: string;
    photoUrl: string;
    userProfile: any | null;
    primaryIds: number[];
    primaryProjectId: number;
}

export type TAdminActivityLogs = {
    id: number;
    projectId: number;
    subscriptionId: number;
    assetKey: string;
    assetId: number;
    activityKey: string;
    title: string;
    description: string;
    weight: 'low' | 'medium' | 'high';
    timeCreated: number;
    user: TActivityAdmin;
}
