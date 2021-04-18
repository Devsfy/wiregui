import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { version } from "../../../package.json";

import { Box, Link, Flex, Text } from "@chakra-ui/react";

import { StoreState, WgConfigState } from "../../types/store";

import NewConnection from "./NewConnection";
import ConnectionItem from "./ConnectionItem";

export default function Sidebar() {
  const history = useHistory();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );

  function handleRedirect(param: string) {
    history.push(`/connection/${param}`);
  }

  return (
    <Flex bg="gray.200" direction="column" w="350px" position="relative">
      <Box px="4" pt="4" w="100%">
        <Flex justify="center">
          <NewConnection />
        </Flex>
        <Text color="whiteAlpha.700" fontWeight="bold" mt="8">
          CONNECTIONS
        </Text>
      </Box>
      <Flex direction="column">
        {files.map((file) => (
          <Link
            key={file.name}
            onClick={() => handleRedirect(file.name)}
            _hover={{ textDecoration: "none" }}
          >
            <ConnectionItem
              name={file.name}
              path={file.path}
              address={file.address}
              lastConnectAt={file.lastConnectAt}
              active={file.active}
            />
          </Link>
        ))}
      </Flex>
      <Text
          position="absolute"
          bottom="0"
          w="100%"
          textAlign="center"
          fontSize="smaller"
          color="whiteAlpha.500"
        >
          v{version}
        </Text>
    </Flex>
  );
}
