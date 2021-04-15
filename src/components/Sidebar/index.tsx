import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Box, Link, Flex, Text } from "@chakra-ui/react";

import NewConnection from "./NewConnection";
import ConnectionItem, { ConnectionProps } from "./ConnectionItem";

export default function Sidebar() {
  const history = useHistory();
  const [connections] = useState<ConnectionProps[]>([
    {
      name: "Nightly",
      ip: "10.75.74.14/42",
      lastConnect: "a day ago",
      active: true,
    },
    {
      name: "volcanic_branch",
      ip: "10.71.74.14/42",
      lastConnect: "3 days ago",
      active: false,
    },
    {
      name: "super_mega_power_volcanic_branch",
      ip: "10.72.74.14/42",
      lastConnect: "15 days ago",
      active: false,
    },
  ]);

  function handleRedirect(param: string) {
    history.push(`/connection/${param}`);
  }

  return (
    <Flex bg="gray.200" direction="column" w="200px">
      <Box px="4" pt="4" w="100%">
        <Flex justify="center">
          <NewConnection />
        </Flex>
        <Text color="whiteAlpha.700" fontWeight="bold" mt="8">
          CONNECTIONS
        </Text>
      </Box>
      <Flex direction="column">
        {connections.map((connection) => (
          <Link
            key={connection.ip}
            onClick={() => handleRedirect(connection.name)}
            _hover={{ textDecoration: "none" }}
          >
            <ConnectionItem
              name={connection.name}
              ip={connection.ip}
              lastConnect={connection.lastConnect}
              active={connection.active}
            />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
