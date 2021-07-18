import React from "react";
import { useHistory, useLocation  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Link, Flex, Text } from "@chakra-ui/react";

import * as fs from "fs";
import * as path from "path";
import { WgConfig } from "wireguard-tools";

import { version } from "../../../package.json";
import { ContextMenuItem, ContextMenuList } from "../ContextMenu";
import { AppState, StoreState, WgConfigState } from "../../types/store";
import { deleteFile } from "../../store/modules/wgConfig/action";

import NewTunnelButton from "./NewTunnelButton";
import SidebarItem from "./Sidebartem";

export default function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { files } = useSelector<StoreState, WgConfigState>(
    (state) => state.wgConfig
  );
  const { userDataPath } = useSelector<StoreState, AppState>(
    (state) => state.app
  );

  function handleRedirect(param: string): void {
    const newPath = `/tunnel/${param}`;
    if (location.pathname === newPath) {
      return;
    }
    history.push(newPath);
  }

  function isSelected(name: string): boolean {
    return location.pathname.split("/tunnel/")[1] === name;
  }

  function handleDelete(name: string) {
    try {
      const filePath = path.join(userDataPath, "configurations", `${name}.conf`);

      const data = fs.readFileSync(filePath, "utf-8");
      const config = new WgConfig({});
      config.parse(data);

      const wgConfigFile = files.find((f) => f.name === name);
      if (!wgConfigFile) {
        toast("Could not find config file", { type: "error" });
        return;
      }

      dispatch(deleteFile(wgConfigFile, userDataPath));

      if (isSelected(name)) {
        history.push("/");
      }
    } catch (e) {
      toast(e.message, { type: "error" });
    }
  }

  return (
    <Flex bg="gray.200" direction="column" w="350px" position="relative">
      <Box px="4" pt="4" w="100%">
        <Flex justify="center">
          <NewTunnelButton />
        </Flex>
        <Text color="whiteAlpha.700" fontWeight="bold" mt="8">
          TUNNELS
        </Text>
      </Box>
      <Flex direction="column">
        {files.map((file) => (
          <div key={file.name}>
            <Link
              onClick={() => handleRedirect(file.name)}
              _hover={{ textDecoration: "none" }}
            >
              <SidebarItem
                name={file.name}
                path={file.path}
                address={file.address}
                lastConnectAt={file.lastConnectAt}
                active={file.active}
                selected={isSelected(file.name)}
              />
            </Link>
            <ContextMenuList menuId={`menu-${file.name}`}>
              <ContextMenuItem
                color="red"
                onClick={({ passData }) => handleDelete(passData.name as string)}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuList>
          </div>
        ))}
      </Flex>
      <Text
          position="absolute"
          bottom="0"
          w="100%"
          textAlign="center"
          fontSize="smaller"
          color="whiteAlpha.500"
        >
          v{version}
        </Text>
    </Flex>
  );
}
