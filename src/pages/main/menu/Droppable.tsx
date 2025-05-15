import { useDroppable } from '@dnd-kit/core';

function Droppable(props) {
  const { isOver, over, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  // console.log(isOver)
  // console.log(over)
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable
