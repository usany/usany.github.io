import Popups from '../../core/Popups'
import ContactDrawersContent from './ContactDrawersContent'
import ContactDrawersTitle from './ContactDrawersTitle'
import ContactDrawersTrigger from './ContactDrawersTrigger'

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
