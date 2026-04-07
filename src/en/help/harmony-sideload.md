# HarmonyOS HAP Sideloading Guide

This page summarizes the general process for installing HAP packages on HarmonyOS devices. Menu names may vary across models and system versions, but the overall workflow is similar.

## Prerequisites

- [Phira HAP package](https://phira.dmocken.top/)
- A HarmonyOS device (non-Harmony NEXT devices are recommended for this guide)
- [Auto Installer (Xiaobai Debugging Assistant)](https://github.com/likuai2010/auto-installer/releases)

## Auto Installer (Xiaobai Debugging Assistant)

Download two packages from the GitHub Releases page:

- One of them should be a `.hap` package (used for future in-app updates)
- The other can be any platform package

::: tip
**Windows**: On first launch, it will prompt you to install Java. Just install it and continue.

**macOS**: On first launch, run `xattr -d com.apple.quarantine /Applications/小白调试助手.app` in Terminal, and make sure Java is installed.

**Linux**: Do not run as root. `zenity` is required: [zenity](https://gitlab.gnome.org/GNOME/zenity).
:::

## Enable Wireless Debugging

1. Open **Settings** → **Device name** and go to **About phone**.
2. Tap **Software version** 5 times quickly to enable Developer mode.
3. Go back to **Settings** → **System** → **Developer options**.
4. Find and enable **Wireless debugging**.
5. In the subpage, note the device IP address and port.

![Wireless debugging](/assets/img/help/无线调试.png)

## Developer Account

Sideloading requires signing with a developer account. Without real-name verification, sideloaded apps are valid for only 14 days; after verification, validity is extended to 180 days.

1. Open [Huawei Developer - Developer Information](https://developer.huawei.com/consumer/cn/console/setting/profile), then register or sign in with your Huawei account.
2. Fill in your profile and complete real-name verification.

## Sideload Phira

1. Sign in

   Click **Sign in**, log in to your Huawei account in the browser, click **Allow**, and wait for “Login successful! Please return!”.

2. Connect device

   Click **Connect device**, enter the IP and port you obtained above, then connect.

   ![Connect device](/assets/img/help/连接设备.png)

3. Select the `.hap` file

   Click **Select**, choose the downloaded Phira HAP package, and confirm the package name/device compatibility shown in the tool.

4. Start sideloading

   Click **Start debugging** and wait until all steps complete successfully. If an error appears, fix it based on the error message and retry **Start debugging**.

## Easy Updates

You can use the same method to sideload the Auto Installer `.hap` package. Later updates will download a HAP package and send it to Auto Installer. After signing in and connecting the device, you can quickly sideload updates.

## Others

- Check debugging certificate validity: [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/harmonyOSDevPlatform/9249519184596237889)
