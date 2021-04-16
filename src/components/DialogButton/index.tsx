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
  useDisclosure,
} from "@chakra-ui/react";

export interface DialogButtonProps {
  header: string;
  body: string;
  launchButtonText: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  motionPreset?: "slideInBottom" | "slideInRight" | "scale" | "none";
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function DialogButton({
  header,
  body,
  onConfirm,
  onCancel,
  launchButtonText,
  motionPreset = "slideInBottom",
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
}: DialogButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      <Button onClick={onOpen}>{launchButtonText}</Button>
      <AlertDialog
        motionPreset={motionPreset}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {body}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onHandleCancel}>
              {cancelButtonText}
            </Button>
            <Button colorScheme="red" ml={3} onClick={onHandleConfirm}>
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}