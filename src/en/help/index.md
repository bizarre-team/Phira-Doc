# Phira FAQ

This is the *Phira FAQ* written by Phira support volunteers. Before playing Phira, please read and agree to the official [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy).

v0.7.0 update highlights:

New Features & Improvements:
- ! **All-new chart collection feature**: Create collections to organize charts, with cloud sync and sharing support
- ! **More powerful local chart management**: Supports batch import/export, manual reordering, search & filter, and more
- ! **New gameplay modifier modules**: Fade-In, Rainbow (colorful effects), Night Club (high speed multiplier), Sudden Death, Disable Shaders
- ! **New audio system & advanced configuration**: Supports multiple output types and preferred sample rate configuration; smarter output device selection
- Video support upgrades: Added support for HEVC/H.265, AV1, VP9, and other video formats
- UI refinements (chart browsing, loading screen, and results screen) for improved visual experience and interaction smoothness
- Chart support upgrades: RPE 1.7.0 speed easing (requires manual enable), parent-child line rotation, hit areas, note coloring, video-bound lines, and more
- In-game message quick navigation: Jump directly to related charts or links from messages
- Miscellaneous new features: Reduced animation effects, Early/Late display on results screen, forgot password entry point, optional AP/FC indicator toggle
- Internal performance optimizations

Platform Compatibility:
- ! **Native HarmonyOS support** by [@ljlVink](https://github.com/ljlVink)
- ! **Desktop improvements**: Text input in input fields, mouse wheel scrolling support
- ! **Windows touch support**: The Windows version now natively supports multi-touch input and score uploading

Bug Fixes:
- Video support improvements: Fixed incorrect audio in unlock videos for some charts, and fixed certain videos failing to play
- RPE UI binding fix: Enabled by default for newly imported charts; must be manually enabled for existing charts
- Crash fixes: Fixed crashes caused by incomplete deletion of local charts, importing invalid resource packs, and related issues
- Resource pack color support: Fixed semi-transparent colors not being supported in resource packs

Localization:
- Added/fixed translations for multiple languages (zh-TW, vi-VN, ru-RU, fr-FR, th-TH, tr-TR, etc.), including translation key corrections and wording improvements

For issues with this document, contact @Dmocken in the [Phira QQ Channel](https://pd.qq.com/s/ezgv3q71g), or use [Feedback](https://phira.dmocken.top/report).

## Before you start

1. A device to play on (Android 7+ for online services, iOS 12+ for Apple devices).
2. A personal email address.
3. Understand some basic knowledge: e.g. IPA is the iOS app package and needs signing; APK is the Android/Harmony app package (32-bit and 64-bit—choose according to your device), and where phone storage paths are.

## Android download

1. Official:
   - [GitHub](https://github.com/TeamFlos/phira/releases)
2. If you see "device not supported", "CPU incompatible", or install failure, try the **32-bit** build.
3. 64-bit works on most Android/Harmony devices. **There is no Harmony NEXT–specific sideload package.**

## iOS download

1. For iOS users, we recommend searching for and downloading Phira from the [App Store](https://apps.apple.com/us/app/phira/id6447435864).
2. Install via IPA sideloading. Download link: [Official GitHub](https://github.com/F-Unction/phira_ipa/releases).
3. iOS sideloading requires a computer or jailbreak tools.
4. If you see an "Untrusted Enterprise Developer" prompt, go to Settings → General → VPN & Device Management to trust the developer.

## Harmony NEXT download

If you need a **HAP sideloading guide**, see: [HarmonyOS HAP Sideloading Guide](/en/help/harmony-sideload).


## FAQ

### [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy)

- You must read and agree to the [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy). Phira reserves the right to refuse to provide services to you if you do not agree.
- After you have read the [Terms of Service](https://phira.moe/terms-of-use) and [Privacy Policy](https://phira.moe/privacy-policy), the pop-up window will disappear automatically, which means that you have read and agreed to the contents of the terms.

### Account and password

- After registering, please check your email promptly. A verification email will be sent. If you haven't received it, please check your spam/junk mail folder or refresh the page.
- If the invitation link displays "Invalid Activation Code" within 10 minutes of receiving it, it may be a system bug. In this case, please try logging in to Phira using your registered account and password.
- To change your password, please go to: [Reset password](https://phira.5wyxi.com/reset-password). After clicking the link and entering your email address, a password reset link will be sent to your inbox. Enter the link to change your password. A blank screen after entering your email address is a bug. If you do not receive the password reset link within 5 minutes, please try submitting your password reset request again.
::: warning
If you encounter issues accessing the link in the email, please replace `api.phira.cn` at the beginning of the link with `phira.5wyxi.com`.
:::

### Online services

- For chart loading/download errors, check if your software version is the latest (0.6.7.1). If it is, the problem is with the server or your access may be restricted due to frequent access. It should resolve itself after a while.
- If chart scores cannot be uploaded successfully, the message "Uploading score" indicates a current network problem. If you don't care about your scores, try playing in offline mode.
- For recent chart download failures (a long string of error messages) or slow download speeds, try the following:
  - Wait 1 hour before logging back in.
  - Switch your network (from Wi-Fi to mobile data).
  - Open insecure mode in the game and restart the game.
  - Turn on airplane mode or restart your device.
  - Switch your network provider.
  - Wait for the server to restore access.

### Multiplayer

- Official Phira multiplayer server (mp2.phira.cn:12345) is currently unavailable.
- Third-party monitoring for multiplayer servers: [Status page](https://phira.dmocken.top/status).
- We support and recommend self-hosted multiplayer servers: [phira-mp on GitHub](https://github.com/TeamFlos/phira-mp).
- Pre-built server files: [Multiplayer server](https://phira.dmocken.top/mulity).
- [Android: Phira multiplayer server (Termux)](/en/mp_build_guide/Termux)
- [Windows: Phira multiplayer server](/en/mp_build_guide/Windows)
- [Linux server deployment](/en/mp_build_guide/Linux)

### Touch / input issues

- iOS: Enable Guided Access.
- Android: Add the app to the system game space, or turn off multi-finger gestures and similar features.
- General: Disable aggressive optimization or/and use low graphics. Overheating can cause CPU throttling. Dirty screen can affect touch. If issues persist, please check if the screen supports multi-finger touch.

### Resource packs

- Resource packs (skins and charts) are imported as zip files. Do not unzip.
- Resource pack site: [prprBlog](https://prprblog.kevin2106.top/).
- QQ Channel: [Phira 资源包制作分享](https://pd.qq.com/s/blwfryimz).
- (Android) QQ file save path: `Android/data/com.tencent.mobileqq/Tencent/QQfile_recv`.
- Importing resource packs (iOS): Testflight installations can import directly. Self-signed IPA builds often have issues importing files on many devices (e.g., importing local charts/resource packs/avatars will all fail).
- To import resource packs, go to the homepage > Resource Packs > the plus sign on the left; to import charts, go to Play > Import (top right corner). Alternatively, select "Phira (Resource Pack)" as the opening method for the zip archive. If you see a purple title and a white interface, try opening the zip archive with Phira (Resource Pack) in your file manager to import it.

::: warning
The copyright of the *Phigros Official Resource Pack* belongs to © Pigeon Games. Phira does not own the right to use it and has stopped providing it. We also ask all players to respect the copyright and not to distribute it indiscriminately.
:::

### Custom charts

- To find custom charts for a specific song, the fastest way is to search on Bilibili and download them under the guidance of the chart creator.
- Uploading: Before uploading a chart, please ensure you have carefully and completely read, understood, and agreed to [Chart Upload Guidelines](https://docs.qq.com/doc/DU2dUaEt5WnFJV2Zh) and [Phira Chart Content Policy (Chart Creators)](https://docs.qq.com/doc/DU1dISHdEb0NuYVpB). Additionally, **uploading any Phigros-exclusive tracks, original artwork, official charts and official-chart derivatives is prohibited. Violators may have their accounts banned.**
- For non-exclusive songs, please do not use original artwork. Ensure the chart's design differs from the official chart before uploading. For other questions, please refer to the Chart Upload Guidelines for detailed information.
- To protect the copyright of in-game charts and character art, story charts and character art cannot be loaded on Windows and Linux.

### Official contacts

- Discord: [Phira Official](https://discord.gg/9fH8UA9DgR)
- Telegram: [Phira](https://t.me/phira_official)
- QQ Channel: Phira
  - Invite: [https://pd.qq.com/s/ezgv3q71g](https://pd.qq.com/s/ezgv3q71g)
  - Channel ID: r48eajexth
- Bilibili: [Phira官方](https://space.bilibili.com/3493259571628094)
- Website: [https://phira.moe](https://phira.moe)
