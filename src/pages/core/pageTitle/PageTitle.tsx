
interface Props {
  icon: Element
  title: string;
}

const PageTitle = ({ icon, title }: Props) => {
  return <div className="flex text-2xl p-5 gap-5 items-center">
    {icon}
    {title}
  </div>;
};

export default PageTitle;
