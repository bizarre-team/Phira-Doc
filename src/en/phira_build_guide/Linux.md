# Linux

## Preparation

1. Ensure that cargo is installed on your system. You can use `cargo -V` in the terminal to check if cargo is installed. If it is not installed, please click [here](./cargo.md) and follow the steps to install the build tools.
2. Download the source code from GitHub to your local machine:
    - If you are using a pure terminal environment, it is recommended to use git. Use `git clone https://github.com/TeamFlos/phira.git` to clone the repository locally.
    - If you are using a desktop environment, you can also click the Code button on the Phira repository page, select `Download ZIP` to download the code locally, and then extract it to any directory on your machine.
    - **If you cannot connect to GitHub, you can also use the accelerated addresses provided by git acceleration websites to clone or download.**
    - **If you want to build a specific version of Phira, go to the release page and select `Source code(tar.gz)` under Assets to download it locally, then extract it to any path.**
    - **Warning: To prevent build issues, we do not recommend including any characters other than those in the ASCII encoding in the path.**
3. Static library files: You can download from [here](https://s.07210700.xyz/prpr-avc.zip). After downloading, extract the files directly to the root directory of the code. If prompted to overwrite files, click "Overwrite."
4. Additional library files are required for the build process. Enter the following commands:
```shell
sudo apt update
sudo apt install libasound2-dev libgtk-3-dev -y
```

## Starting the Build

1. Open the terminal and navigate to the root directory of the code.
2. Enter `cargo build -r --bin phira-main` and wait until the compilation is complete.
3. Copy all files from the `.\assets\` directory to `.\target\release\assets\`. At this point, the entire build process is complete. If you have a desktop environment, you can directly run `phira-main` to check if the resource files are intact. If you do not have a desktop environment, the program will crash (tested that WSL is incompatible; running under WSL will cause a crash). This concludes the build process.

- **Note: At the time of writing this document, the resource files in the code directory are not complete. If you find that the main program crashes, you can go to the release page to download any version to obtain the resource files.**

## Common Issues

Q. Build outputs `failed to connect to GitHub`

A. Please check your network environment.

Q. Build error: `The pkg-config command could not be found`

A. The `pkg-config` command is missing. Install it using `sudo apt install pkg-config -y`.

Q. Build error: `failed to run custom build command for alsa-sys v0.3.1`

A. Missing library files.
