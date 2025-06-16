import { User } from "firebase/auth";
// import { useKeyboardOffset } from 'virtual-keyboard-offset';

interface Props {
  userObj: User
}
function PiazzaCalls({ userObj }: Props) {

  return (
    <div id='myStream'>
      <video id='myFace' width="320" height="240" controls autoPlay>
      </video>
    </div >
  );
}

export default PiazzaCalls;
