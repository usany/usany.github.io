import { useTexts } from "src/hooks";

interface Props {
  isPassword: boolean
}
const ProfileMembersDrawersTitle = ({isPassword}: Props) => {
  const { changePassword, deleteAccount } = useTexts()
  return (
    <div>{isPassword ? changePassword : deleteAccount}</div>
  );
};

export default ProfileMembersDrawersTitle;
