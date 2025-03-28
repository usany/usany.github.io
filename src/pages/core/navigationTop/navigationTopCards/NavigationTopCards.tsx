import Divider from "@mui/material/Divider";
import { CreditCard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  cardOff,
  cardOn
} from "src/stateSlices/cardAccordionSlice";

const NavigationTopCards = () => {
  const cardAccordion = useSelector((state) => state.cardAccordion.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-16 h-[45px] pt-3">
        {cardAccordion ? (
          <CreditCard
            color="#2196f3"
            onClick={() =>
              dispatch(cardOff())
            }
          />
        ) : (
          <CreditCard onClick={() => dispatch(cardOn())} />
        )}
      </div>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: cardAccordion && "#2196f3",
        }}
      />
    </div>
  );
};

export default NavigationTopCards;
