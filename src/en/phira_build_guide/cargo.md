# Cargo installation

## Windows

1. Download the build tools from [https://win.rustup.rs/](https://win.rustup.rs/).
2. Run `rustup-init.exe`. Enter `2`, then `y`, then `2`, then `x86_64-pc-windows-gnu`, then press Enter through the rest until you see `Rust is installed now. Great!`
   - **Do not use the default MSVC option; it causes many build issues later.**

3. Download [MSYS2](https://www.msys2.org/), install it, then in the MSYS2 shell run:
   ```shell
   pacman -Sy && pacman -Syu
   pacman -S mingw-w64-x86_64-toolchain
   ```
   - If you cannot reach GitHub, you can try a [mirror](https://www.nuanr-mxi.com/msys.exe) for MSYS2 (mirror may be slower and not latest).
4. In cmd or PowerShell, run `cargo -V` to confirm. If you see a version, installation succeeded; otherwise see Windows FAQ.
5. Add the required paths to your system PATH (see the images in the source: sys_path_I through sys_path_V).
6. Run `gcc -v` to confirm GCC; if not, see Windows FAQ.

### Windows FAQ

Q. The installer window closes immediately after download  
A. Do not rename the downloaded file.

## Linux

### Debian-based

1. In a terminal:
   ```shell
   sudo apt update
   sudo apt install cargo -y
   ```
2. Run `cargo -V`. If you see a version, installation succeeded. Other distros TBD.

### Linux FAQ

Q. `shell: /usr/bin/cargo: No such file or directory` or `cargo: command not found`  
A. Cargo did not install correctly; check for any error messages during installation.
