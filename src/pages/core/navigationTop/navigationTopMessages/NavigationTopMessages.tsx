import Divider from "@mui/material/Divider";
import { MessageCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelectors } from "src/hooks/useSelectors";
import { messageOff, messageOn } from "src/stateSlices/messageAccordionSlice";

const NavigationTopMessages = () => {
  const messageAccordion = useSelectors((state) => state.messageAccordion.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-16 h-[45px] pt-3">
        {messageAccordion ? (
          <MessageCircle
            color="#2196f3"
            onClick={() => dispatch(messageOff())}
          />
        ) : (
          <MessageCircle
            onClick={() => dispatch(messageOn())}
          />
        )}
      </div>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: messageAccordion && "#2196f3",
        }}
      />
    </div >
  );
};

export default NavigationTopMessages;
