import React from "react";
import { useParams } from "react-router";

import { Text } from "@chakra-ui/layout";

import Content from "../components/Content";

interface ConnectionParam {
  name: string;
}

export default function ConnectionInfo() {
  const { name } = useParams<ConnectionParam>();

  return (
    <Content>
      <Text>render info of {name} </Text>
    </Content>
  );
}
