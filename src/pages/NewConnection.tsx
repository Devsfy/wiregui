import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Button, Flex, Input, Textarea, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { addFile } from "../store/modules/wgConfig/action";
import { StoreState, AppState, WgConfigState } from "../types/store";

import Content from "../components/Content";

export default function NewConnection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [hiddenInput, setHiddenInput] = useState<HTMLInputElement | null>();
  const [fileName, setFileName] = useState<string>();
  const [interfaceText, setInterfaceText] = useState<string>();
  const { userDataPath } = useSelector<StoreState, AppState>(
    (state) => state.app
  );
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const currentFile = event.currentTarget.files[0];

      try {
        const reader = new FileReader();
        reader.readAsText(currentFile, "utf-8");
        reader.onload = function (evt: ProgressEvent<FileReader>) {
          if (!evt.target) return;

          const data = evt.target.result as string;
          const name = currentFile.name.split(".conf");

          setFileName(name[0]);
          setInterfaceText(data);
        };

        reader.onerror = function () {
          toast(`Could not read file ${currentFile.name}`, { type: "error" });
        };
      } catch (e) {
        toast(e.message, { type: "error" });
      }
    }
  }

  function handleCancel() {
    history.push("/");
  }

  async function handleSave() {
    if (!fileName || fileName.length === 0) {
      toast("Name cannot be empty", { type: "error" });
      return;
    }

    if (!interfaceText || interfaceText.length === 0) {
      toast("Interface cannot be empty", { type: "error" });
      return;
    }

    if (files.some(f => f.name === fileName)) {
      toast(`A connection named ${fileName} already exists`, { type: "error" });
      return;
    }

    try {
      dispatch(addFile(`${fileName}.conf`, interfaceText, userDataPath));
      history.push(`/connection/${fileName}`);
    } catch (e) {
      toast(e.message, { type: "error" });
    }
  }

  function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFileName(event.target.value);
  }

  function onInterfaceTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInterfaceText(event.target.value);
  }

  return (
    <Content>
      <Flex
        bg="gray.200"
        borderRadius="4"
        color="whiteAlpha.700"
        direction="column"
        p="4"
        w="575px"
        h="auto"
        maxH="625px"
        mx="auto"
        mt="8"
      >
        <Flex justify="space-between" w="100%">
          <Text color="whiteAlpha.800" fontSize="lg" fontWeight="bold">
            New Connection
          </Text>
          <Button size="xs" onClick={() => hiddenInput?.click()}>
            Import
          </Button>
          <input
            hidden
            type="file"
            accept=".conf"
            onChange={handleImport}
            ref={(el) => setHiddenInput(el)}
          ></input>
        </Flex>
        <Flex align="center" mt="4" w="100%">
          <Text>Name:</Text>
          <Input
            bg="gray.300"
            borderColor="transparent"
            size="xs"
            w="50%"
            ml="2"
            value={fileName || ""}
            onChange={onNameChange}
          />
        </Flex>
        <Flex direction="column" mt="4" w="100%" h="100%">
          <Text>Interface:</Text>
          <Textarea
            bg="gray.300"
            borderColor="transparent"
            size="xs"
            resize="none"
            mt="2"
            w="100%"
            h="100%"
            value={interfaceText || ""}
            onChange={onInterfaceTextChange}
          />
        </Flex>
        <Flex justify="flex-end" mt="4">
          <Button size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            colorScheme="orange"
            size="sm"
            ml="4"
            disabled={!fileName || !interfaceText}
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Content>
  );
}
