import { Button, Text, HStack, ButtonProps } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { contextMenusAtom } from "./model";

type Props = {
  color?: string;
  colorScheme?: string;
  disabled?: boolean;
  command?: string;
  icon?: React.ReactElement;
  buttonProps?: ButtonProps;
  onClick?(params: { event: React.MouseEvent<HTMLButtonElement, MouseEvent>, passData: Record<string, unknown> }): void;
};

export const ContextMenuItem: React.FC<Props> = ({
  children,
  onClick,
  color,
  colorScheme,
  disabled,
  command,
  icon,
  ...buttonProps
}) => {
  const [contextMenusState, setContextMenusState] =
    useRecoilState(contextMenusAtom);

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();

        // call the provided click handler with the event and the passthrough data from the trigger
        onClick && onClick({ event: e, passData: contextMenusState.passData });

        // TODO: make it more specific
        // close all menus
        setContextMenusState((oldState) => {
          return {
            ...oldState,
            menus: oldState.menus.map((m) => ({
              ...m,
              isOpen: false,
            })),
          };
        });
      }}
      borderRadius={0}
      w="full"
      justifyContent="space-between"
      size="sm"
      overflow="hidden"
      textOverflow="ellipsis"
      colorScheme={colorScheme}
      color={color}
      disabled={disabled}
      {...buttonProps}
    >
      {/* left */}
      <HStack spacing={2} alignItems="center" w="full" h="full">
        {/* icon */}
        {icon}
        {/* children */}
        <Text>{children}</Text>
      </HStack>
      {/* right */}
      <Text size="sm" opacity={0.5} fontFamily="mono">
        {command}
      </Text>
    </Button>
  );
};
