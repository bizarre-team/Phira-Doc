# Cargo Installation

## Windows GNU Toolchain

- The Windows GNU toolchain relies on the GCC build toolchain and is relatively complex to set up. If you prefer a simpler build method, refer to the MSVC toolchain installation below. Follow these steps:

1. Click [here](https://win.rustup.rs/) to download the build tool installer.
2. Double-click `rustup-init.exe` to open the installation window; input `2`, then input `y`, then input `2` again, and then input `x86_64-pc-windows-gnu`. Finally, press Enter all the way to start the installation until you see the output `Rust is installed now. Great!`
    - __Note: Do NOT simply press Enter to install MSVC directly, as this will cause numerous issues in subsequent builds!__

3. Go to the [MSYS2](https://www.msys2.org/) official website to download the MSYS2 installer. After downloading, double-click to open it. If you have no special requirements, proceed by clicking "Next" all the way until prompted with `Finished the MSYS2 Setup`. Click the button in the lower right corner, and a window will pop up. Enter the following commands, and press Enter all the way during the installation process.
    ```shell
    pacman -Sy && pacman -Syu
    pacman -S mingw-w64-x86_64-toolchain
    ```
4. Open Command Prompt (cmd) or PowerShell, and enter `cargo -V` to check if the installation was successful. If the version number is returned, the installation is successful. If other prompts appear, please refer to the Windows Common Issues section.
5. Modify the environment variables as shown in the following images:
![sys_path_I](/assets/img/phira_build_guide/sys_path_I.png)
![sys_path_II](/assets/img/phira_build_guide/sys_path_II.png)
![sys_path_III](/assets/img/phira_build_guide/sys_path_III.png)
![sys_path_IV](/assets/img/phira_build_guide/sys_path_IV.png)
![sys_path_V](/assets/img/phira_build_guide/sys_path_V.png)
6. Open Command Prompt (cmd) or PowerShell, and enter `gcc -v` to check if the installation was successful. If the version number is returned, the installation is successful. If other prompts appear, please refer to the Windows Common Issues section.

### Windows GNU Toolchain Common Issues

Q. The downloaded build tool flashes and exits when double-clicked after a successful download.

A. Please do not change the file name.

## Windows MSVC Toolchain

- The Windows MSVC toolchain relies on the Microsoft Visual C++ build toolchain and is relatively simple (as long as you don't want to manually build the static library). Follow these steps:

1. Click [here](https://win.rustup.rs/) to download the build tool installer.
2. Double-click `rustup-init.exe` to open the installation window; input `1`. Follow the prompts from `Visual Studio Installer` to complete the installation, then return to the `rustup` console and press Enter until you see `Rust is installed now. Great!`
3. Reopen `Visual Studio Installer`, click `Modify` next to `Visual Studio Community 2022`, search for `SDK` under `Individual components`, and install `Windows 11 SDK` (you may use another SDK version as needed).
4. Open `x64 Native Tools Command Prompt for VS 20**`, enter `cargo -V` to verify the installation. If a version number is returned, the installation is successful. Otherwise, refer to the Windows MSVC Toolchain Common Issues section.

### Windows MSVC Toolchain Common Issues

Q. The downloaded build tool flashes and exits when double-clicked after a successful download.

A. Please do not change the file name.

## Linux

### Debian-based Linux Systems

1. Open a terminal and enter the following commands:
```shell
sudo apt update
sudo apt install cargo -y
```
2. If no errors occur, enter `cargo -V` to check if the version number is output. If other outputs appear, please refer to the Linux Common Issues section.

Other systems to be added.

### Linux Common Issues

Q. When entering `cargo`, it outputs `bash: /usr/bin/cargo: No such file or directory` or `cargo: command not found`.

A. Cargo was not installed successfully. Please check if other information was output after the installation completed.

## macOS

1. Open the terminal and run the following command:
```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
2. When prompted, input `1` and press Enter until you see `Rust is installed now. Great!`
3. Open the terminal, enter `cargo -V` to verify the installation. If a version number is returned, the installation is successful. Otherwise, refer to the macOS Common Issues section.
4. Go to [Xcode Downloads](https://developer.apple.com/download/all/?q=Xcode) to download Xcode. After downloading, extract and move it to `/Applications`. Then go to [Command Line Tools Downloads](https://developer.apple.com/download/all/?q=Command%20Line%20Tools) to download the command line tools. After downloading, double-click to install and follow the prompts.

Other systems to be added.

### macOS Common Issues

Q. Timeout when installing Cargo.

A. Please check your network environment.

Q. Running `cargo` outputs `zsh: command not found: cargo`.

A. Cargo was not installed successfully. Please check if other information was output after the installation completed.
