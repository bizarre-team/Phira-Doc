# Running a Phira Multiplayer Server on Android

## Using a pre-built binary

1. Download and install [ZeroTermux](https://github.com/hanxinhao000/ZeroTermux/releases/tag/ZeroTermux-0.118.3.53) (Termux also works).
2. Run `apt update && apt upgrade`.
3. Copy the URL of the prebuilt binary from the [Phira download site](https://phira.dmocken.top/mulity).
4. Run `wget [url]` to download.
5. Run `./phira-mp-server` or `RUST_LOG=debug ./phira-mp-server` to start (second adds logging).
6. To use a custom port, add `--port [port]`, e.g. `RUST_LOG=debug ./phira-mp-server --port 11451`.
7. For public access, set up port forwarding or a tunnel yourself.

## Building the server yourself

1. Install [ZeroTermux](https://github.com/hanxinhao000/ZeroTermux/releases/tag/ZeroTermux-0.118.3.53) (or Termux).
2. Open ZeroTermux, accept the agreement, then swipe in from the left edge and use the menu to switch package sources if needed. Press Enter through the Y/I/N prompts as required.
3. Run `pkg install rust`.
4. Run `pkg install pkg-config`.
5. Run `pkg install git`.
6. Run `git clone https://github.com/TeamFlos/phira-mp.git` (use a proxy if needed).
7. Run `chmod -c 755 phira-mp`.
8. Run `cd phira-mp`.
9. Run `cargo update`.
10. Run `cargo build --release -p phira-mp-server` (or `cargo run` to run directly).
11. The binary will be in `/data/data/.../phira-mp/target/release` (path depends on Termux).

## Restarting the server

- In ZeroTermux, go to the folder containing `phira-mp-server` and run `./phira-mp-server`. If you built it from source, the binary is located under `phira-mp/target/release`.

## FAQ

1. If you see `warning: spurious network error (3 tries remaining)... HTTP/2 stream...` during build, try enabling a VPN and running the build again.
2. Build can take a long time; ensure a stable network.
3. For doc errors, contact @Dmocken in the [Phira QQ channel](https://pd.qq.com/s/ezgv3q71g) or use [Feedback](https://phira.dmocken.top/report).

[Phira FAQ (updated regularly)](/en/help/)
