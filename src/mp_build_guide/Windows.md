# Windows搭建Phira多人游戏服务器

## 直接使用已编译程序

1. 前往[Phira下载站](https://phira.dmocken.top/mulity)下载Windows预编译程序包
2. 双击运行或使用cmd运行
3. 如需自定义运行端口请在使用cmd运行，并在命令后添加 \-\-port \[端口号\]  例如``` RUST_LOG=debug ./phira-mp-server --port 11451```。
4. 需要映射到公网请自行配置内网穿透。

## 自行编译Phira服务器

### 安装git工具并下载源码

1. 首先下载下载[git工具](https://git-scm.cn/)。
2. 在任意位置新建文件夹，使用`git https://github.com/TeamFlos/phira-mp.git`或`gh repo clone TeamFlos/phira-mp`下载Phira-mp源码。

### 安装rust

1. 前往[rust官网](https://rust-lang.org/zh-CN/tools/install/)下载安装Rust；
2. 运行 rust安装工具；
3. 在弹出的选择框中默认选择1；
   ::: tip
   如果你的电脑没有安装**MSVC ​**则会自动下载安装。Phira-mp要求rust版本需在1.70.0+。
   :::
4. 安装完成后重启电脑，在任意终端运行`rustc -V`，若出现版本号则说明安装成功。

### 编译Phira-mp

1. 进入已经git到源码的文件夹内，运行`cargo build --release -p phira-mp-server`会自动下载运行库并编译；
2. 编译完成后会提示“Finish”，编译完成的文件会在`/phira-mp/target/release`文件夹内

## 如何重新开启服务器

- 重新双击运行phira-mp-server.exe即可

## 常见问题

1. 若执行编译步骤时出现：warning: spurious network error \(3 tries remaining\): \[55\] Failed sending data to the peer \(HTTP/2 stream 105 was not closed cleanly before end of the underlying connection\) 可开启VPN重新执行编译步骤即可。
2. 编译步骤耗时较长，建议提前设置好系统网络。
3. 如果文档内容有误，请在[Phira官方](https://pd.qq.com/s/ezgv3q71g)QQ频道联系@Dmocken，或前往[问题反馈](https://phira.dmocken.top/report)提交反馈。

[Phira常见问题（持续更新）](/help/)
