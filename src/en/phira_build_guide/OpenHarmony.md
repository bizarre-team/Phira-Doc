# OpenHarmony

## Prerequisites

1. First, add the `ohos` Rust target. If you have not installed `cargo` yet, follow [the official Rust guide](https://rust-lang.org/learn/get-started/) to install the build tools for your system.

For more information, see [ohos-rs](https://ohos.rs/).

```
rustup target add aarch64-unknown-linux-ohos
rustup target add armv7-unknown-linux-ohos  # theoretically optional
rustup target add x86_64-unknown-linux-ohos # theoretically optional, unless running on x86 emulator
```

2. Download the latest `DevEco Studio` and install the corresponding `NDK`. You can get it from [DevEco Studio (Windows/macOS)](https://developer.huawei.com/consumer/cn/deveco-studio/) or use [Command Line Tools (recommended for Linux)](https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos).

After installation, set an environment variable to help build the native module. Assuming your SDK is installed at `/path/Sdk`:

| Platform | NDK Path | How to Set |
|------|----------|------------------|
| **macOS** | `/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony` | Run in terminal:<br>`export OHOS_NDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony`<br>Add to `~/.zshrc` or `~/.bash_profile` to make it permanent |
| **Windows** | `C:/Program Files/Huawei/DevEco Studio/sdk/default/openharmony` | 1. Open System Environment Variables<br>2. Create a new system variable `OHOS_NDK_HOME`<br>3. Set the value to the path above<br>Or set temporarily in PowerShell:<br>`$env:OHOS_NDK_HOME="C:/Program Files/Huawei/DevEco Studio/sdk/default/openharmony"` |
| **Linux** | Custom path after installing Command Line Tools | Run in terminal:<br>`export OHOS_NDK_HOME=/your/download/path/openharmony`<br>Add to `~/.bashrc` or `~/.profile` to make it permanent |

> **Note**: `DevEco Studio` or `Command Line Tools` must be version 6.0.0 (API 20) or later. On macOS, only Apple Silicon is recommended for development.

3. Install `ohrs`:

```
cargo install ohrs
```

## Building

1. Clone the repositories first.

```
git clone https://github.com/TeamFlos/phira
git clone https://github.com/TeamFlos/phira-ohos
```

2. For the static library, download `aarch64-unknown-linux-ohos.tar.gz` from [prpr-avc-ffmpeg](https://github.com/TeamFlos/prpr-avc-ffmpeg/releases), then extract all `*.a` files into `phira/prpr-avc/static-lib/aarch64-unknown-linux-ohos`.

3. Add `config.toml` to configure the `cmake` location. This is required to compile Phira for the `ohos` target.

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

For **Windows**, create `cmake-wrapper.cmd` inside the project's `.cargo` folder. Temporary variables are used here to avoid conflicts with the system's default `cmake`:

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

4. Start the build:

```
phira> cd phira  # You must enter the phira subfolder, otherwise no build output will be generated
phira/phira> ohrs build --release --arch aarch  # You can omit --arch to build x86_64, armv7, and arm64 together, but current HarmonyOS devices are arm64
```

5. After the build succeeds, `libphira.so` will be located in `phira/dist/<arch>`.

6. The `phira-ohos` repository does not include resource files. Copy the `assets/` folder to `entry/src/main/resources/resfile/assets` in advance. If the app shows a black screen, go to the [Releases](https://github.com/TeamFlos/phira/releases) page, download any version, and copy the missing resource files into the same directory.

7. Enter the `phira-ohos` folder, rename `build-profile-nosigncfg.json5` to `build-profile.json5`, and then open it in `DevEco Studio`.

Connect your device, open `Project Structure`, find `Signing configs`, select `Automatically generate signature`, and click `Apply`. The project will then sync automatically.

![Project Structure location](/assets/img/phira_build_guide/ohos_project_structure.png)

The arrow shows where `Project Structure` is located.

Copy the generated `libphira.so` into `entry/libs/arm64-v8a`. Then click Build to run it on a HarmonyOS device.

## Troubleshooting

If you run into very strange build errors, consider switching to `WSL`, or even ~~ARM macOS~~, for compilation.

DevEco Studio does not have a native Linux version.
