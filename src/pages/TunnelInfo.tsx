import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import * as fs from "fs";
import * as path from "path";
import { checkWgIsInstalled, WgConfig } from "wireguard-tools";

import { Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

import * as WireGuard from "../utils/wg";
import {
  addFile,
  deleteFile,
  fetchFiles,
  updateStatus,
} from "../store/modules/wgConfig/action";

import {
  AppState,
  StoreState,
  WgConfigFile,
  WgConfigState,
} from "../types/store";

import DialogButton from "../components/DialogButton";
import Content from "../components/Content";

interface TunnelParam {
  name: string;
}

export default function TunnelInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [wgConfigFile, setWgConfigFile] = useState<WgConfigFile>();
  const [fileName, setFileName] = useState<string>("");
  const [interfaceText, setInterfaceText] = useState<string>("");
  const [originalInterfaceText, setOriginalInterfaceText] = useState<string>(
    ""
  );
  const { name } = useParams<TunnelParam>();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );
  const { userDataPath } = useSelector<StoreState, AppState>(
    (state) => state.app
  );

  useEffect(() => {
    const filePath = path.join(userDataPath, "configurations", `${name}.conf`);

    const data = fs.readFileSync(filePath, "utf-8");
    const config = new WgConfig({});
    config.parse(data);

    setFileName(name);
    setInterfaceText(config.toString());
    setOriginalInterfaceText(config.toString());
    setWgConfigFile(files.find((f) => f.name === name));
  }, [name]);

  useEffect(() => {
    setWgConfigFile(files.find((f) => f.name === name));
  }, [files]);

  async function toggleActive() {
    if (!wgConfigFile) {
      toast("Could not load config file", { type: "error" });
      return;
    }

    try {
      const started = await WireGuard.toggle(wgConfigFile.path);
      const message = started ? "Activated" : "Deactivated";
      toast(`${message} ${wgConfigFile.name}`, { type: "success" });
      dispatch(updateStatus(started ? wgConfigFile.name : ""));
    } catch (e) {
      try {
        await checkWgIsInstalled();
      } catch (e) {
        toast("Wireguard was not detected on the system. If you just installed it, try restarting wiregui.", { type: "error" });
        return;
      }
      toast(e.message, { type: "error" });
    }
  }

  async function handleDelete() {
    if (!wgConfigFile) {
      toast(`Could not find config for ${name}`, { type: "error" });
      return;
    }

    if (wgConfigFile.active) {
      toast("Stop the tunnel before deleting", { type: "error" });
      return;
    }

    try {
      dispatch(deleteFile(wgConfigFile, userDataPath));
      history.push("/");
    } catch (e) {
      toast(e.message, { type: "error" });
    }
  }

  async function handleSave(): Promise<void> {
    if (files.some((f) => f.name === fileName && fileName !== name)) {
      toast(`A tunnel named ${fileName} already exists`, { type: "error" });
      return;
    }

    if (fileName.length > 15) {
      toast("Filename is too long, maximum 15 characters", { type: "error" });
      return;
    }

    try {
      if (wgConfigFile) {
        if (wgConfigFile.active) {
          toast("Stop the tunnel before updating", { type: "error" });
          return;
        }
        dispatch(deleteFile(wgConfigFile, userDataPath));
      }
      dispatch(addFile(`${fileName}.conf`, interfaceText, userDataPath));

      if (fileName !== name) {
        const lastConnectAt = localStorage.getItem(name);
        if (lastConnectAt) {
          localStorage.setItem(fileName, lastConnectAt);
          localStorage.removeItem(name);
        }
        history.push(`/tunnel/${fileName}`);
      }

      dispatch(fetchFiles(userDataPath));
    } catch (e) {
      toast(e.message, { type: "error" });
    }
  }

  function isAllowedToSave(): boolean {
    return (
      (fileName !== name || interfaceText !== originalInterfaceText) &&
      fileName.length > 0 &&
      interfaceText.length > 0
    );
  }

  function onNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setFileName(event.target.value);
  }

  function onInterfaceTextChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
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
        mx="auto"
        my="10"
      >
        <Flex justify="space-between" w="100%">
          <Text color="whiteAlpha.800" fontSize="lg" fontWeight="bold">
            {name}
          </Text>
          <DialogButton
            title="Delete"
            colorScheme="red"
            header="Are you sure?"
            body="You cannot recover this file after deleting."
            onConfirm={handleDelete}
            launchButtonText={<DeleteIcon />}
          />
        </Flex>
        <Flex align="center" mt="4" w="100%">
          <Text>Name:</Text>
          <Input
            bg="gray.300"
            borderColor="transparent"
            size="xs"
            w="50%"
            ml="2"
            value={fileName}
            onChange={onNameChange}
          />
        </Flex>
        <Flex direction="column" mt="4" w="100%" h="100%">
          <Text fontWeight="medium">Interface:&nbsp;</Text>
          <Textarea
            bg="gray.300"
            borderColor="transparent"
            size="xs"
            resize="none"
            mt="2"
            w="100%"
            h="100%"
            value={interfaceText}
            onChange={onInterfaceTextChange}
          />
        </Flex>
        <Flex justify="flex-end" mt="4">
          <Button colorScheme="orange" size="sm" ml="4" onClick={toggleActive}>
            {wgConfigFile && wgConfigFile.active ? "Deactivate" : "Activate"}
          </Button>
          {isAllowedToSave() && (
            <Button colorScheme="green" size="sm" ml="4" onClick={handleSave}>
              Save
            </Button>
          )}
        </Flex>
      </Flex>
    </Content>
  );
}
