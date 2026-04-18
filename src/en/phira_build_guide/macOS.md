# macOS

## Prerequisites

1. Make sure `cargo` and Xcode are installed. Run `cargo -V` in the terminal to check. If not installed, click [here](./cargo.md#macos) to follow the installation steps.
2. Download the source code from GitHub:
    - Using git, run `git clone https://github.com/TeamFlos/phira.git` in the terminal to clone the repository.
    - Alternatively, on the Phira repository page, click the Code button, select `Download ZIP`, and extract to any local directory.
    - __GitHub should be your primary source. Use a Git mirror or accelerator only if GitHub is genuinely inaccessible for you.__
    - __To build a specific version of Phira, go to the [release](https://github.com/TeamFlos/phira/releases) page, download `Source code (tar.gz)` from Assets, and extract to any path.__
    - __Warning: To avoid hard-to-diagnose build issues, we recommend using a path that contains only ASCII characters.__
3. For the static library files, download from [ESA](https://www.nuanr-mxi.com/prpr-avc.zip) or [EdgeOne](https://eo.nuanr-mxi.com/prpr-avc.zip). After downloading, extract directly to the project root directory. If prompted to overwrite files, click overwrite.

## Building

1. Open the terminal and navigate to the project root directory.
2. Run `cargo build -r --bin phira-main` and wait for compilation to finish.
3. Copy all files from the `./assets/` directory to `./target/release/assets/`. The build process is now complete. You can run `phira-main` to verify that the resource files are intact.

- __Note: At the time this document was written, the repository did not include a complete set of resource files. If the main program crashes on startup, download any package from the [Releases](https://github.com/TeamFlos/phira/releases) page and copy the missing resource files from there.__

## Troubleshooting

Q. Build output: `failed to connect to GitHub`

A. Check your network environment first. If GitHub remains unreachable, you can download [prpr-miniquad](https://github.com/Mivik/prpr-miniquad), [prpr-macroquad](https://github.com/Mivik/prpr-macroquad), [sasa](https://github.com/Mivik/sasa), and [phira-mp](https://github.com/TeamFlos/phira-mp) manually, then point to their local paths in `Cargo.toml` before rebuilding.

If you run into other issues, please update the documentation or report them so this guide can be improved.
