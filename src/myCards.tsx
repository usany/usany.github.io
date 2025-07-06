import { Button } from "./components/ui/button";
import React from "react";

interface CardingsProps {
  cards: React.ReactNode;
  shadowColor: string;
}

const Cardings = ({ cards, shadowColor }: CardingsProps) => {
  const handleSubmit = () => {
    console.log("Card submitted!");
    // Add your submit logic here
    // For example: API call, form validation, etc.
  };

  return (
    <div className={`w-[200px] h-[280px] rounded-lg bg-light-2 dark:bg-dark-2 hover:bg-light-1 shadow-md shadow-[${shadowColor}]`}>
      <div className='p-3'>
        {cards}
        <Button 
          className="mt-4 w-full" 
          onClick={handleSubmit}
          variant="default"
        >
          Submit
        </Button>
      </div>
    </div >
  )
}

export default Cardings
