import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'src/components/ui/input-otp';

function AuthPassword({ userObj, numberString, handleNumberString }) {
  // const [numberString, setNumberString] = useState('')
  // const [createdNumber, setCreatedNumber] = useState('')
  // const [mailSent, setMailSent] = useState(false)
  // const dispatch = useDispatch()
  // const handleNumberString = (event) => {
  //   const {
  //     target: { value }
  //   } = event
  //   setNumberString(value)
  // }
  // const sendMail = async () => {
  //   let number = Math.floor(Math.random() * 1000000).toString()
  //   for (let index = 0; 6 - number.length; index++) {
  //     number = '0' + number
  //   }
  //   setCreatedNumber(number)
  //   setMailSent(true)
  //   await fetch('https://service-ceni.onrender.com/mail', {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title: userObj?.email,
  //       author: number
  //     })
  //   })
  //   console.log('sending')
  // }
  // const confirmNumber = async () => {
  //   if (numberString === createdNumber) {
  //     const userDocRef = doc(dbservice, `members/${userObj.uid}`)
  //     await updateDoc(userDocRef, { certificated: true })
  //     dispatch(changeUserCertificated(true))
  //   } else {
  //     alert('번호를 확인해주세요.')
  //   }
  // }
  return (
    <>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={handleNumberString} value={numberString}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </>
  )
}

export default AuthPassword
