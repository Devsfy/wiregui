import React from "react";

import { Flex } from "@chakra-ui/layout";

import Sidebar from "./Sidebar";

interface ContentProps {
  children?: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <Flex bg="gray.300" minH="100vh" w="100vw">
      <Sidebar />
      <Flex p="4" w="calc(100vw - 200px)">
        {children}
      </Flex>
    </Flex>
  );
}
