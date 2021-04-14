import React from "react";

import { Flex, Box, Text } from "@chakra-ui/react";

export interface ConnectionProps {
  name: string;
  ip: string;
  lastConnect: string;
}

export default function ConnectionItem({
  name,
  ip,
  lastConnect,
}: ConnectionProps) {
  return (
    <Flex
      align="center"
      cursor="pointer"
      w="100%"
      p="4"
      transition=".3s ease"
      _hover={{ background: "whiteAlpha.100" }}
    >
      <Box bg="green.400" w="10px" h="10px" borderRadius="50%" />
      <Flex direction="column" ml="2" w="89%">
        <Text
          color="whiteAlpha.700"
          w="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {name}
        </Text>
        <Flex color="whiteAlpha.600" justify="space-between">
          <Text fontSize="xs">{ip}</Text>
          <Text fontSize="xs">{lastConnect}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
