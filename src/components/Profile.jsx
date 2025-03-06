import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";

export const Profile = () => {
  const user = useSelector((state) => state.user)?.data;
  const userData =  {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photoUrl: user?.photoUrl || "",
    age: user?.age || "",
    gender: user?.gender || "",
    skills: user?.skills || "",
    about: user?.about || "",
  };

  return (
    <EditProfile user={userData} />
  );
};