import { User } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { dbservice, storage } from "src/baseApi/serverbase";
import Lists from "src/pages/search/searchList/searchListViews/Lists";

interface Props {
  userObj: User;
  userSearch: string;
}
function RankingLists({ userObj, userSearch }: Props) {
  const [rank, setRank] = useState([]);
  const [ranker, setRanker] = useState([]);
  const [loadedImage, setLoadedImage] = useState([]);
  const [continuing, setContinuing] = useState(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const membersList = async () => {
      const collectionQuery = query(
        collection(dbservice, "members"),
        orderBy("points", "desc"),
        limit(20),
        startAfter(continuing ? continuing : ""),
      );
      const docs = await getDocs(collectionQuery);
      const newArray = docs.docs.map((document, index) => {
        getDownloadURL(ref(storage, `${document.data()?.uid}`))
          .then((url) => {
            setLoadedImage([...loadedImage, { url: url, index: index }]);
          })
          .catch((error) => {
            console.log(error);
          });
        if (index + 1 === 10) {
          setContinuing(document);
        }
        return {
          ...document.data(),
        };
      });
      setRank([...rank, ...newArray]);
      newArray.map((document, index) => {
        if (document.uid === userObj.uid) {
          newArray[index].rank = index + 1;
          setRanker([newArray[index]]);
        }
      });
    };
    membersList();
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
  }, [scroll]);

  const scrolls = document.addEventListener("scrollend", () => {
    setScroll(!scroll);
    // setContinuing()
    console.log("samples");
    console.log(continuing);
  });
  return (
    <>
      {userSearch ? (
        <div>
          <Lists
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
            elements={ranker}
            multiple={false}
            userSearch={null}
            ranking={true}
            handleUser={null}
          />
          <Lists
            elements={rank}
            multiple={true}
            userSearch={null}
            ranking={true}
            handleUser={null}
          />
        </div>
      )}
    </>
  );
}

export default RankingLists;
