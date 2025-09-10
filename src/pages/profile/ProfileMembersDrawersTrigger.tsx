import { Card } from "@mui/material";
import useCardsBackground from "src/hooks/useCardsBackground";
import { useSelectors, useTexts } from "src/hooks";

const ProfileMembersDrawersTrigger = ({isPassword}) => {
  const { colorTwo } = useCardsBackground()
  const languages = useSelectors((state) => state.languages.value)
  const {changePassword, deleteAccount} = useTexts()
  return (
    <Card sx={{ width: "100%", bgcolor: colorTwo }}>
      <div
        className="flex justify-center p-5"
      >
        {isPassword ? changePassword : deleteAccount}
      </div>
    </Card>
  );
};

export default ProfileMembersDrawersTrigger;
