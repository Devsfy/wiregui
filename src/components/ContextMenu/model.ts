import { atom } from "recoil";

type MousePosition = {
  x: number;
  y: number;
};

export interface IContextMenu {
  id: string;
  isOpen: boolean;
}

export type IContextMenus = {
  // where should the menu be shown
  position: MousePosition;
  // what menu should be shown?
  menus: IContextMenu[];
  // pass data from the trigger to the menu list
  passData?: any;
};

// Context Menus
export const contextMenusAtom = atom<IContextMenus>({
  key: "contextMenusAtom",
  default: {
    position: {
      x: 0,
      y: 0,
    },
    menus: [],
    passData: undefined,
  },
});
