import { DrawerClose } from 'src/components/ui/drawer'
import { Skeleton } from 'src/components/ui/skeleton'
import ListsView from './ListsView'

function Lists({ elements, multiple, userSearch, ranking, handleUser }) {
  const link = '/profile'
  if (!ranking) return (
    <DrawerClose>
      <ListsView
        elements={elements}
        userSearch={userSearch}
        multiple={multiple}
        link={link}
        handleUser={handleUser}
      />
    </DrawerClose>
  )
  return (
    <div>
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
  )
}

export default Lists
