import { useTexts } from "src/hooks";

const ProfileMembersDrawersTitle = () => {
  const { deleteAccount } = useTexts()
  return (
    <div>{deleteAccount}</div>
  );
};

export default ProfileMembersDrawersTitle;
