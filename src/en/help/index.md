# Phira FAQ

This is the *Phira FAQ* written by Phira support volunteers. Before playing Phira, please read and agree to the official [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy).

::: details Below are the updates in v0.7.1:
   - ! Added chart collaborators. For details, see https://teamflos.github.io/phira-docs/chart-management/collaborator.html
   - Added pull-to-refresh for favorites
   - Fixed an issue where some resource packs caused judge lines and effects to disappear
   - Fixed an issue where charts could not be exported in batches
   - Fixed an issue where notes could not be judged after dragging the progress bar in Practice Mode
   - Fixed an issue where online charts could not be added to local favorites
   - Fixed an issue where Hold notes were not supported in the RPE judgment area
   - Fixed an issue where the "score will not be recorded" prompt was missing when playing with a keyboard.
:::

If you find any issues in this document, contact [@Dmocken](https://github.com/Dmocken) in the [Phira QQ channel](https://pd.qq.com/s/ezgv3q71g) or use the [Feedback](https://phira.dmocken.top/report) page.

::: danger MUST-READ FOR NEW PLAYERS!!!
- If you are a new Phira player coming from video platforms, or if this is your first time playing a falling-note music game, it is highly recommended that you first [head to Google Play to download Phigros](https://play.google.com/store/apps/details?id=com.PigeonGames.Phigros) to familiarize yourself with the gameplay!
- Phira is a community game based on the gameplay of [Phigros](https://play.google.com/store/apps/details?id=com.PigeonGames.Phigros). **Its target audience is primarily high-skill players of Phigros or other rhythm games, and it does not feature a tutorial.** It is extremely unfriendly to beginners, and a frustrating experience will only ruin your mood. If you are genuinely interested, we still strongly advise you to [play Phigros](https://play.google.com/store/apps/details?id=com.PigeonGames.Phigros) first before coming here!
:::

## Before you start

1. A device to play on (Android 7+ for online services, iOS 12+ for Apple devices).
2. A personal email address.
3. An AI assistant, so you can ask about any step you do not understand.

## Download for Android

1. Download sources for users in mainland China:
   - [好游快爆](https://www.3839.com/a/154061.htm) (officially authorized)
   - [Dmocken's Phira download site](https://phira.dmocken.top) (third-party mirror)
   Download the latest APK from whichever source is most accessible to you.
2. International download source:
   - [GitHub Releases](https://github.com/TeamFlos/phira/releases)
3. If you see “device not supported”, “CPU incompatible”, or an installation failure message, try installing the **32-bit** build.

## Download for iOS

1. Recommended: if you use an Apple ID outside mainland China, you can search for and download Phira from the [App Store](https://apps.apple.com/us/app/phira/id6447435864).
2. You can also install it by sideloading an IPA. Download links:
   - [Official GitHub](https://github.com/F-Unction/phira_ipa/releases)
   - [Dmocken's Phira download site](https://phira.dmocken.top) (third-party mirror for users in mainland China)
3. IPA sideloading usually requires a computer or tools such as TrollStore.[See the tutorial](https://zhuanlan.zhihu.com/p/11349191286).
4. If you see an “Untrusted Enterprise Developer” prompt, go to Settings -> General -> VPN & Device Management and trust the developer. If you are prompted to enable Developer Mode, turn it on first in Settings.

## Download for HarmonyOS

- Native HarmonyOS builds are not currently available in AppGallery.
- If you need a **sideloading guide for .hap/.app files**, see [the HarmonyOS HAP Sideloading Guide](/en/help/harmony-sideload).


## FAQ

### [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy)

- You must read and agree to the [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy). If you do not agree, Phira may refuse to provide services to you.
- After you read the [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy), the pop-up window will close automatically, which will be taken as your confirmation that you have read and agreed to the terms.

### Account and password

- After registering, please check your email promptly. A verification email will be sent to you. If you do not receive it, please check your spam/junk folder or refresh the page.
- If the invitation link displays "Invalid Activation Code" within 10 minutes of receiving it, it may be a system bug. In this case, please try logging in to Phira using your registered account and password.
- To change your password, go to [Reset password](https://phira.5wyxi.com/reset-password). After entering your email address, a password reset link will be sent to your inbox. You can reset your password through that link. If the page turns blank after you enter your email, that is a known bug. If you do not receive the reset link within 5 minutes, try submitting the password reset request again.
::: warning
If you cannot open the link in the email, replace `api.phira.cn` at the beginning of the URL with `phira.5wyxi.com`.
:::

### Online services

- If chart loading or downloading fails, first check whether you are using the latest version of the app (`0.7.1`). If you are already on the latest version, the problem is likely on the server side, or your access may be temporarily restricted due to frequent requests. Try again later.
- If score upload fails and you see a message saying the score is still being uploaded, that usually means the server connection is unstable. If you do not care about uploading the score, you can switch to offline mode.
::: details If charts fail to download and show a long error message, or if downloads are unusually slow, try the following:
  - Wait an hour and then try again
  - Switch networks, for example from Wi-Fi to mobile data
  - Enable Insecure Mode in the game and restart it
  - Turn on airplane mode, or restart your device
  - Switch mobile carriers
  - Use a network proxy tool
  - Wait for the server to recover
:::

### Multiplayer service issues

- The official Phira multiplayer server (`mp2.phira.cn:12345`) is currently unavailable.
- A third-party monitoring site currently tracks multiplayer server addresses: [Status page](https://phira.dmocken.top/status)
- We support and recommend self-hosting private multiplayer servers. See [official GitHub](https://github.com/TeamFlos/phira-mp)
- If you want prebuilt server files that are ready to use, go to: [Multiplayer server](https://phira.dmocken.top/mulity?name=%E5%A4%9C%E6%B0%8F%E6%A2%A6%E6%83%B3%E5%AE%B6#mulity-download)
::: details Multiplayer server setup guides
- [Android: Phira multiplayer server (Termux)](/en/mp_build_guide/Termux)
- [Windows: Phira multiplayer server](/en/mp_build_guide/Windows)
- [Linux server deployment](/en/mp_build_guide/Linux)
:::

### Touch / input issues

- iOS: Enable Guided Access.
- Android: Add the app to your system's game space, or turn off multi-finger gestures and similar assistive features.
- General: Disable aggressive optimization or enable low graphics mode. Overheating can cause CPU throttling and hurt performance. A dirty screen can also affect touch input. If the issue persists, check whether your screen supports multi-touch.

### Resource packs

:::danger
- **Important!** In the current version (v0.7.1), importing an incorrect file will clear your skins! This is a known bug. Please try <u>switching to the default resource pack or importing a new resource pack</u> to play. This will be fixed in a future version.
```log
Chart loading failed

Caused by:
   1. Failed to load resources
   2. Failed to load resource pack
   3. No such file or directory (os error 2)
Resource packs (skins and charts) are imported as zip files. Do not unzip them.
:::

- Resource pack sites:
   1. By kevin2106: [prprbako](https://prprbako.kevin2106.top/)
   2. By 好游快爆 (requires [好游快爆APP](https://www.3839.com/app.html)): [Click here](https://www.onebiji.com/hykb_tools/phira/index.php)
   3. QQ Channel: [Phira资源包制作分享](https://pd.qq.com/s/blwfryimz)
- Importing resource packs 
   1. on iOS: TestFlight installs can import directly. On self-signed IPA installs, file importing (including local charts and resource packs) often fails on many devices.
   2. To import resource packs on Android:
      * In-game: For skins, go to Home > Resource Packs > the plus button on the left. For charts, go to Play > the plus button on the top-right.
      * Outside the game: Choose `Phira` as the app to open chart files, or `Phira (Resource Pack)` for skin files.
      * If you see a purple title bar with a white screen, try opening the zip file again from your file manager using `Phira (Resource Pack)`.

::: warning
The *Phigros Official Resource Pack* is copyrighted by Pigeon Games. Phira does not have the right to distribute it and no longer provides it. Please respect the copyright and do not redistribute it freely.
:::

### Custom charts

- To find custom charts for a specific song, the fastest way is to search on Bilibili and download them under the guidance of the chart creator.
- Before uploading a chart, make sure you have fully read, understood, and agreed to the [Phira Chart Upload Guidelines](https://docs.qq.com/doc/DU2dUaEt5WnFJV2Zh) and the [Phira Chart Content Policy (for charters)](https://docs.qq.com/doc/DU1dISHdEb0NuYVpB). In addition, **all Phigros-exclusive songs, original artwork, official charts, and enhanced versions of official charts are prohibited from being uploaded. Violations may result in account bans.**
- For non-exclusive songs, please do not use the original artwork. As long as your chart design differs from the official chart, it may be uploaded. For more details, refer to the upload guidelines.


## Official contact channels

- QQ groups:
  - Group 1: `688798221` (full)
  - Group 2: `738179721` (full)
  - Group 3: `874761842` (full)
  - Group 4: `685895528` (full)
- QQ Channel: Phira
  - Invite link: [https://pd.qq.com/s/ezgv3q71g](https://pd.qq.com/s/ezgv3q71g)
  - Channel ID: `r48eajexth`
  - Password：`先看文档再来提问`
- Telegram: [Phira](https://t.me/phira_official)
- Discord: [Phira Official](https://discord.gg/9fH8UA9DgR)
- Bilibili: [Phira Official](https://space.bilibili.com/3493259571628094)
- Website: [https://phira.moe](https://phira.moe)
