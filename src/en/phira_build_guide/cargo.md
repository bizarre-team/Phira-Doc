# Cargo Installation

## Windows

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

### Windows Common Issues

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
