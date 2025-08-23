import type { User } from "firebase/auth";
import { useSelectors } from "src/hooks/useSelectors";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import Accordions from "./Accordions/Accordions";
import useContextMenu from "./useContextMenu";
import useGetToken from "./useGetToken";
import useSetProfile from "./useSetProfile";

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
interface Props {
	userObj: User;
}

const titles = {
	ko: "내 상태",
	en: "My Status",
};

function Menu({ userObj }: Props) {
	const languages = useSelectors((state) => state.languages.value);
	const index = languages === "ko" || languages === "en" ? languages : "ko";
	useSetProfile(userObj);
	useGetToken(userObj);
	useContextMenu();
	// const [img, setImg] = useState(null)
	// const uploadImages = async () => {
	//   const { data, error } = await supabase.storage
	//     .from('remake')
	//     .upload('publicImages.png', staticImg)
	//   if (data) {
	//     console.log(data)
	//   }
	//   if (error) {
	//     console.log(error)
	//   }
	// }
	// const downloadImages = async () => {
	//   const { data, error } = await supabase.storage
	//     .from('remake')
	//     .getPublicUrl('publicImages.png')
	//   if (data) {
	//     setImg(data.publicUrl)
	//     console.log(data)
	//   }
	//   if (error) {
	//     console.log(error)
	//   }
	// }
	return (
		<div className="flex justify-center flex-col pb-5">
			<PageTitle title={titles[index]} />
			<Accordions userObj={userObj} />
		</div>
	);
}

export default Menu;
