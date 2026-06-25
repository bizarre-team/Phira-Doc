# 鸿蒙 HAP 侧载安装教程

本页整理的是鸿蒙设备安装 HAP 的通用流程。不同机型和系统版本的菜单名称可能不一样，但操作思路基本一致。

## 准备工作

- Phira hap 安装包，[国内源](https://phira.dmocken.top/)、[GitHub](https://github.com/TeamFlos/phira/releases)。
- 一台鸿蒙设备，建议非 Harmony NEXT 设备优先参考。
- [小白调试助手](https://github.com/likuai2010/auto-installer/releases)。

## 小白调试助手

从 GitHub Release 中下载两个平台的安装包：

- 其中一个需要是 `.hap/.app` 安装包，用于后续软件更新使用
- 另一个可以为任意平台
- **注意下载的版本号需要相同才能正常工作**

（或许可以通过**卓易通**安装apk版小白调试助手进行操作？本人没尝试过，希望有动手能力的同学可以试试看！[下载链接点此](https://github.com/likuai2010/auto-installer/releases/tag/2.5.0)）
::: tip
**Windows**：首次打开会提示安装 Java，下载安装即可。

**macOS**：首次运行需要在终端执行 `xattr -d com.apple.quarantine /Applications/小白调试助手.app`，并确保已安装 Java 环境。

**Linux**：不能使用 root 权限，且依赖 [zenity](https://gitlab.gnome.org/GNOME/zenity)。
:::

## 开启无线调试

1. 打开 **设置** → **设备名称**，进入 **关于本机** 页面。
2. 快速点击 **软件版本** 5 下，开启开发者模式。
3. 返回 **设置** → **系统** → **开发者选项**。
4. 找到并开启 **无线调试**。
5. 进入二级页面后，记录设备的 IP 地址和端口。

![无线调试](/assets/img/help/无线调试.png)

## 开发者账号

侧载中需要使用开发者账号进行签名。开发者账号未实名时，侧载后的应用仅有 14 天有效期；实名后会延长至 180 天，因此建议先完成实名认证。

1. 打开 [华为开发者联盟 - 开发者信息](https://developer.huawei.com/consumer/cn/console/setting/profile) 页面，注册或登录华为账号。
2. 填写个人基本信息并完成实名认证。

## 侧载 Phira

1. 登录账号

    点击 **登录账号**，在浏览器中登录华为账号，点击 **允许** 访问，等待出现“登录成功！请返回！”

2. 连接设备

    点击 **连接设备**，在弹出窗口中输入上面获取的 IP 地址和端口，然后点击按钮进行连接。

    ![连接设备](/assets/img/help/连接设备.png)

3. 选择 `.hap/.app` 文件

    点击 **选择**，选中下载好的 Phira 包。完成后，软件内会显示软件包名及支持安装的设备。

4. 侧载安装

    点击 **开始调试**，等待全部操作成功完成侧载。若出现错误，可根据错误信息处理后重新点击 **开始调试**。

## 便捷更新

使用相同方法侧载小白调试助手的 `.hap/.app` 包。后续软件内更新时，会将新的 HAP 包发送到小白调试助手；之后只需要登录华为账号并连接设备，就可以快速完成更新侧载。

## 其它

- 查询调试证书有效期：[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/harmonyOSDevPlatform/9249519184596237889)