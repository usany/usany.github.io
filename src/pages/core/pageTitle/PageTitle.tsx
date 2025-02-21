import { useState, useEffect } from "react";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return <div className="flex text-2xl p-5 pt-20">{title}</div>;
};

export default PageTitle;
