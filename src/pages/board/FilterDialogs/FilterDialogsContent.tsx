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
  handleSelectedValues: (newValue: {id: string, value: string}) => void
}
function FilterDialogsContent({ handleSelectedValues }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const selectedLanguage = languages === 'ko' || languages === 'en' ? languages : 'ko'
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
      options: items
    },
    {
      id: 'selectedValueTwo',
      title: locationsTitle,
      selectedValue: selectedValueTwo,
      options: locations
    },
    {
      id: 'selectedValueThree',
      title: timeTitle,
      selectedValue: selectedValueThree,
      options: time
    }
  ]

  return (
    <div className="p-5">
      {selectedValues.map((valueObject) => {
        return (
          <>
            <div className="flex justify-center">{valueObject.title}</div>
            <Select
              defaultValue={valueObject.selectedValue}
              onValueChange={(newValue) =>
                handleSelectedValues({
                  id: valueObject.id,
                  newValue: newValue
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
                  {valueObject.options[selectedLanguage].map((value, index) => {
                    return (
                      <SelectItem key={index} value={valueObject.options['ko'][index]}>
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

    </div>
  )
}

export default FilterDialogsContent
