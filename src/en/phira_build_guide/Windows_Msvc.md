# Windows MSVC (requires MSVC, i.e. Microsoft Visual C++)

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
3. For static library files, download from [ESA](https://www.nuanr-mxi.com/prpr-avc.zip) or [EdgeOne](https://eo.nuanr-mxi.com/prpr-avc.zip) and extract to the project root. If prompted to overwrite, click overwrite.
4. Ensure you have `x64 Native Tools Command Prompt for VS 20**`. If you have cargo but not this environment, install `Visual Studio 20xx` separately, selecting `MSVC` and `Windows SDK` components during installation. After installation, you will have `x64 Native Tools Command Prompt for VS 20**`.
   - If you don't have cargo yet, follow step 1 to install it; you will also get `x64 Native Tools Command Prompt for VS 20**`.

## Building

1. Open `x64 Native Tools Command Prompt for VS 20**` and navigate to the project root (e.g., `D:\phira\`). **Note: Do NOT use regular cmd or PowerShell.**
2. Run `cargo build -r --bin phira-main`. If building an older version, the terminal may hang at `openssl-sys(build)` for a long time — this is normal, do not exit.
3. After the build, find the compiled binary in `.\target\release\`.
4. Copy all files from `.\assets\` to `.\target\release\assets\`. The build is now complete. Run `phira-main.exe` to check that resource files are intact.

- __Note: At the time this document was written, the repository did not include a complete set of resource files. If the program crashes on startup, download any package from the [Releases](https://github.com/TeamFlos/phira/releases) page and copy the missing resource files from there.__

## Troubleshooting

Q. Error: `failed to send request: connection timed out`

A. Check your network first and make sure GitHub is accessible. Mirrors should be treated as a fallback, not the default source.

Q. Error: `failed to send request: unable to resolve server name or address`

A. Check or change your DNS settings, then flush the DNS cache.

Q. Build error contains: `note: LINK : fatal error LNK1181: cannot open input file 'kernel32.lib'`

A. Missing Windows SDK. Check that Windows SDK is correctly installed and try again.

Q. Not challenging enough?

A. Try the [GNU build method](./Windows_Gnu.md) instead — it's slightly harder.

A2. You could try compiling the static library yourself — definitely more challenging. But I doubt you came to the build guide for a challenge...
