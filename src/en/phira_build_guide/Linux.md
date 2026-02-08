# Linux

## Preparation

1. Check for cargo: run `cargo -V` in a terminal. If not installed, see [here](./cargo.md).
2. Get the source:
   - CLI: `git clone https://github.com/TeamFlos/phira.git`
   - Or on the repo page: Code → Download ZIP, then extract.
   - If you cannot reach GitHub, use a mirror. For a specific version, download `Source code (tar.gz)` from release Assets.
   - **Warning: avoid non-ASCII in the path.**
3. Static libs: [download](./prpr-avc.zip) or [mirror](https://www.nuanr-mxi.com/prpr-avc.zip), extract into repo root.
4. Install dependencies:
   ```shell
   sudo apt update
   sudo apt install libasound2-dev
   sudo apt install libgtk-3-dev
   ```

## Build

1. Open a terminal and `cd` to the repo root.
2. Run `cargo build -r --bin phira-main` and wait for completion.
3. Copy everything from `./assets/` to `./target/release/assets/`. Then run `phira-main` (with a desktop environment; without one, or in WSL, the app may exit immediately). If the app crashes, get assets from a release.

## FAQ

Q. `failed to connect to GitHub`  
A. Check your network.

Q. `The pkg-config command could not be found`  
A. Install: `sudo apt install pkg-config -y`.

Q. `failed to run custom build command for alsa-sys v0.3.1`  
A. Install the required libraries (e.g. libasound2-dev, libgtk-3-dev as above).
