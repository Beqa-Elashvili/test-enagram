import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Menu } from "lucide-react";
import { useAppDispatch } from "@/redux";
import { clearTexts } from "@/state";
import {
  ArrowRight,
  AudioLines,
  BookOpenCheck,
  CaseSensitive,
  ClipboardPen,
  Mic,
} from "lucide-react";

function Header() {
  const dispatch = useAppDispatch();

  const items = [
    { value: "/", label: "მართლმწერი", icon: BookOpenCheck },
    { value: "/2", label: "ტექსტის შედარება", icon: CaseSensitive },
    {
      value: "/3",
      label: (
        <>
          ხმა <ArrowRight className="inline w-4 h-4 mx-1" /> ტექსტი
        </>
      ),
      icon: Mic,
    },
    {
      value: "/4",
      label: (
        <>
          ტექსტი <ArrowRight className="inline w-4 h-4 mx-1" /> ხმა
        </>
      ),
      icon: AudioLines,
    },
    { value: "/5", label: "PDF კონვერტაცია", icon: ClipboardPen },
  ];

  return (
    <div>
      <div className="md:hidden">
        <div className=" bg-primary py-2 px-6 flex justify-between items-center">
          <img src="/icons/fullLogo.png" alt="logo" />
          <Menu className="text-white" />
        </div>
        <div className="border-b py-4 px-6">
          <Select defaultValue={items[1].value}>
            <SelectTrigger className="md:w-[220px] border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              <SelectGroup className="[&_[data-radix-collection-item]]:cursor-pointer border-none">
                {items.map(({ value, label, icon: Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex gap-2 items-center">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-sm">{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="py-2 px-6 mt-2  border-b w-full  md:flex space-y-4 justify-between m-auto">
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
    </div>
  );
}

export default Header;
