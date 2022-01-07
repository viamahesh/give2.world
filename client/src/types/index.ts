interface UserProfileData {
  email: string;
  firstName: string;
  _id: string;
}

export interface UserProfileInterface {
  data: UserProfileData;
  exp: number;
  iat: number;
}