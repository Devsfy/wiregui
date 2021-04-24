import React from "react";

import { Button, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { createHashHistory } from "history";

export default function NewTunnelButton() {
  const history = createHashHistory();

  function handleRedirect() {
    history.push("/new-tunnel");
  }

  return (
    <Button size="xs" w="100%" leftIcon={<FaPlus />} onClick={handleRedirect}>
      <Text fontSize="sm">New Tunnel</Text>
    </Button>
  );
}
