import Popups from '../../core/Popups'
import { ContactDrawersContent, ContactDrawersTitle, ContactDrawersTrigger } from './'

const ContactDrawers = ({ userObj }) => {
  return (
    <>
      <Popups
        trigger={<ContactDrawersTrigger />}
        title={<ContactDrawersTitle userObj={userObj} />}
        content={<ContactDrawersContent userObj={userObj} />}
      />
    </>
  )
}

export default ContactDrawers
