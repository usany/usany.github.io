import { useTexts } from "src/hooks";

const ProfileMembersDrawersTitle = ({isPassword}) => {
  const { changePassword, deleteAccount } = useTexts()
  return (
    <div>{isPassword ? changePassword : deleteAccount}</div>
  );
};

export default ProfileMembersDrawersTitle;
