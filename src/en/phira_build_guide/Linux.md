# Linux

## Preparation

1. Ensure that cargo is installed on your system. You can use `cargo -V` in the terminal to check if cargo is installed. If it is not installed, please click [here](./cargo.md#linux) and follow the steps to install the build tools.
2. Download the source code from GitHub to your local machine:
    - If you are using a pure terminal environment, it is recommended to use git. Use `git clone https://github.com/TeamFlos/phira.git` to clone the repository locally.
    - If you are using a desktop environment, you can also click the Code button on the Phira repository page, select `Download ZIP` to download the code locally, and then extract it to any directory on your machine.
    - **GitHub should be your primary source. If you genuinely cannot access GitHub, you may use a mirror or acceleration service as a fallback.**
    - **If you want to build a specific version of Phira, go to the release page and select `Source code(tar.gz)` under Assets to download it locally, then extract it to any path.**
    - **Warning: To avoid hard-to-diagnose build issues, we recommend using a path that contains only ASCII characters.**
3. Static library files: You can download from [ESA](https://www.nuanr-mxi.com/prpr-avc.zip) or [EdgeOne](https://eo.nuanr-mxi.com/prpr-avc.zip). After downloading, extract the files directly to the root directory of the code. If prompted to overwrite files, click "Overwrite."
4. Additional library files are required for the build process. Enter the following commands (using Debian-based systems as an example):
```shell
sudo apt update
sudo apt install libasound2-dev
sudo apt install libgtk-3-dev
```

## Starting the Build

1. Open the terminal and navigate to the root directory of the code.
2. Enter `cargo build -r --bin phira-main` and wait until the compilation is complete.
3. Copy all files from `./assets/` to `./target/release/assets/`. The build is then complete. If you have a desktop environment, you can run `phira-main` directly to check whether the resource files are intact. Without a desktop environment, the program may exit immediately. WSL has also been tested and is not suitable for running the app directly.

- **Note: At the time this document was written, the repository did not include a complete set of resource files. If the main program crashes on startup, download any package from the [Releases](https://github.com/TeamFlos/phira/releases) page and copy the missing resource files from there.**

## Common Issues

Q. Build outputs `failed to connect to GitHub`

A. Check your network environment first. GitHub is the recommended source; use mirrors only if GitHub is genuinely unreachable for you.

Q. Build error: `The pkg-config command could not be found`

A. The `pkg-config` command is missing. Install it using `sudo apt install pkg-config -y`.

Q. Build error: `failed to run custom build command for alsa-sys v0.3.1`

A. Missing library files.
