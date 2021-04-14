import React from "react";

import { Flex } from "@chakra-ui/layout";

import NewConnection from "./NewConnection";

export default function Sidebar() {
  return (
    <Flex bg="gray.200" p="4" w="200px">
      <Flex w="100%" justify="center">
        <NewConnection />
      </Flex>
    </Flex>
  );
}
