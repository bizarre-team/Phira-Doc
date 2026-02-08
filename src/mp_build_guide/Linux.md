# Phira-MP Linux帮助文档

### 对于想要使用一键端的用户

1. 前往[Phira下载站](https://phira.dmocken.top/mulity)（或其他来源）获得已预编译的可执行文件
2. 使用` wget [链接]`下载可执行文件到服务器内，如果下载下来是压缩包（.zip）文件，需要先解压，并使用` cd [路径]`定位到可执行程度所在位置
3. 使用` ./[文件名]`或` ./[文件名] --port [端口]`直接运行即可

### 如果你想自行编译官方Rust版本

1. 如果尚未安装 Rust，请先安装。 您可以按照[ https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install) 中的说明进行操作

	对于 Ubuntu 或 Debian 用户，如果尚未安装“curl”，请使用以下命令进行安装：

	```shell
	sudo apt install curl
	```

	对于 Fedora 或 CentOS 用户，请使用以下命令：

	```shell
	sudo yum install curl
	```

	安装curl后，使用以下命令安装Rust：

	```shell
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
	```

2. 接下来需要克隆仓库到服务器内：
   安装git工具

	| Linux 发行版 | 安装命令 |
	| :--- | :--- |
	| **Debian / Ubuntu** | `sudo apt update && sudo apt install git` | 
	| **RHEL / CentOS 7及以下** | `sudo yum install git` | 
	| **RHEL / CentOS 8+ / Fedora** | `sudo dnf install git` | 
	| **Arch Linux** | `sudo pacman -S git` |
	| **openSUSE** | `sudo zypper install git` |

	安装完成后克隆仓库到本地文件夹：

	```shell
	git clone https://github.com/TeamFlos/phira-mp.git
	```

3. 然后，构建项目：

	```shell
	cd phira-mp
	cargo build --release -p phira-mp-server
	```

#### 运行服务端

- 您可以使用以下命令运行该应用程序：

	```shell
	RUST_LOG=info target/release/phira-mp-server
	```

- 也可以通过参数指定端口：

	```shell
	RUST_LOG=info target/release/phira-mp-server --port 8080
	```

### For docker

1. 创建 Dockerfile

```dockerfile
FROM ubuntu:22.04

RUN apt-get update && apt-get -y upgrade && apt-get install -y curl git build-essential pkg-config openssl libssl-dev

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
WORKDIR /root/
RUN git clone https://github.com/TeamFlos/phira-mp
WORKDIR /root/phira-mp
RUN cargo build --release -p phira-mp-server

ENTRYPOINT ["/root/phira-mp/target/release/phira-mp-server", "--port", "<preferred-port>"]
```

2. 构建镜像
   `docker build --tag phira-mp .`
3. 运行容器
   `docker run -it --name phira-mp -p <prefered-port>:<preferred-port> --restart=unless-stopped phira-mp`

#### 故障排除

如果遇到与 openssl 相关的问题，请确保安装了 libssl-dev（适用于 Ubuntu 或 Debian）或 openssl-devel（适用于 Fedora 或 CentOS）。 如果问题仍然存在，您可以为编译过程设置 OPENSSL_DIR 环境变量。

如果您在 Linux 上进行编译并以 Linux 为目标，并收到有关缺少 pkg-config 的消息，则可能需要安装它：

```shell
# 对于 Ubuntu 或 Debian
sudo apt install pkg-config libssl-dev 

# 对于 Fedora 或 CentOS
sudo dnf install pkg-config openssl-devel
```

其他问题请参考具体错误信息并相应调整您的环境。

#### 监控

您可以检查正在运行的进程及其正在侦听的端口：

```shell
ps -aux | grep phira-mp-server
netstat -tuln | grep 12346
```

![result](https://i.imgur.com/NXC54ZZ.png)
