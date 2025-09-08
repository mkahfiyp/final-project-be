import { Role, Users } from "../../prisma/generated/client";
import { TokenPayload } from "google-auth-library";

export const SignInMap = (user: Users) => {
  return {
    username: user.username,
    email: user.email,
    role: user.role,
    isVerified: user.isVerfied,
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
