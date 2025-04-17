import { Card } from "@mui/material";
import useCardsBackground from "src/hooks/useCardsBackground";
import { useSelectors } from "src/hooks/useSelectors";

const ProfileMembersDrawersTrigger = () => {
  const { color } = useCardsBackground()
  const languages = useSelectors((state) => state.languages.value)

  return (
    <Card sx={{ width: "100%", bgcolor: color }}>
      <div
        className="flex justify-center p-5"
      >
        {languages === 'ko' ?
          '회원 탈퇴'
          :
          'Delete Account'
        }
      </div>
    </Card>
  );
};

export default ProfileMembersDrawersTrigger;
