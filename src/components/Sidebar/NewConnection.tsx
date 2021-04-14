import React from "react";

import { Button, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export default function NewConnection() {
  return (
    <Button size="xs" w="100%" leftIcon={<FaPlus />}>
      <Text fontSize="sm">New Connection</Text>
    </Button>
  );
}
