import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { deleteUser } from "firebase/auth";
import {
  deleteDoc,
  doc
} from "firebase/firestore";
import { useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import {
  dbservice
} from "src/baseApi/serverbase";

const ProfileMembersPasswordContent = ({ userObj, user }) => {
  const [password, setPassword] = useState({
    newPassword: '',
    newPasswordConfirm: ''
  })
  const navigate = useNavigate();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'newPassword') {
      setPassword({ newPassword: value, ...password });
    } else {
      setPassword({ newPasswordConfirm: value, ...password });
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
  // useEffect(() => {
  //   const createdCards = user.userData?.createdCards
  //   const connectedCards = user.userData?.connectedCards
  //   const createdNumber = createdCards?.length || 0
  //   const connectedNumber = connectedCards?.length || 0
  //   if (
  //     createdNumber === 0 &&
  //     connectedNumber === 0
  //   ) {
  //     setProcess(true);
  //   } else {
  //     setProcess(false)
  //   }
  // }, [user]);
  return (
    <div>
      <div className='pt-5'>
        <div>
          새 비밀번호를 등록해 주세요.
        </div>
      </div>
      <div className="flex flex-col justify-center p-5 gap-5">
        <TextField type='password' name='newPassword' label="새 비밀번호" onChange={onChange} />
        <TextField type='password' name='newPasswordConfirm' label="새 비밀번호 확인" onChange={onChange} />
        {password.newPassword && password.newPassword === password.newPasswordConfirm ? (
          <Button variant="outlined" onClick={delist}>
            비밀번호 변경
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            비밀번호 변경
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileMembersPasswordContent;
