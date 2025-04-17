
interface Props {
  title: string
}

const AddStepTitle = ({ title }: Props) => {

  return (
    <div className='flex flex-col text-base px-5 pt-5'>
      <div>{title}</div>
    </div>
  )
}

export default AddStepTitle
