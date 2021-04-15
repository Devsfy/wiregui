import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Button, Flex, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { deleteFile } from "../store/modules/wgConfig/action";
import { StoreState, WgConfigFile, WgConfigState } from "../types/store";

import Content from "../components/Content";

interface ConnectionParam {
  name: string;
}

export default function ConnectionInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [file, setFile] = useState<WgConfigFile>();
  const { name } = useParams<ConnectionParam>();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );

  useEffect(() => {
    setFile(files.find((f) => f.name === name));
  }, [name]);

  function handleEdit() {
    // EDIT
  }

  function handleActivate() {
    // ACTIVATE / DEACTIVATE
  }

  async function handleDelete() {
    if (!file) {
      toast(`Could not find config for ${name}`, { type: "error" });
      return;
    }

    try {
      dispatch(deleteFile(file));
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
          {file && <Text>{file.name}</Text>}
        </Flex>
        <Flex align="center" mt="2" w="100%">
          <Text fontWeight="medium">Address:&nbsp;</Text>
          <Text>10.75.74.14/24</Text>
        </Flex>
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
