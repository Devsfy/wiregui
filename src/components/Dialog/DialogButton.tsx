import React, { ReactElement } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export interface DialogButtonProps {
  header: string;
  body: string;
  title?: string;
  color?: string;
  colorScheme?: string;
  launchButtonText: string | ReactElement;
  cancelButtonText?: string;
  confirmButtonText?: string;
  motionPreset?: "slideInBottom" | "slideInRight" | "scale" | "none";
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function DialogButton({
  header,
  body,
  onConfirm,
  onCancel,
  launchButtonText,
  title,
  color,
  colorScheme,
  motionPreset = "slideInBottom",
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
}: DialogButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  function onHandleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  }

  function onHandleCancel() {
    if (onCancel) {
      onCancel();
    }
    onClose();
  }

  return (
    <>
      <Button colorScheme={colorScheme} color={color} title={title} onClick={onOpen} size="sm" ml="4">
        {launchButtonText}
      </Button>
      <AlertDialog
        motionPreset={motionPreset}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg="gray.300">
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onHandleCancel}>
              {cancelButtonText}
            </Button>
            <Button colorScheme="orange" ml={3} onClick={onHandleConfirm}>
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
