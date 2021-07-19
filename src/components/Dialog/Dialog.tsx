import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export interface DialogProps {
  header: string;
  body: string;
  isOpen: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  motionPreset?: "slideInBottom" | "slideInRight" | "scale" | "none";
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export function Dialog({
  header,
  body,
  isOpen,
  onConfirm,
  onCancel,
  onClose,
  motionPreset = "slideInBottom",
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
}: DialogProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  function onHandleConfirm() {
    if (onConfirm) {
      onConfirm();
    }

    if (onClose) {
      onClose();
    }
  }

  function onHandleCancel() {
    if (onCancel) {
      onCancel();
    }

    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      <AlertDialog
        motionPreset={motionPreset}
        leastDestructiveRef={cancelRef}
        onClose={onClose ? onClose : () => { return; }}
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
