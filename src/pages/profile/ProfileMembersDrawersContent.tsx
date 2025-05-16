import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { deleteUser } from "firebase/auth";
import {
  deleteDoc,
  doc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import {
  dbservice
} from "src/baseApi/serverbase";

const ProfileMembersDrawersContent = ({ userObj, user }) => {
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [process, setProcess] = useState(false);
  const navigate = useNavigate();
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value === userObj.email) {
      setConfirmEmail(true);
    } else {
      setConfirmEmail(false);
    }
  };
  const delist = async () => {
    await deleteDoc(doc(dbservice, `members/${userObj.uid}`));
    deleteUser(user)
      .then(() => {
        console.log(user);
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
    navigate("/");
  };
  useEffect(() => {
    const createdCards = user.userData?.createdCards
    const connectedCards = user.userData?.connectedCards
    const createdNumber = createdCards?.length || 0
    const connectedNumber = connectedCards?.length || 0
    if (
      createdNumber === 0 &&
      connectedNumber === 0
    ) {
      setProcess(true);
    } else {
      setProcess(false)
    }
  }, [user]);

  return (
    <div>
      <div className='pt-5'>
        <div>
          진행 중인 빌리기, 빌려주기가 없어야 회원 탈퇴를 할 수 있습니다.
        </div>
        {process ? (
          <div className='flex justify-center'>
            <Chip label={'진행 카드가 없습니다'} sx={{ bgcolor: '#7fc4bc', color: 'white' }} />
            {/* <Chips label={'진행 카드가 없습니다'} className='bg-profile-blue' /> */}
          </div>
        ) : (
          <div className='flex justify-center'>
            <Chip label={'진행 카드가 있습니다'} sx={{
              bgcolor: '#e76e50', color: 'white'
            }} />
            {/* <Chips label={'진행 카드가 있습니다'} className='bg-profile-red' /> */}
          </div>
        )}
        <div>정말로 회원 탈퇴를 하시려면 이메일을 입력해 주세요</div>
      </div>
      <div className="flex flex-col justify-center p-5 gap-5">
        <TextField label="이메일" onChange={onChange} />
        {process && confirmEmail ? (
          <Button variant="outlined" onClick={delist}>
            회원 탈퇴
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            회원 탈퇴
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileMembersDrawersContent;
