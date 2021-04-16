import React from "react";

import { Flex, Badge, Center } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import Content from "../components/Content";

export default function Home() {
  return (
    <Content>
      <Flex
        marginLeft="25px"
        position="absolute"
        top="25%"
        left="50%"
        direction="column"
        justify="center"
      >
        <Center>
          <StarIcon w="50%" h="50%" opacity="25%" />
        </Center>
        <Center mt="10" opacity="75%">
          Click{" "}
          <Badge mx="1" variant="outline" colorScheme="orange">
            New Connection
          </Badge>{" "}
          to add a new connection
        </Center>
        <Center mt="4" opacity="75%">
          Click an existing connection to toggle
        </Center>
      </Flex>
    </Content>
  );
}
