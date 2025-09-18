import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'
import locationsBuildings from 'src/pages/add/locationsBuildings'
const items = {
  ko: ['전체 아이템', '우산', '양산'],
  en: ['All items', 'Usan', 'Yangsan'],
}
const locations = {
  ko: ['전체 장소', ...locationsBuildings['ko']],
  en: ['All locations', ...locationsBuildings['en']],
}
const time = {
  ko: ['최신순', '오래된'],
  en: ['Recent', 'Older'],
}
interface Props {
  selectedValues: object
  handleSelectedValues: () => void
}
function FilterDialogsContent({ handleSelectedValues }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const {itemsTitle, locationsTitle, timeTitle} = useTexts()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedValueOne = searchParams.get('selectedValueOne') || '전체 아이템'
  const selectedValueTwo = searchParams.get('selectedValueTwo') || '전체 장소'
  const selectedValueThree = searchParams.get('selectedValueThree') || '최신순'

  const selectedValues = [
    {
      id: 'selectedValueOne',
      title: itemsTitle,
      selectedValue: selectedValueOne,

    },
    {
      id: 'selectedValueTwo',
      title: locationsTitle,
      selectedValue: selectedValueTwo

    },
    {
      id: 'selectedValueThree',
      title: timeTitle,
      selectedValue: selectedValueThree

    }
  ]

  return (
    <div className="p-5">
      {selectedValues.map((value, index) => {
        return (
          <>
            <div className="flex justify-center">{value.title}</div>
            <Select
              defaultValue={value.selectedValue}
              onValueChange={(newValue) =>
                handleSelectedValues({
                  id: value.id,
                  newValue: newValue,
                })
              }
            >
              <SelectTrigger
                className="bg-light-1 dark:bg-dark-1"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-light-1 dark:bg-dark-1">
                <SelectGroup>
                  {items[index].map((value, index) => {
                    return (
                      <SelectItem key={index} value={items['ko'][index]}>
                        {value}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )
      })}
      <div className="flex justify-center">{locationsTitle[index]}</div>
      <Select
        defaultValue={selectedValueTwo || '전체 장소'}
        onValueChange={(newValue) =>
          handleSelectedValues({
            id: 'selectedValueTwo',
            newValue: newValue,
          })
        }
      >
        <SelectTrigger
          className="bg-light-1 dark:bg-dark-1"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-light-1 dark:bg-dark-1">
          <SelectGroup id="location">
            {locations[index].map((value, index) => {
              return (
                <SelectItem key={index} value={locations['ko'][index]}>
                  {value}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-center">{timeTitle[index]}</div>
      <Select
        defaultValue={selectedValueThree || '최신순'}
        onValueChange={(newValue) =>
          handleSelectedValues({
            id: 'selectedValueThree',
            newValue: newValue,
          })
        }
      >
        <SelectTrigger
          className="bg-light-1 dark:bg-dark-1"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-light-1 dark:bg-dark-1">
          <SelectGroup>
            {time[index].map((value, index) => {
              return (
                <SelectItem key={index} value={time['ko'][index]}>
                  {value}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterDialogsContent
