import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Link, Flex, Text } from "@chakra-ui/react";

import { loadWgConfigFiles } from "../../utils";
import { fetchFiles } from "../../store/modules/wgConfig/action";

import { StoreState, WgConfigState } from "../../types/store";

import NewConnection from "./NewConnection";
import ConnectionItem from "./ConnectionItem";

export default function Sidebar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );

  useEffect(() => {
    async function fetchWgConfigFiles() {
      try {
        const response = await loadWgConfigFiles();
        dispatch(fetchFiles(response));
      } catch (e) {
        alert(e.message);
      }
    }

    fetchWgConfigFiles();
  }, []);

  function handleRedirect(param: string) {
    history.push(`/connection/${param}`);
  }

  return (
    <Flex bg="gray.200" direction="column" w="200px">
      <Box px="4" pt="4" w="100%">
        <Flex justify="center">
          <NewConnection />
        </Flex>
        <Text color="whiteAlpha.700" fontWeight="bold" mt="8">
          CONNECTIONS
        </Text>
      </Box>
      <Flex direction="column">
        {files.map((file) => (
          <Link
            key={file.name}
            onClick={() => handleRedirect(file.name)}
            _hover={{ textDecoration: "none" }}
          >
            <ConnectionItem
              name={file.name}
              address={file.address}
              lastConnectAt={file.lastConnectAt}
              active={file.active}
            />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
