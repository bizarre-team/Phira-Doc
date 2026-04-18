# Windows GNU (requires GCC)

## Prerequisites

1. Make sure `cargo` is installed. Check using `cargo -V` in Command Prompt (cmd) or PowerShell. If you see one of the following:
    - `'cargo' is not recognized as an internal or external command, operable program or batch file.`
    - `cargo : The term 'cargo' is not recognized as the name of a cmdlet, function, script file, or operable program.`
    - Click [here](./cargo.md) to follow the installation steps.
2. Download the source code from GitHub:
    - If git is installed, run `git clone https://github.com/TeamFlos/phira.git` to clone the repository.
    - If git is not installed, go to the Phira repository page, click the Code button, select `Download ZIP`, and extract to any local directory.
    - __GitHub should be your primary source. Use a Git mirror or accelerator only if GitHub is genuinely inaccessible for you.__
    - __To build a specific version, go to the release page and download `Source code(zip)` from Assets.__
    - __Warning: To avoid hard-to-diagnose build issues, we recommend using a path that contains only ASCII characters.__
3. perl — check using `perl -v` in cmd or PowerShell. If not installed, open `MSYS2 UCRT64` and run `pacman -S perl`.
4. For static library files, download from [ESA](https://www.nuanr-mxi.com/prpr-avc.zip) or [EdgeOne](https://eo.nuanr-mxi.com/prpr-avc.zip) and extract to the project root. If prompted to overwrite, click overwrite.

## Building

1. Open cmd or PowerShell and navigate to the project root (e.g., `D:\phira\`).
2. Run `cargo build -r --bin phira-main`. If building an older version, the terminal may hang for a long time at `openssl-sys(build)` — this is normal, do not exit.
3. After the build, find the compiled binary in `.\target\release\`.
4. Copy all files from `.\assets\` to `.\target\release\assets\`. The build is now complete. Run `phira-main.exe` to check that resource files are intact.

- __Note: At the time this document was written, the repository did not include a complete set of resource files. If the program crashes on startup, download any package from the [Releases](https://github.com/TeamFlos/phira/releases) page and copy the missing resource files from there.__

## 32-bit Build

1. Open cmd or PowerShell and navigate to the project root (e.g., `D:\phira\`).
2. Download the static library above and extract to `phira\prpr-avc\static-lib`, or [build it yourself](./StaticLib.md#building-example-i686-pc-windows-gnu).
3. Run `cargo build --target=i686-pc-windows-gnu --release --package phira-main`. At `openssl-sys(build)`, this will take a very long time — do not exit.
4. After the build, find the compiled binary in `.\target\release\`.
5. Copy all files from `.\assets\` to `.\target\release\assets\`. Run `phira-main.exe` to check that resource files are intact.

- __Note: At the time this document was written, the repository did not include a complete set of resource files. If the program crashes on startup, download any package from the [Releases](https://github.com/TeamFlos/phira/releases) page and copy the missing resource files from there.__

## About the Static Library

- Moved to the [Static Library page](./StaticLib.md).

## Troubleshooting

Q. Error: `failed to send request: connection timed out`

A. Check your network first and make sure GitHub is accessible. Mirrors should be treated as a fallback, not the default source.

Q. Error: `failed to send request: unable to resolve server name or address`

A. Check or change your DNS settings, then flush the DNS cache.

Q. Build error: `error: failed to run custom build command for openssl-sys v0.9.99`

A. Missing perl. Check that perl is correctly installed and try again.

Q. Build error: `error occurred: Failed to find tool. Is gcc.exe installed? (see https://github.com/rust-lang/cc-rs#compile-time-requirements for help)`

A. Check that `MSYS2` is installed and that the environment variables are configured correctly.

Q. The following error appears:
```shell
Error building OpenSSL dependencies:

Command: "make" "depend"

Failed to execute: program not found
```
A. The `make` command is missing. Install it in the MSYS2 terminal with `pacman -S make`.

Q. Error contains: `This perl implementation doesn't produce unix like paths`

A. The `perl` in use is not compatible with `gcc`. Remove the existing `perl` from your environment variables or uninstall it.

Q. Error contains `undefined reference to libiconv`

A. There is an issue with `libiconv`. Install it in the MSYS2 terminal with `pacman -S libiconv`.

Q. Too complicated?

A. Try the [MSVC build method](./Windows_Msvc.md) instead — it's slightly simpler.
