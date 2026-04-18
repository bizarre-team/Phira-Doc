# Static Library (prpr-avc)

## Introduction

- This is the static library used by Phira for video decoding. It is compiled from [FFmpeg commit hash 4a80db5fc2b1b134550ffbcb8fd3b7ce2ad734b3](https://github.com/FFmpeg/FFmpeg/commit/4a80db5fc2b1b134550ffbcb8fd3b7ce2ad734b3).
- The FFmpeg version used for Phira's static library does not need to be followed too strictly in general. You may choose another version, but if you are contributing changes related to audio or video decoding, please follow this specific version. The officially provided static library is built from this version, while contributor-built libraries may differ.
- Pre-compiled static libraries can be downloaded from [ESA](https://www.nuanr-mxi.com/prpr-avc.zip) or [EdgeOne](https://eo.nuanr-mxi.com/prpr-avc.zip). After downloading, extract directly to the project root. If prompted to overwrite, click overwrite.
- prpr-avc only includes the minimal FFmpeg components, compiled with these options:

```shell
--disable-everything \
--enable-decoder=h264 \
--enable-decoder=aac \
--enable-decoder=aac_latm \
--enable-decoder=flac \
--enable-decoder=mp3 \
--enable-decoder=vorbis
```

## Building (Example: i686-pc-windows-gnu)

1. Download [FFmpeg n5.1.8 source code (GitHub)](https://github.com/FFmpeg/FFmpeg/archive/refs/tags/n5.1.8.tar.gz) and extract to any directory.
   - _As noted above, the FFmpeg version does not need to be strictly enforced. You may use other versions, but when contributing audio/video decoding changes, please follow the specified version._
2. Run the following in `sh` (using msys2 here). Note that the FFmpeg source code should be copied to `C:\msys64\home\your-username`. The build options below are only an example; adjust them as needed after checking the FFmpeg documentation:

```sh
cd FFmpeg-n5.1.8 && mkdir build && cd build

../configure \
  --disable-programs \
  --disable-doc \
  --disable-everything \
  --disable-debug \
  --arch=i686 \
  --target_os=mingw32 \
  --cross-prefix=i686-w64-mingw32-
  
make
```

Note: There is a common pitfall here. If you get errors, try copying `i686-w64-mingw32-gcc-ar.exe`, `i686-w64-mingw32-gcc-nm.exe`, and `i686-w64-mingw32-gcc-ranlib.exe` from `msys64\mingw32\bin`, then rename them to `i686-w64-mingw32-ar.exe`, `i686-w64-mingw32-nm.exe`, and `i686-w64-mingw32-ranlib.exe`.

Then copy all `*.a` files from the build folder into `phira\prpr-avc\static-lib\i686-pc-windows-gnu`.

- __Note: The steps above only ensure that Cargo can compile and output the main program. If you want actual video decoding support, you must enable `protocol=file`, decoders, parsers, and similar options in `configure`, as mentioned in the introduction.__

## Building the MSVC Static Library

- Since FFmpeg's `configure` system is not designed for MSVC, building it is extremely challenging. We do not recommend building the MSVC version yourself. If you need the MSVC static library, [download it directly](https://www.nuanr-mxi.com/prpr-avc.zip).
- If you still want to try, refer to the GNU build method above together with [this tutorial](https://github.com/ffiirree/ffmpeg-tutorials/blob/master/compile_on_windows.md).
