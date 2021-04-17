# Wire GUI

Wire GUI is a cross-platform graphical user interface for [wireguard](https://www.wireguard.com/).

## Features

- Connect and disconnect from wireguard tunnels
- List all your saved connections
- Show date when the connection was last connected
- Display current connected tunnel

## Download

Soon

## Known Issues

### When I try to toggle the tunnel if pops a dialog saying `access denied`

Currently the application needs to be ran as administrator to be able to toggle the tunnels, restart the application as administrator.

### Command  failed: Operation not permitted

Same problem as above, the applications needs to be ran as `sudo` in order to toggle the tunnels, you can start with `sudo wiregui`.
