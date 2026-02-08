# Android

## Build

::: warning
This build **does not include score upload** (similar to the Windows build).
:::

1. This guide uses **GitHub Actions** to build Android Phira; local build steps are TBD.
2. **Fork** the official Phira repo, create `.github/workflows/` and add a `.yml` file (any name).
3. Put the workflow content below into that file, commit, go to Actions → "Build Android Phira", **trigger the workflow** (choose branch if needed), wait ~5 minutes, then **download the artifact** and extract it.

::: tip
For armeabi-v7a, **replace** all "arm64-v8a" with "armeabi-v7a" and "aarch64-linux-android" with "armv7-linux-androideabi" (untested).
:::

```yaml
name: Build Android Phira

on:
  workflow_dispatch:

env:
  CARGO_TERM_COLOR: always
  ANDROID_HOME: ${{github.workspace}}/android-sdk
  ANDROID_NDK_HOME: ${{github.workspace}}/android-ndk-r27c
  ANDROID_NDK_ROOT: ${{github.workspace}}/android-ndk-r27c

jobs:
  Build:

    runs-on: ubuntu-24.04

    steps:
    - uses: actions/checkout@v4.2.2
    
    - run: |
        sudo apt-get update
        sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev libasound2-dev libssl-dev pkg-config
        # For compatibility of release v0.6.7 and stable channel of Rust
        sed -i 's/#!\[feature(local_key_cell_methods)\]//g' prpr/src/lib.rs
        
    - name: Download static-lib
      uses: suisei-cn/actions-download-file@v1.3.0
      id: downlod-static-lib
      with:
        url: "https://teamflos.github.io/phira-docs/phira_build_guide/prpr-avc.zip"
        target: ./

    - name: Set Up static-lib
      run: |
        unzip prpr-avc.zip -d ./

    - name: Install Android SDK Tools
      run: |
        wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip
        unzip commandlinetools-linux-8512546_latest.zip -d $ANDROID_HOME
        echo y | $ANDROID_HOME/cmdline-tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} "platform-tools" "build-tools;33.0.2" "platforms;android-35"

    - name: Install Android NDK
      run: |
        wget https://googledownloads.cn/android/repository/android-ndk-r27c-linux.zip
        unzip android-ndk-r27c-linux.zip -d ${{github.workspace}}

    - name: Install Rust Toolchains
      uses: actions-rs/toolchain@v1.0.6
      with:
        toolchain: stable
        target: aarch64-linux-android
    
    - name: Build for Android
      run: |
        cd phira
        cargo install cargo-ndk
        cargo ndk -t arm64-v8a --platform 35 build --release
    
    - name: Upload Artifact
      uses: actions/upload-artifact@v4
      with:
        name: android-build
        path: |
          target/aarch64-linux-android/release/libphira.so
```

## Replacing the library in the APK

> There is no packaging tool provided; you must manually replace `libphira.so` in an APK.

> **If you install and run as-is, you may see an error about quad_native.QuadNative.preprocessInput not found.**

### Method 1

1. Push `libphira.so` to your Android device (any path you know).
2. Download the APK for your architecture from the official Phira release; open it with MT Manager (or similar).
3. **Replace** `lib/arm64-v8a/libphira.so` (or armeabi-v7a) with your built `libphira.so`.
4. Open `classes.dex` with Dex Editor++, go to `org.flos.phira` and find the **QuadSurface** class.
5. Find the line that calls `preprocessInput` (e.g. around line 153) and remove or comment it.
6. Save, re-sign the APK as MT Manager instructs.
7. Optionally do an "APK coexistence" build if you need multiple installs.

### Method 2

#### Add this in `phira/src/lib.rs`:

```Rust
#[cfg(target_os = "android")]
#[no_mangle]
pub unsafe extern "C" fn Java_quad_1native_QuadNative_preprocessInput(
    _: *mut std::ffi::c_void,
    _: *const std::ffi::c_void,
    #[allow(dead_code)] motionEvent: ndk_sys::AInputEvent,
    #[allow(dead_code)] f: ndk_sys::jfloat,
    #[allow(dead_code)] f2: ndk_sys::jfloat,
    #[allow(dead_code)] z: ndk_sys::jboolean,
    #[allow(dead_code)] z2: ndk_sys::jboolean,
) {
    
}
```

## Credits

- Thanks to [qaqFei for testing](https://github.com/qaqFei/phira/tree/main).
