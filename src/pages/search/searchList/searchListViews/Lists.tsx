// import Avatar from '@mui/material/Avatar';
import { DrawerClose } from 'src/components/ui/drawer'
import RankingListsTitle from 'src/pages/search/searchList/searchListViews/searchListViewsTitle/RankingListsTitle'
import ListsView from './ListsView'


function Lists({
  userObj,
  elements,
  multiple,
  userSearch,
  ranking,
  handleUser,
}) {
  let link
  if (location.pathname === '/profile') {
    link = '/profile'
  }
  if (location.pathname === '/ranking') {
    link = '/profile'
  }
  return (
    <div>
      {ranking && (
        <div>
          <RankingListsTitle multiple={multiple} />
          <ListsView userObj={userObj} elements={elements} userSearch={userSearch} multiple={multiple} link={link} handleUser={handleUser} />
        </div>
      )}
      {!ranking && (
        <DrawerClose>
          <ListsView userObj={userObj} elements={elements} userSearch={userSearch} multiple={multiple} link={link} handleUser={handleUser} />
        </DrawerClose>
      )}
    </div>
  )
}

export default Lists
