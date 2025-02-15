import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Chip } from "@mui/material";

function FilterDialogs({ selectedValues, handleSelectedValues }) {
  const [selected, setSelected] = useState(null);
  const onClick = ({ id }) => {
    setSelected(id);
  };
  console.log(selected === "selectedValueOne");
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="flex gap-1">
            {selectedValues[0].value && (
              <Chip
                label={selectedValues[0].value}
                onClick={() => {
                  onClick({ id: selectedValues[0].id });
                }}
              />
            )}
            {selectedValues[1].value && (
              <Chip
                label={selectedValues[1].value}
                onClick={() => {
                  onClick({ id: selectedValues[1].id });
                }}
              />
            )}
            {selectedValues[2].value && (
              <Chip
                label={selectedValues[2].value}
                onClick={() => {
                  onClick({ id: selectedValues[2].id });
                }}
              />
            )}
          </div>
          {/* <Filter /> */}
        </DrawerTrigger>
        <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2">
          <div className="flex justify-center">우산 / 양산 선택</div>
          <Select
            defaultValue={selectedValues[0].value || "전체 아이템"}
            onValueChange={(newValue) =>
              handleSelectedValues({
                id: "selectedValueOne",
                newValue: newValue,
              })
            }
          >
            <SelectTrigger
              className="bg-light-1 dark:bg-dark-1"
              autoFocus={selected === selectedValues[0].id}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-light-1 dark:bg-dark-1">
              <SelectGroup>
                <SelectItem value="전체 아이템">전체 아이템</SelectItem>
                <SelectItem value="우산">우산</SelectItem>
                <SelectItem value="양산">양산</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex justify-center">장소 선택</div>
          <Select
            defaultValue={selectedValues[1].value || "전체 장소"}
            onValueChange={(newValue) =>
              handleSelectedValues({
                id: "selectedValueTwo",
                newValue: newValue,
              })
            }
          >
            <SelectTrigger
              className="bg-light-1 dark:bg-dark-1"
              autoFocus={selected === selectedValues[1].id}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-light-1 dark:bg-dark-1">
              <SelectGroup id="location">
                <SelectItem value="전체 장소">전체 장소</SelectItem>
                <SelectItem value="중도">중도</SelectItem>
                <SelectItem value="청운">청운</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex justify-center">시간 정렬</div>
          <Select
            defaultValue={selectedValues[2].value || "최신순"}
            onValueChange={(newValue) =>
              handleSelectedValues({
                id: "selectedValueThree",
                newValue: newValue,
              })
            }
          >
            <SelectTrigger
              className="bg-light-1 dark:bg-dark-1"
              autoFocus={selected === selectedValues[2].id}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-light-1 dark:bg-dark-1">
              <SelectGroup>
                <SelectItem value="최신순">최신순</SelectItem>
                <SelectItem value="오래된">오래된</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </DrawerContent>
      </Drawer>
      {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >우산 / 양산 선택
                </InputLabel>
                <Select
                    value={selectedValueOne || '전체'}
                    onChange={changeSelectedValueOne}
                >
                    <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'우산'}>우산</MenuItem>
                    <MenuItem value={'양산'}>양산</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >장소 선택
                </InputLabel>
                <Select
                    value={selectedValueTwo || '전체'}
                    onChange={changeSelectedValueTwo}
                >
                    <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'중도'}>중도</MenuItem>
                    <MenuItem value={'청운'}>청운</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >시간 정렬
                </InputLabel>
                <Select
                    value={selectedValueThree || '최신순'}
                    onChange={changeSelectedValueThree}
                >
                    <MenuItem value={'최신순'}>최신순</MenuItem>
                    <MenuItem value={'오래된'}>오래된</MenuItem>
                </Select>
            </FormControl> */}
      {/* <Dialog open={changeFilter} onClose={handleClose}>
            <DialogContent>
                <div>
                    필터
                </div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >우산 / 양산 선택
                </InputLabel>
                <Select
                    value={selectedValueOne || '전체'}
                    onChange={changeSelectedValueOne}
                >
                    <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'우산'}>우산</MenuItem>
                    <MenuItem value={'양산'}>양산</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >장소 선택
                </InputLabel>
                <Select
                    value={selectedValueTwo || '전체'}
                    onChange={changeSelectedValueTwo}
                >
                    <MenuItem value={'전체'}>전체</MenuItem>
                    <MenuItem value={'중도'}>중도</MenuItem>
                    <MenuItem value={'청운'}>청운</MenuItem>
                </Select>
            </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                >시간 정렬
                </InputLabel>
                <Select
                    value={selectedValueThree || '최신순'}
                    onChange={changeSelectedValueThree}
                >
                    <MenuItem value={'최신순'}>최신순</MenuItem>
                    <MenuItem value={'오래된'}>오래된</MenuItem>
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' onClick={() => {
                handleClose()
            }}>저장</Button>
            <Button variant='outlined' onClick={() => {
                handleClose()
            }} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog> */}
    </div>
  );
}

export default FilterDialogs;
