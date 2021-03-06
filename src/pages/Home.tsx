import React from "react";

import { Flex, Badge, Center, Image } from "@chakra-ui/react";

import Content from "../components/Content";

export default function Home() {
  return (
    <Content>
      <Flex direction="column" justify="center" marginLeft="30%">
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
            New Tunnel
          </Badge>{" "}
          to add a new tunnel
        </Center>
        <Center mt="4" opacity="75%">
          Click an existing tunnel to toggle
        </Center>
      </Flex>
    </Content>
  );
}
