# Windows

## Preparation

1. Check for cargo: in cmd or PowerShell run `cargo -V`. If you see:
   ```shell
   `'cargo' is not recognized as an internal or external command...`
   or PowerShell equivalent,
   ```
   then install the build tools: see [here](./cargo.md).
2. Get the source:
   - With git: `git clone https://github.com/TeamFlos/phira.git`
   - Without git: on the Phira repo page click Code → Download ZIP, then extract.
   - If you cannot reach GitHub, use a git mirror. For a specific version, download `Source code (zip)` from the release Assets and extract.
   - **Warning: avoid non-ASCII characters in the path to prevent build issues.**
3. Perl: run `perl -v`. If not installed, open MSYS2 UCRT64 and run `pacman -S perl`.
4. Static libs: [download](./prpr-avc.zip) or from [mirror](https://www.nuanr-mxi.com/prpr-avc.zip), then extract into the repo root (overwrite if prompted).

## Build

1. In cmd or PowerShell, `cd` to the repo root (e.g. `D:\phira\`).
2. Run `cargo build -r --bin phira-main`. It may hang for a long time at `openssl-sys(build)`; that is normal.
3. After build, the binary is in `.\target\release\`.
4. Copy everything from `.\assets\` to `.\target\release\assets\`. Then you can run `phira-main.exe` to verify.
   - At the time of writing, repo assets may be incomplete; if the app crashes, download any release and use its assets.

## 32-bit build

1. `cd` to repo root.
2. Extract the static libs into `phira\prpr-avc\static-lib` or build them yourself.
3. Run `cargo build --target=i686-pc-windows-gnu --release --package phira-main`. Again, long wait at openssl-sys is normal.
4. Binary in `.\target\release\`. Copy `.\assets\` to `.\target\release\assets\`.

## Building static libs (e.g. i686-pc-windows-gnu)

In a shell (e.g. MSYS2):

```sh
git clone https://git.ffmpeg.org/ffmpeg.git --depth=1
cd ffmpeg && mkdir build && cd build
../configure --disable-programs --disable-doc --disable-everything --disable-debug --arch=i686 --target_os=mingw32 --cross-prefix=i686-w64-mingw32-
make
```
> [!NOTE]
> If you get errors, try copying from `msys64\mingw32\bin` the files `i686-w64-mingw32-gcc-ar.exe`, `i686-w64-mingw32-gcc-nm.exe`, `i686-w64-mingw32-gcc-ranlib.exe` and renaming the copies to `i686-w64-mingw32-ar.exe`, `i686-w64-mingw32-nm.exe`, `i686-w64-mingw32-ranlib.exe`. Then copy all `*.a` from `build` to `phira\prpr-avc\static-lib\i686-pc-windows-gnu`.

## FAQ

Q. `failed to send request: operation timed out`  
A. Check network and access to GitHub.

Q. `failed to send request: could not resolve server name or address`  
A. Check or change DNS and flush DNS cache.

Q. `error: failed to run custom build command for openssl-sys v0.9.99`  
A. Perl is missing or wrong; install/check Perl.

Q. `Failed to find tool. Is gcc.exe installed?`  
A. Install MSYS2 and add it to PATH.

Q. `Error building OpenSSL... "make" "depend" ... program not found`  
A. Install make in MSYS2: `pacman -S make`.

Q. `This perl implementation doesn't produce unix like paths`  
A. Your Perl is not compatible with this gcc; remove it from PATH or uninstall.

Q. `undefined reference to libiconv`  
A. Install in MSYS2: `pacman -S libiconv`.

Q. This is too much hassle  
A. You can just download a build from the release page.
