import { DrawerClose } from 'src/components/ui/drawer'
import ListsView from './ListsView'

function Lists({ elements, multiple, userSearch, ranking, handleUser }) {
  const link = '/profile'

  if (!ranking)
    return (
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
    <ListsView
      elements={elements}
      userSearch={userSearch}
      multiple={multiple}
      link={link}
      handleUser={handleUser}
    />
  )
}

export default Lists
