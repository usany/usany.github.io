import { useState, useEffect, useLayoutEffect } from "react";
import {
  auth,
  onSocialClick,
  dbservice,
  storage,
} from "src/baseApi/serverbase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  limit,
  startAfter,
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
import RankingListsTitle from "src/pages/search/searchList/searchListViews/searchListViewsTitle/RankingListsTitle";
import RankingSearch from "src/pages/search/searchBar/RankingSearch";
import Lists from "src/pages/search/searchList/searchListViews/Lists";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { User } from "firebase/auth";

interface Props {
  userObj: User;
  userSearch: string;
}
function RankingLists({ userObj, userSearch }: Props) {
  const [rank, setRank] = useState([]);
  const [ranker, setRanker] = useState([]);
  const [loadedImage, setLoadedImage] = useState([]);
  const [continuing, setContinuing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scroll, setScroll] = useState(false);
  const scrollNumber = 20;
  useEffect(() => {
    const membersList = async () => {
      const collectionQuery = query(
        collection(dbservice, "members"),
        orderBy("points", "desc"),
        limit(scrollNumber),
        startAfter(continuing ? continuing : "")
      );
      const docs = await getDocs(collectionQuery);
      const newArray = docs.docs.map((document, index) => {
        console.log(rank.indexOf(document));
        if (rank.indexOf(document) === -1) {
          getDownloadURL(ref(storage, `${document.data()?.uid}`))
            .then((url) => {
              setLoadedImage([...loadedImage, { url: url, index: index }]);
            })
            .catch((error) => {
              console.log(error);
            });
          if (index + 1 === docs.docs.length) {
            setContinuing(document);
          }
          return {
            ...document.data(),
          };
        }
      });
      setRank([...rank, ...newArray]);
      if (ranker.length === 0) {
        const docRef = doc(dbservice, `members/${userObj.uid}`)
        const myDocSnap = await getDoc(docRef)
        const myDocSnapData = myDocSnap.data()
        console.log(myDocSnapData)
        newArray.map((document, index) => {
          if (document.uid === userObj.uid) {
            console.log(document?.ranking)
            newArray[index].rank = index + 1;
          }
        });
        setRanker([myDocSnapData]);
      }
      setIsLoading(false);
    };
    if (isLoading || rank.length === 0) {
      membersList();
    }
    // onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc'), limit(10), startAfter(continuing: continuing : '')), (snapshot) => {
    //   const newArray = snapshot.docs.map((document, index) => {
    //     getDownloadURL(ref(storage, `${document.data()?.uid}`))
    //     .then((url) => {
    //       setLoadedImage([...loadedImage, {url: url, index: index}])
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     });
    //     return ({
    //       ...document.data(),
    //     })
    //   });
    //   setRank(newArray)
    //   newArray.map((document, index) => {
    //     if (document.uid === userObj.uid) {
    //       newArray[index].rank = index+1
    //       setRanker([newArray[index]])
    //     }
    //     if (index+1 === 5) {
    //       setContinuing(snapshot)
    //     }
    //   })
    // })
    // if (continuing) {
    // } else {

    // }
  }, [isLoading]);
  const handleScroll = () => {
    if (
      window.innerHeight + Math.round(document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      console.log(document.documentElement.offsetHeight);
      return;
    } else {
      console.log("scroll");
      setIsLoading(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  // const scrolls = document.addEventListener('scrollend', () => {
  //   console.log('samples')
  //   console.log(continuing)
  // })
  return (
    <>
      {userSearch ? (
        <div>
          <Lists
          userObj={userObj}
            elements={rank}
            multiple={true}
            userSearch={userSearch}
            ranking={true}
            handleUser={null}
          />
        </div>
      ) : (
        <div>
          <Lists
          userObj={userObj}
            elements={ranker}
            multiple={false}
            userSearch={null}
            ranking={true}
            handleUser={null}
          />
          <Lists
          userObj={userObj}
            elements={rank}
            multiple={true}
            userSearch={null}
            ranking={true}
            handleUser={null}
          />
          {!isLoading && <div className="p-28"></div>}
          {isLoading && (
            <div className="flex justify-center text-2xl p-28">loading</div>
          )}
          {/* {isLoading && <div className='flex justify-center text-2xl pb-36'>loading</div>} */}
        </div>
      )}
    </>
  );
}

export default RankingLists;
