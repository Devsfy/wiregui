import React from "react";
import { useHistory, useLocation  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Link, Flex, Text } from "@chakra-ui/react";

import { checkWgIsInstalled } from "wireguard-tools";

import { version } from "../../../package.json";
import { ContextMenuItem, ContextMenuList } from "../ContextMenu";
import { AppState, StoreState, WgConfigFile, WgConfigState } from "../../types/store";
import { deleteFile, updateStatus } from "../../store/modules/wgConfig/action";
import * as WireGuard from "../../utils/wg";

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

  function getWgConfigFile(name: string): WgConfigFile | undefined {
    return files.find((f) => f.name === name);
  }

  function isSelected(name: string): boolean {
    return location.pathname.split("/tunnel/")[1] === name;
  }

  function isActive(name: string): boolean {
    const wgConfigFile = getWgConfigFile(name);

    if (!wgConfigFile) {
      return false;
    }

    return wgConfigFile.active;
  }

  function handleDelete(name: string) {
    try {
      const wgConfigFile = getWgConfigFile(name);
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

  async function handleToggle(name: string) {
    const wgConfigFile = getWgConfigFile(name);
    if (!wgConfigFile) {
      toast("Could not find config file", { type: "error" });
      return;
    }

    try {
      const started = await WireGuard.toggle(wgConfigFile.path);
      const message = started ? "Activated" : "Deactivated";
      toast(`${message} ${wgConfigFile.name}`, { type: "success" });
      dispatch(updateStatus(started ? wgConfigFile.name : ""));
    } catch (e) {
      try {
        await checkWgIsInstalled();
      } catch (e) {
        toast("Wireguard was not detected on the system. If you just installed it, try restarting wiregui.", { type: "error" });
        return;
      }
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
      <Flex direction="column" overflowY="auto" maxH="calc(100vh - 96px - 19px)" className="sidebar__list__container">
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
                color="whiteAlpha.700"
                onClick={({ passData }) => handleToggle(passData.name as string)}
              >
                {isActive(file.name) ? "Deactivate" : "Activate" }
              </ContextMenuItem>
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
