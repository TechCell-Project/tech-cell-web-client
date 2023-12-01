import { District, Province, Ward } from './Location';
import { ImageModel } from './Product';

export class UserAccount {
    _id: string | null = null;
    email: string | null = null;
    emailVerified: boolean = false;
    role: string | null = null;
    userName: string | null = null;
    avatar: ImageModel | Blob = new ImageModel();
    avatarPublicId?: string | null = null;
    address: Address[] = new Array<Address>();
    accessToken: string | null = null;
    refreshToken: string | null = null;
    firstName: string | null = null;
    lastName: string | null = null;
    password?: string | null = null;
    block?: {
        isBlocked?: boolean;
        activityLogs?: ActivityLog[];
    };
    createdAt: string | null = null;
    updatedAt: string | null = null;
}

export class Address {
    addressName: string | null = null;
    customerName: string | null = null;
    phoneNumbers: string | null = null;
    provinceLevel: Province | Province[] | null = null;
    districtLevel: District | District[] | null = null;
    wardLevel: Ward | Ward[] | null = null;
    detail: string | null = null;
    isDefault: boolean = false;
}

export class ActivityLog {
    activity: string | null = null;
    activityBy: string | null = null;
    activityReason: string | null = null;
    activityNote: string | null = null;
}
