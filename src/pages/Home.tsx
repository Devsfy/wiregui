import React, { useEffect } from "react";
import { checkWgIsInstalled } from 'wireguard-tools';

import { Text } from "@chakra-ui/layout";

import Content from "../components/Content";

export default function Home() {

  // Check if wireguard is installed, since there's nothing
  // the user can do without it we should just exit the
  // application after the alert is closed.
  useEffect(() => {
    async function check() {
      try {
        await checkWgIsInstalled();
      } catch (err) {
        console.log(err);
        alert("Wireguard is not installed on the system.");
      }
    }

    check();
  }, []);

  return (
    <Content>
      <Text>Home</Text>
    </Content>
  );
}
