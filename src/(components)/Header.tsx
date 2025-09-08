import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { useAppDispatch } from "@/redux";
import { clearTexts } from "@/state";

function Header() {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-2 px-2 py-2 mt-2  border-b flex justify-between">
      <div className=" flex  items-center gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ქართული" />
          </SelectTrigger>
          <SelectContent defaultValue={"ქართული"} className="bg-white">
            <SelectGroup className="[&_[data-radix-collection-item]]:cursor-pointer">
              <SelectItem value="Georgian">ქართული</SelectItem>

              <SelectItem className="cursor-pointer" value="English">
                ინგლისური
              </SelectItem>
              <SelectItem value="Frances">ფრანგული</SelectItem>
              <SelectItem value="China">ჩინური</SelectItem>
              <SelectItem value="Japanes">იაპონური</SelectItem>
              <SelectItem value="Italian">იტალიური</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Checkbox className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-none  data-[state=checked]:text-white" />
          <p className="text-xs">ფორმატის შენარჩუნება</p>
        </div>
      </div>
      <button
        onClick={() => dispatch(clearTexts())}
        className="bg-gray-500 hover:bg-gray-600 rounded-md  text-white px-2  flex items-center  gap-4 justify-between"
      >
        <PlusCircle />
        <p className="text-xs font-semibold">ახლის გახსნა</p>
      </button>
    </div>
  );
}

export default Header;
