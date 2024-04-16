import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BeatInput from "../BeatInput/BeatInput";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
const Config = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <FontAwesomeIcon icon={faGear} />
      </DrawerTrigger>
      <DrawerContent className="config-wrapper">
        <DrawerHeader>
          <BeatInput />
          <ThemeSwitcher />
        </DrawerHeader>
        <DrawerFooter className="flex-row justify-center">
          <DrawerClose className="variant-btn">Ok</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Config;
