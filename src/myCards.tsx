const Cardings = ({ cards, shadowColor }) => {
  return (
    <div className={`w-[200px] h-[280px] rounded-lg bg-light-2 dark:bg-dark-2 hover:bg-light-1 shadow-md shadow-[${shadowColor}]`}>
      <div className='p-3'>
        {cards}
      </div>
    </div >
  )
}

export default Cardings
