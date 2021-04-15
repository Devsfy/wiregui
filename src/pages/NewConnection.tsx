import React from "react";
import { useHistory } from "react-router";

import * as fs from "fs";
import * as path from "path";
import { app } from "electron";
import { Button, Flex, Input, Textarea, Text } from "@chakra-ui/react";

import Content from "../components/Content";

interface ConfFile {
  name: string;
  path: string;
  data: string;
}

export default function NewConnection() {
  const history = useHistory();

  let file: ConfFile | undefined;

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const currentFile = event.currentTarget.files[0];

      fs.readFile(currentFile.path, "utf-8", (err, data) => {
        if (err) {
          alert(err.message);
          return;
        }

        file = {
          name: currentFile.name,
          path: currentFile.path,
          data: data,
        };

        console.log("NewConnection.tsx", file);
      });
    }
  }

  function handleCancel() {
    history.push("/");
  }

  function handleSave() {
    if (!file) {
      alert("No file selected!");
      return;
    }

    const appDataPath = path.join(app.getPath("appData"), "configurations");
    fs.writeFile(appDataPath, file.data, (err) => {
      if (err) {
        alert(err.message);
        return;
      }

      history.push(`/connection/${file?.name}`);
    });
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
          <input type="file" accept=".conf" onChange={handleImport}></input>
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
            disabled={!!file === false}
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Content>
  );
}
