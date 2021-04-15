import React from "react";
import { useParams } from "react-router";

import { Button, Flex, Text } from "@chakra-ui/react";

import Content from "../components/Content";

interface ConnectionParam {
  name: string;
}

export default function ConnectionInfo() {
  const { name } = useParams<ConnectionParam>();

  function handleEdit() {
    // EDIT
  }

  function handleActivate() {
    // ACTIVATE / DEACTIVATE
  }

  return (
    <Content>
      <Flex
        bg="gray.200"
        borderRadius="4"
        color="whiteAlpha.700"
        direction="column"
        p="4"
        w="50%"
        maxH="500px"
        mx="auto"
        mt="8"
      >
        <Flex justify="space-between" w="100%">
          <Text color="whiteAlpha.800" fontSize="lg" fontWeight="bold">
            Connection Info
          </Text>
          <Button color="whiteAlpha.800" colorScheme="red" size="xs">
            Delete
          </Button>
        </Flex>
        <Flex align="center" mt="4" w="100%">
          <Text fontWeight="medium">Interface:&nbsp;</Text>
          <Text>{name}</Text>
        </Flex>
        <Flex align="center" mt="2" w="100%">
          <Text fontWeight="medium">Address:&nbsp;</Text>
          <Text>10.75.74.14/24</Text>
        </Flex>
        <Flex justify="flex-end" mt="auto">
          <Button size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            color="whiteAlpha.800"
            colorScheme="orange"
            size="sm"
            ml="4"
            onClick={handleActivate}
          >
            Deactivate
          </Button>
        </Flex>
      </Flex>
    </Content>
  );
}
