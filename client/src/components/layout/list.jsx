import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ItemList } from "./item-list";

export const List = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-1">
          <p>0</p>
          <i className="ri-shopping-cart-line"></i>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Pannier:</SheetTitle>
          <SheetDescription>
            <ItemList />
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button className="absolute bottom-3 left-2 right-2">Valider</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
