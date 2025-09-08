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
    <div className="py-2 mt-2  border-b w-full  md:flex space-y-4 justify-between m-auto">
      <div className="w-full md:flex md:space-y-0 space-y-4 items-center gap-4">
        <Select>
          <SelectTrigger className="md:w-[180px] ">
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
        <div className="flex items-center gap-2 ">
          <Checkbox className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-none  data-[state=checked]:text-white" />
          <p className="text-xs">ფორმატის შენარჩუნება</p>
      </div>
      </div>
      <button
        onClick={() => dispatch(clearTexts())}
        className="bg-gray-500 md:py-1 py-2  text-center  m-auto hover:bg-gray-600 rounded-md   w-full md:w-[150px] text-white  flex items-center justify-center gap-2 "
      >
        <PlusCircle />
        <p className="text-xs font-semibold">ახლის გახსნა</p>
      </button>
    </div>
  );
}

export default Header;
