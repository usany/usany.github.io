import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import RankingSearch from "src/pages/search/searchBar/RankingSearch";
import RankingLists from "src/pages/search/searchList/RankingLists";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";

interface Props {
  userObj: User;
}
function Ranking({ userObj }: Props) {
  const [userSearch, setUserSearch] = useState("");
  // const [rank, setRank] = useState([])
  // const [ranker, setRanker] = useState([])
  // const [loadedImage, setLoadedImage] = useState([])
  // const [loadedImageIndex, setLoadedImageIndex] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeBottomNavigation(5));
  });

  return (
    <>
      <PageTitle title="유저 랭킹" />
      {/* <div className='px-5 flex flex-col'>
        <TextField label='유저 이름' onChange={onChangeUserSearch}/>
      </div> */}
      <RankingSearch
        changeUserSearch={(newValue: string) => setUserSearch(newValue)}
      />
      {/* {userSearch ?
        <Lists elements={rank} multiple={true} userSearch={userSearch} ranking={true} handleUser={null}/>
      :
        <div>
          <Lists elements={ranker} multiple={false} userSearch={null} ranking={true} handleUser={null}/>
          <Lists elements={rank} multiple={true} userSearch={null} ranking={true} handleUser={null}/>
        </div>
      } */}
      <RankingLists userObj={userObj} userSearch={userSearch} />
    </>
  );
}

export default Ranking;
