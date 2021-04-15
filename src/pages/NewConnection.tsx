import React from "react";
import { useHistory } from "react-router";

import { Button, Flex, Input, Textarea, Text } from "@chakra-ui/react";

import Content from "../components/Content";

export default function NewConnection() {
  const history = useHistory();

  function handleCancel() {
    history.push("/");
  }

  function handleSave() {
    history.push("/");
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
        maxH="300px"
        mx="auto"
        mt="8"
      >
        <Flex justify="space-between" w="100%">
          <Text color="whiteAlpha.800" fontSize="lg" fontWeight="bold">
            New Connection
          </Text>
          <Button size="xs">Import</Button>
        </Flex>
        <Flex align="center" mt="4" w="100%">
          <Text>Name:</Text>
          <Input
            bg="gray.300"
            borderColor="transparent"
            size="xs"
            w="50%"
            ml="2"
          />
        </Flex>
        <Flex direction="column" mt="4" w="100%" h="100%">
          <Text>Interface:</Text>
          <Textarea
            bg="gray.300"
            borderColor="transparent"
            size="xs"
            resize="none"
            mt="2"
            w="100%"
            h="100%"
          />
        </Flex>
        <Flex justify="flex-end" mt="4">
          <Button size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            color="whiteAlpha.800"
            colorScheme="orange"
            size="sm"
            ml="4"
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Content>
  );
}
