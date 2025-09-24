import { Card } from "@mui/material";
import useCardsBackground from "src/hooks/useCardsBackground";
import { useSelectors, useTexts } from "src/hooks";

interface Props {
  isPassword: boolean
}
const ProfileMembersDrawersTrigger = ({isPassword}: Props) => {
  const { colorTwo } = useCardsBackground()
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
