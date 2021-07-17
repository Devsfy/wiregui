import React from "react";
import { useHistory, useLocation  } from "react-router-dom";
import { useSelector } from "react-redux";
import { version } from "../../../package.json";

import { Box, Link, Flex, Text } from "@chakra-ui/react";

import { StoreState, WgConfigState } from "../../types/store";

import NewTunnelButton from "./NewTunnelButton";
import SidebarItem from "./Sidebartem";

export default function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );

  function handleRedirect(param: string): void {
    history.push(`/tunnel/${param}`);
  }

  function isSelected(name: string): boolean {
    return location.pathname.split("/tunnel/")[1] === name;
  }

  return (
    <Flex bg="gray.200" direction="column" w="350px" position="relative">
      <Box px="4" pt="4" w="100%">
        <Flex justify="center">
          <NewTunnelButton />
        </Flex>
        <Text color="whiteAlpha.700" fontWeight="bold" mt="8">
          TUNNELS
        </Text>
      </Box>
      <Flex direction="column">
        {files.map((file) => (
          <Link
            key={file.name}
            onClick={() => handleRedirect(file.name)}
            _hover={{ textDecoration: "none" }}
          >
            <SidebarItem
              name={file.name}
              path={file.path}
              address={file.address}
              lastConnectAt={file.lastConnectAt}
              active={file.active}
              selected={isSelected(file.name)}
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
