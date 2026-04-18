# HarmonyOS HAP Sideloading Guide

This page summarizes the general process for installing HAP packages on HarmonyOS devices. Menu names may vary across models and system versions, but the overall workflow is similar.

## Prerequisites

- Phira HAP package:
  - [GitHub Releases](https://github.com/TeamFlos/phira/releases)
  - [Dmocken's Phira download site](https://phira.dmocken.top/) (third-party mirror)
- A HarmonyOS device (this guide is mainly intended for non-Harmony NEXT devices)
- [Auto Installer (Xiaobai Debugging Assistant)](https://github.com/likuai2010/auto-installer/releases)

## Auto Installer (Xiaobai Debugging Assistant)

Download two packages from the GitHub Releases page:

- One of them should be a `.hap` or `.app` package (used for future in-app updates)
- The other can be a package for any platform
- **Make sure both downloads are the same version, otherwise they may not work together**

You may also be able to install the APK version of Auto Installer through Zhuoyitong, but this has not been tested. If you want to experiment, see [this release link](https://github.com/likuai2010/auto-installer/releases/tag/2.5.0).

::: tip
**Windows**: On first launch, it will prompt you to install Java. Just install it and continue.

**macOS**: On first launch, run `xattr -d com.apple.quarantine /Applications/小白调试助手.app` in Terminal, and make sure Java is installed.

**Linux**: Do not run as root. `zenity` is required: [zenity](https://gitlab.gnome.org/GNOME/zenity).
:::

## Enable Wireless Debugging

1. Open **Settings** -> **Device name**, then go to **About phone**.
2. Tap **Software version** 5 times quickly to enable Developer mode.
3. Go back to **Settings** -> **System** -> **Developer options**.
4. Find and enable **Wireless debugging**.
5. In the subpage, note the device IP address and port.

![Wireless debugging](/assets/img/help/无线调试.png)

## Developer Account

Sideloading requires signing with a developer account. Without real-name verification, sideloaded apps are valid for only 14 days; after verification, validity is extended to 180 days.

1. Open [Huawei Developer - Developer Information](https://developer.huawei.com/consumer/cn/console/setting/profile), then register or sign in with your Huawei account.
2. Fill in your profile and complete real-name verification.

## Sideload Phira

1. Sign in

   Click **Sign in**, log in to your Huawei account in the browser, click **Allow**, and wait until you see "Login successful! Please return!".

2. Connect device

   Click **Connect device**, enter the IP and port you obtained above, then connect.

   ![Connect device](/assets/img/help/连接设备.png)

3. Select the `.hap` or `.app` file

   Click **Select**, choose the downloaded Phira HAP package, and confirm the package name/device compatibility shown in the tool.

4. Start sideloading

   Click **Start debugging** and wait until all steps complete successfully. If an error appears, fix it based on the error message and retry **Start debugging**.

## Easy Updates

Use the same method to sideload Auto Installer's own `.hap` or `.app` package. After that, future app updates can send the new HAP package directly to Auto Installer. You only need to sign in to your Huawei account and reconnect the device to sideload updates quickly.

## Others

- Check debugging certificate validity: [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/harmonyOSDevPlatform/9249519184596237889)
