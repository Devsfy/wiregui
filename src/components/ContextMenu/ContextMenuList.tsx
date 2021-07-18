import { useColorModeValue, useOutsideClick } from "@chakra-ui/react";
import { Variants } from "framer-motion";
import React, { ReactNode, RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { contextMenusAtom } from "./model";
import { MotionBox, MotionBoxProps } from "./MotionBox";

type RenderParams = {
  menuId: string;
  closeContextMenus: () => void;
  passData: unknown;
};

type Props = {
  menuId: string;
  render?: (params: RenderParams) => ReactNode;
};

const motionVariants: Variants = {
  enter: {
    visibility: "visible",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    transitionEnd: {
      visibility: "hidden",
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: "easeOut",
    },
  },
};

type Position = {
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
};

export const ContextMenuList: React.FC<Props & MotionBoxProps> = ({
  children,
  menuId,
  render,
  ...boxProps
}) => {
  const [contextMenusState, setContextMenusState] =
    useRecoilState(contextMenusAtom);

  const menuRef: RefObject<HTMLDivElement> = useRef(null);

  const menu = useMemo(
    () => contextMenusState.menus.find((m) => m.id === menuId),
    [contextMenusState]
  );

  // where should the menu be shown?
  // the ContextMenuTrigger sets this
  const [position, setPosition] = useState<Position>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  // TODO: Any less manual way to do this
  // figure out where to show the menu
  useEffect(() => {
    let left: number | undefined;
    let right: number | undefined;
    let top: number | undefined;
    let bottom: number | undefined;

    const x = contextMenusState.position.x;
    const y = contextMenusState.position.y;

    const menuHeight = menuRef?.current?.clientHeight;
    const menuWidth = menuRef?.current?.clientWidth;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (!menuHeight || !menuWidth) {
      return;
    }
    if (x + menuWidth > windowWidth) {
      right = windowWidth - x;
    } else {
      left = x;
    }
    if (y + menuHeight > windowHeight) {
      bottom = windowHeight - y;
    } else {
      top = y;
    }
    setPosition({
      top: `${top}px`,
      bottom: `${bottom}px`,
      left: `${left}px`,
      right: `${right}px`,
    });
  }, [menuRef, contextMenusState.position.x, contextMenusState.position.y]);

  // when clicking outside the menu, close it
  useOutsideClick({
    ref: menuRef,
    handler: () => {
      // close all menus
      closeContextMenus();
    },
  });

  const bgColor = useColorModeValue("gray.50", "gray.300");

  const closeContextMenus = () => {
    setContextMenusState((oldState) => {
      return {
        ...oldState,
        menus: oldState.menus.map((m) => ({
          ...m,
          isOpen: false,
        })),
      };
    });
  };

  return (
    <MotionBox
      variants={motionVariants}
      animate={menu?.isOpen ? "enter" : "exit"}
      ref={menuRef}
      borderWidth={1}
      position="fixed"
      bg={bgColor}
      minW={40}
      w={52}
      // maxW={96}
      borderRadius="md"
      display="flex"
      flexDirection="column"
      zIndex="popover"
      {...position}
      {...boxProps}
    >
      {/* either use the render prop or the children */}
      {render
        ? render({
            menuId,
            closeContextMenus,
            passData: contextMenusState.passData,
          })
        : children}
    </MotionBox>
  );
};
