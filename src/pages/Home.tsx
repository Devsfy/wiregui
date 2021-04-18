import React from "react";

import { Flex, Badge, Center, Image } from "@chakra-ui/react";

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
          <Image
            src="../icons/dragon.png"
            width="50%"
            opacity="50%"
            filter="grayscale(100%)"
            draggable="false"
          />
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
