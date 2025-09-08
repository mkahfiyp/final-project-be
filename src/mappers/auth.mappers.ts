import { Role } from "../../prisma/generated/client";
import { TokenPayload } from "google-auth-library";
export const SignInMap = (user: any) => {
  return {
    username: user.username,
    email: user.email,
    role: user.role,
    profile_picture:
      user.role === Role.COMPANY
        ? user.companies?.profile_picture
        : user.profiles?.profile_picture,
  };
};
export const registerGoogleMap = (data: TokenPayload, role: Role) => {
  return {
    name: data.name,
    email: data.email,
    profile_picture: data.picture,
    role: role,
    googleId: data.sub,
  };
};
