import { contextMenusAtom } from "./model";
import { Box } from "@chakra-ui/react";
import React, { MouseEvent } from "react";
import { useRecoilState } from "recoil";

type Props = {
  menuId: string;
  passData?: unknown; // pass arbitrary data to the ContextMenuList (render prop) and the ContextMenuItem (onClick function)
  onTrigger?: () => void; // run an optional function on right click trigger
};

export const ContextMenuTrigger: React.FC<Props> = ({
  children,
  menuId,
  passData,
  onTrigger = () => {
    return;
  },
}) => {
  const [, setContextMenusState] = useRecoilState(contextMenusAtom);

  // when the trigger is right clicked,
  // we want to add a menu in our context or update it if it already exists
  return (
    <Box
      onContextMenu={(event: MouseEvent) => {
        // dont show the browser menu
        event.preventDefault();

        // run an optional action on trigger
        onTrigger();

        // update the position where the ContextMenuList should be shown
        setContextMenusState((oldState) => ({
          ...oldState,
          // set the passthrough data
          passData,
          // update the mouse position
          position: {
            x: event.clientX,
            y: event.clientY,
          },
          // update which menu should be showing
          menus: oldState.menus.find((m) => m.id === menuId)
            ? // open the menu if it exists and close all others
              oldState.menus.map((m) => {
                if (m.id === menuId) {
                  return {
                    ...m,
                    isOpen: true,
                  };
                }
                return {
                  ...m,
                  isOpen: false,
                };
              })
            : // create the menu if it doesnt exist and close all others
              [
                {
                  id: menuId,
                  isOpen: true,
                },
                ...oldState.menus.map((m) => {
                  return {
                    ...m,
                    isOpen: false,
                  };
                }),
              ],
        }));
      }}
    >
      {children}
    </Box>
  );
};
