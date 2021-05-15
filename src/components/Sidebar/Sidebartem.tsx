import React from "react";

import { formatDistance } from "date-fns";
import { Flex, Box, Text } from "@chakra-ui/react";

import { WgConfigFile } from "../../types/store";

export default function SidebarItem({
  name,
  address,
  lastConnectAt,
  active,
}: WgConfigFile) {
  return (
    <Flex
      align="center"
      cursor="pointer"
      w="100%"
      p="4"
      transition=".3s ease"
      _hover={{ background: "whiteAlpha.100" }}
    >
      <Box
        bg={active ? "green.400" : "whiteAlpha.600"}
        w="10px"
        h="10px"
        borderRadius="50%"
      />
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
          {address && <Text fontSize="xs">{address[0]}</Text>}
          <Text fontSize="xs">{lastConnectAt ? formatDistance(new Date(lastConnectAt), new Date(), { addSuffix: true }) : "never"}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
