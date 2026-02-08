# Windows

## Preparation Phase

1. Ensure that cargo is installed on your system. You can use `cargo -V` in Command Prompt (cmd) or PowerShell to check if cargo is installed. If you see the following prompts:
    ```shell
    'cargo' is not recognized as an internal or external command, operable program or batch file.
    cargo : The term 'cargo' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
    ```
    - Please click [here](./cargo.md) and follow the steps to install the build tools.
2. Download the source code from GitHub to your local machine:
    - If you have git installed, use `git clone https://github.com/TeamFlos/phira.git` to clone the repository locally.
    - If you do not have git installed, you can also click the Code button on the Phira repository page, select `Download ZIP` to download the code locally, then extract it to any directory on your machine.
    - **If you cannot connect to GitHub, you can also use the accelerated addresses provided by git acceleration websites to clone or download.**
    - **If you want to build a specific version of Phira, go to the release page and select `Source code(zip)` under Assets to download it locally, then extract it to any path.**
    - **Warning: To prevent build issues, we do not recommend including any characters other than those in the ASCII encoding in the path.**
3. Perl: You can use `perl -v` in Command Prompt (cmd) or PowerShell to check if perl is installed. If not, search for and open `MSYS2 UCRT64` and enter `pacman -S perl` to install perl.
4. Static library files: You can download from [here](./prpr-avc.zip) . After downloading, extract the files directly to the root directory of the code. If prompted to overwrite files, click "Overwrite."

## Starting the Build

1. In Command Prompt (cmd) or PowerShell, navigate to the root directory of the code (e.g., `D:\phira\`).
2. In Command Prompt (cmd) or PowerShell, use `cargo build -r --bin phira-main`. If everything goes smoothly, you will be stuck for a very long time at `openssl-sys(build)`. Do not exit; this is normal.
3. After the build is complete, you can find the compiled main program in the `.\target\release\` directory.
4. Copy all files from the `.\assets\` directory to `.\target\release\assets\`. At this point, the entire build process is complete. You can directly run `phira-main.exe` to check if the resource files are intact.

:::warning
Note: At the time of writing this document, the resource files in the code directory are not complete. If you find that the main program crashes, you can go to the release page to download any version to obtain the resource files.
:::

## 32-bit Version

1. In Command Prompt (cmd) or PowerShell, navigate to the root directory of the code (e.g., `D:\phira\`).
2. Download the static library files mentioned above and extract them to `phira\prpr-avc\static-lib`, or build them yourself.
3. In Command Prompt (cmd) or PowerShell, use `cargo build --target=i686-pc-windows-gnu --release --package phira-main`. If everything goes smoothly, you will be stuck for a very long time at `openssl-sys(build)`. Do not exit; this is normal.
4. After the build is complete, you can find the compiled main program in the `.\target\release\` directory.
5. Copy all files from the `.\assets\` directory to `.\target\release\assets\`. At this point, the entire build process is complete. You can directly run `phira-main.exe` to check if the resource files are intact.

## About Building Static Libraries (Using i686-pc-windows-gnu as an Example)

Operate in a shell (using msys2 here):

```sh
git clone https://git.ffmpeg.org/ffmpeg.git --depth=1
cd ffmpeg && mkdir build && cd build
../configure --disable-programs --disable-doc --disable-everything --disable-debug --arch=i686 --target_os=mingw32 --cross-prefix=i686-w64-mingw32-
make
```
> [!NOTE]
> There's a pitfall here... If you encounter an error, try copying `i686-w64-mingw32-gcc-ar.exe`, `i686-w64-mingw32-gcc-nm.exe`, and `i686-w64-mingw32-gcc-ranlib.exe` from the `msys64\mingw32\bin` directory, paste them, and rename them to `i686-w64-mingw32-ar.exe`, `i686-w64-mingw32-nm.exe`, and `i686-w64-mingw32-ranlib.exe`.

Then, copy all files in the `build` folder that look like `*.a` to `phira\prpr-avc\static-lib\i686-pc-windows-gnu`, and you're done!

## Common Issues

Q. Error: `failed to send request: operation timed out`

A. Please check your network environment to ensure you can access GitHub normally.

Q. Error: `failed to send request: could not resolve server name or address`

A. Check your DNS or change your DNS. After changing, refresh your DNS cache.

Q. Error during build: `error: failed to run custom build command for openssl-sys v0.9.99`

A. Perl is missing. Please check if perl is correctly installed and try again.

Q. Build error: `error occurred: Failed to find tool. Is gcc.exe installed? (see https://github.com/rust-lang/cc-rs#compile-time-requirements for help)`

A. Please check if `MSYS2` is installed and if the environment variables are configured.

Q. The following error occurs:

```shell
Error building OpenSSL dependencies:
Command: "make" "depend"
Failed to execute: program not found
```

A. The `make` command is missing. Please go to the MSYS2 terminal and install this command using `pacman -S make`.

Q. Error includes: `This perl implementation doesn't produce Unix-like paths`

A. The `perl` being used is not compatible with `gcc`. Please remove the environment variables for the existing `perl` or directly uninstall the existing `perl`.

Q. Error includes: `undefined reference to libiconv`

A. There is an issue with the `libiconv` being used. Please use `pacman -S libiconv` in the MSYS2 terminal.

Q. This is too troublesome.

A. Just go to the release page and download it. We have every right to love Microsoft.
