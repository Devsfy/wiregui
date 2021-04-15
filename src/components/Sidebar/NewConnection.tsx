import React from "react";

import { Button, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { createHashHistory } from "history";

export default function NewConnection() {
  const history = createHashHistory();

  function handleRedirect() {
    history.push("/new-connection");
  }

  return (
    <Button size="xs" w="100%" leftIcon={<FaPlus />} onClick={handleRedirect}>
      <Text fontSize="sm">New Connection</Text>
    </Button>
  );
}
