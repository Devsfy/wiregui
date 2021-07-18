import { useDisclosure } from "@chakra-ui/react";
import React, { RefObject, useRef, useState } from "react";

type Props = unknown;

type MousePosition = {
  x: number;
  y: number;
};

type ContextMenuState = {
  isOpen: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  menuRef?: RefObject<HTMLDivElement>;
  position: MousePosition;
  setPosition: React.Dispatch<React.SetStateAction<MousePosition>>;
};

export const ContextMenuContext = React.createContext<ContextMenuState>({
  isOpen: false,
  closeMenu: () => { return; },
  openMenu: () => { return; },
  menuRef: undefined,
  position: { x: 0, y: 0 },
  setPosition: () => { return; },
});

export const ContextMenu: React.FC<Props> = ({ children }) => {
  const { isOpen, onClose: closeMenu, onOpen: openMenu } = useDisclosure();
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  return (
    <ContextMenuContext.Provider
      value={{
        isOpen,
        closeMenu,
        openMenu,
        menuRef,
        position,
        setPosition,
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
};
