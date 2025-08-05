import useTexts from "src/useTexts";

const ProfileMembersDrawersTitle = () => {
  const { deleteAccount } = useTexts()
  return (
    <div>{deleteAccount}</div>
  );
};

export default ProfileMembersDrawersTitle;
