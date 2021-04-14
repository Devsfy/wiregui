import React, { useState } from "react";

import { Flex } from "@chakra-ui/layout";

import NewConnection from "./NewConnection";
import ConnectionItem, { ConnectionProps } from "./ConnectionItem";

export default function Sidebar() {
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

  return (
    <Flex bg="gray.200" direction="column" w="200px">
      <Flex justify="center" p="4" w="100%">
        <NewConnection />
      </Flex>
      <Flex direction="column">
        {connections.map((connection) => (
          <ConnectionItem
            key={connection.ip}
            name={connection.name}
            ip={connection.ip}
            lastConnect={connection.lastConnect}
            active={connection.active}
          />
        ))}
      </Flex>
    </Flex>
  );
}
