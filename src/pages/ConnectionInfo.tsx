import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import * as fs from "fs";
import * as path from "path";
import { ipcRenderer } from "electron";
import { WgConfig } from "wireguard-tools";
import { Button, Flex, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { deleteFile } from "../store/modules/wgConfig/action";
import { StoreState, WgConfigState } from "../types/store";

import Content from "../components/Content";

interface ConnectionParam {
  name: string;
}

export default function ConnectionInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [file, setFile] = useState<WgConfig>();
  const { name } = useParams<ConnectionParam>();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );

  useEffect(() => {
    const filePath = path.join(
      ipcRenderer.sendSync("getPath", "userData"),
      "configurations",
      `${name}.conf`,
    );

    const data = fs.readFileSync(filePath, "utf-8");
    const config = new WgConfig({});
    config.parse(data);

    setFile(config);
  }, [name]);

  function handleEdit() {
    // EDIT
  }

  function handleActivate() {
    // ACTIVATE / DEACTIVATE
  }

  async function handleDelete() {
    const wgConfigFile = files.find(f => f.name === name);

    if (!wgConfigFile) {
      toast(`Could not find config for ${name}`, { type: "error" });
      return;
    }

    try {
      dispatch(deleteFile(wgConfigFile));
      history.push("/");
    } catch (e) {
      toast(e.message, { type: "error" });
    }
  }

  return (
    <Content>
      <Flex
        bg="gray.200"
        borderRadius="4"
        color="whiteAlpha.700"
        direction="column"
        p="4"
        w="50%"
        maxH="500px"
        mx="auto"
        mt="8"
      >
        <Flex justify="space-between" w="100%">
          <Text color="whiteAlpha.800" fontSize="lg" fontWeight="bold">
            Connection Info
          </Text>
          <Button color="whiteAlpha.800" size="xs" onClick={handleDelete}>
            Delete
          </Button>
        </Flex>
        <Flex align="center" mt="4" w="100%">
          <Text fontWeight="medium">Interface:&nbsp;</Text>
          {file && <Text>{name}</Text>}
        </Flex>
        <Flex align="center" mt="2" w="100%">
          <Text fontWeight="medium">Addresses:&nbsp;</Text>
          {file && <Text>{file.wgInterface.address}</Text>}
        </Flex>
        <Flex align="center" mt="2" w="100%">
          <Text fontWeight="medium">DNS:&nbsp;</Text>
          {file && <Text>{file.wgInterface.dns}</Text>}
        </Flex>
        {file?.peers?.map((peer) => {
          return (
            <div key={peer.publicKey}>
              <Flex align="center" mt="2" w="100%">
                <Text fontWeight="medium">Allowed IPs:&nbsp;</Text>
                <Text>{peer.allowedIps}</Text>
              </Flex>
              <Flex align="center" mt="2" w="100%">
                <Text fontWeight="medium">Endpoint:&nbsp;</Text>
                <Text>{peer.endpoint}</Text>
              </Flex>
              <Flex align="center" mt="2" w="100%">
                <Text fontWeight="medium">Public key:&nbsp;</Text>
                <Text>{peer.publicKey}</Text>
              </Flex>
            </div>
          );
        })}
        <Flex justify="flex-end" mt="auto">
          <Button size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            color="whiteAlpha.800"
            colorScheme="orange"
            size="sm"
            ml="4"
            onClick={handleActivate}
          >
            Deactivate
          </Button>
        </Flex>
      </Flex>
    </Content>
  );
}
