// import Avatar from '@mui/material/Avatar';
import { DrawerClose } from 'src/components/ui/drawer'
import { Skeleton } from 'src/components/ui/skeleton'
import RankingListsTitle from 'src/pages/search/searchList/searchListViews/searchListViewsTitle/RankingListsTitle'
import ListsView from './ListsView'

function Lists({ elements, multiple, userSearch, ranking, handleUser }) {
  const link = '/profile'
  return (
    <div>
      {ranking && (
        <div>
          <RankingListsTitle multiple={multiple} />
          {elements.length ? (
            <ListsView
              elements={elements}
              userSearch={userSearch}
              multiple={multiple}
              link={link}
              handleUser={handleUser}
            />
          ) : (
            <Skeleton className="w-full h-[85px] bg-light-2 dark:bg-dark-2 rounded" />
          )}
        </div>
      )}
      {!ranking && (
        <DrawerClose>
          <ListsView
            elements={elements}
            userSearch={userSearch}
            multiple={multiple}
            link={link}
            handleUser={handleUser}
          />
        </DrawerClose>
      )}
    </div>
  )
}

export default Lists
