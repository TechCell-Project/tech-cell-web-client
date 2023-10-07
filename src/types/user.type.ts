export type User = {
    _id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: Address[];
    role: string;
    accessToken: string;
    refreshToken: string;
};

type Address = {
    provinceLevel: string;
    districtLevel: string;
    wardLevel: string;
    detail: string;
};
