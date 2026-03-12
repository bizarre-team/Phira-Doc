# OpenHarmony

## Prerequisites

1. First, add the ohos target platform. If you haven't installed `cargo` yet, click [here](https://rust-lang.org/learn/get-started/) to install the build tools for your system.

For more information, refer to [ohos-rs](https://ohos.rs/).

```
rustup target add aarch64-unknown-linux-ohos
rustup target add armv7-unknown-linux-ohos  # theoretically optional
rustup target add x86_64-unknown-linux-ohos # theoretically optional, unless running on x86 emulator
```

2. Download the latest `DevEco-Studio` and install the corresponding `NDK`. You can find it at [DevEco Studio (Windows/macOS)](https://developer.huawei.com/consumer/cn/deveco-studio/) or configure [Command Line Tools (recommended for Linux)](https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos).

After downloading, set an environment variable to help build the native module. Assuming your SDK is installed at `/path/Sdk`:

| Platform | NDK Path | How to Set |
|------|----------|------------------|
| **macOS** | `/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony` | Run in terminal:<br>`export OHOS_NDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony`<br>Add to `~/.zshrc` or `~/.bash_profile` to make it permanent |
| **Windows** | `C:/Program Files/Huawei/DevEco Studio/sdk/default/openharmony` | 1. Open System Environment Variables<br>2. Create a new system variable `OHOS_NDK_HOME`<br>3. Set the value to the path above<br>Or set temporarily in PowerShell:<br>`$env:OHOS_NDK_HOME="C:/Program Files/Huawei/DevEco Studio/sdk/default/openharmony"` |
| **Linux** | Custom path after installing Command Line Tools | Run in terminal:<br>`export OHOS_NDK_HOME=/your/download/path/openharmony`<br>Add to `~/.bashrc` or `~/.profile` to make it permanent |

> **Note**: `DevEco Studio` or `Command Line Tools` version must be at least 6.0.0 (API 20). Only ARM macOS is recommended for development.

3. Install ohrs:

```
cargo install ohrs
```

## Building

1. First, clone the repositories.

```
git clone https://github.com/TeamFlos/phira
git clone https://github.com/TeamFlos/phira-ohos
```

2. For the static library, download `aarch64-unknown-linux-ohos.tar.gz` from [prpr-avc-ffmpeg](https://github.com/TeamFlos/prpr-avc-ffmpeg/releases) and extract all `*.a` files to `phira/prpr-avc/static-lib/aarch64-unknown-linux-ohos`.

3. Add `config.toml` to configure the cmake location, required for compiling phira for the ohos platform.

```
$ cd phira
```

For **Linux**:

`.cargo/config.toml`

```
[env]
CMAKE = "/your/ohos/sdk/command-line-tools/sdk/default/openharmony/native/build-tools/cmake/bin/cmake"
CMAKE_TOOLCHAIN_FILE_aarch64-unknown-linux-ohos = "/your/ohos/sdk/command-line-tools/sdk/default/openharmony/native/build/cmake/ohos.toolchain.cmake"
CMAKE_GENERATOR = "Ninja"
CMAKE_MAKE_PROGRAM = "/your/ohos/sdk/command-line-tools/sdk/default/openharmony/native/build-tools/cmake/bin/ninja"
OHOS_NDK_HOME = "/your/ohos/sdk/command-line-tools/sdk/default/openharmony"
```

For **Windows**, create `cmake-wrapper.cmd` in the project's `.cargo` folder. We use temporary variables to avoid conflicts with the system's default cmake:

`.cargo/cmake-wrapper.cmd`

```
@echo off
set PATH=D:/your/ohos/sdk/default/openharmony/native/build-tools/cmake/bin;%PATH%
"D:/your/ohos/sdk/default/openharmony/native/build-tools/cmake/bin/cmake.exe" %*
```

`.cargo/config.toml`

```
[env]
CMAKE = "your/project/path/.cargo/cmake-wrapper.cmd"
CMAKE_TOOLCHAIN_FILE_aarch64-unknown-linux-ohos = "D:/your/ohos/sdk/default/openharmony/native/build/cmake/ohos.toolchain.cmake"
CMAKE_GENERATOR = "Ninja"
CMAKE_MAKE_PROGRAM = "D:/your/ohos/sdk/default/openharmony/native/build-tools/cmake/bin/ninja.exe"
```

4. Start building:

```
phira> cd phira  # Must enter the phira subfolder, otherwise no output will be generated
phira/phira> ohrs build --release --arch aarch  # --arch can be omitted to build for x86_64, armv7, and arm64; current HarmonyOS devices are all arm64
```

5. After a successful build, find `libphira.so` in `phira/dist/<arch>`.

6. The `phira-ohos` repository does not include resource files. Copy the `assets/` folder to `entry/src/main/resources/resfile/assets` beforehand. If the main program shows a black screen, go to the [Release](https://github.com/TeamFlos/phira/releases) page, download any version, and copy the missing resource files to the same directory.

7. Enter the `phira-ohos` folder, rename `build-profile-nosigncfg.json5` to `build-profile.json5`, then open `DevEco Studio`.

Connect your device, go to `Project Structure`, find `Signing configs`, select `Automatically generate signature`, and click `Apply`. The project will automatically trigger a Sync.

![](image.png)

The location of Project Structure is shown by the arrow.

Copy the generated `libphira.so` to the `entry/libs/arm64-v8a` folder. Click Build to run on an ohos device.

## Troubleshooting

If you encounter very strange build errors, consider switching to ~~ARM macOS~~ or `WSL` for compilation.

DevEco Studio does not have a native Linux version.
