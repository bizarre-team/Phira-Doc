# Phira-MP Linux Help Documentation

### For Users Who Want to Use a One-Click Deployment

1. Go to the [Phira Download Site](https://phira.dmocken.top/mulity) (or other sources) to obtain the precompiled executable files.
2. Use `wget [link]` to download the executable file to the server. If the downloaded file is a compressed archive (.zip), you need to extract it first and use `cd [path]` to navigate to the location of the executable.
3. Use `./[filename]` or `./[filename] --port [port]` to run it directly.

### If You Want to Compile the Official Rust Version Yourself

1. If Rust is not installed, please install it first. You can follow the instructions at [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install).

   For Ubuntu or Debian users, if `curl` is not installed, use the following command to install it:

   ```shell
   sudo apt install curl
   ```

   For Fedora or CentOS users, use the following command:

   ```shell
   sudo yum install curl
   ```

   After installing curl, use the following command to install Rust:

   ```shell
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. Next, clone the repository to the server:
   Install the git tool:

   | Linux Distribution | Installation Command |
   | :--- | :--- |
   | **Debian / Ubuntu** | `sudo apt update && sudo apt install git` |
   | **RHEL / CentOS 7 and below** | `sudo yum install git` |
   | **RHEL / CentOS 8+ / Fedora** | `sudo dnf install git` |
   | **Arch Linux** | `sudo pacman -S git` |
   | **openSUSE** | `sudo zypper install git` |

   After installation, clone the repository to a local folder:

   ```shell
   git clone https://github.com/TeamFlos/phira-mp.git
   ```

3. Then, build the project:

   ```shell
   cd phira-mp
   cargo build --release -p phira-mp-server
   ```

#### Running the Server

- You can run the application using the following command:

   ```shell
   RUST_LOG=info target/release/phira-mp-server
   ```

- You can also specify a port via parameters:

   ```shell
   RUST_LOG=info target/release/phira-mp-server --port 8080
   ```

### For Docker

1. Create a Dockerfile:

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

2. Build the image:
   `docker build --tag phira-mp .`
3. Run the container:
   `docker run -it --name phira-mp -p <preferred-port>:<preferred-port> --restart=unless-stopped phira-mp`

#### Troubleshooting

If you encounter issues related to OpenSSL, ensure that libssl-dev (for Ubuntu or Debian) or openssl-devel (for Fedora or CentOS) is installed. If the issue persists, you can set the OPENSSL_DIR environment variable for the compilation process.

If you are compiling on Linux for Linux and receive a message about missing pkg-config, you may need to install it:

```shell
# For Ubuntu or Debian
sudo apt install pkg-config libssl-dev

# For Fedora or CentOS
sudo dnf install pkg-config openssl-devel
```

For other issues, refer to the specific error messages and adjust your environment accordingly.

#### Monitoring

You can check the running processes and the ports they are listening on:

```shell
ps -aux | grep phira-mp-server
netstat -tuln | grep 12346
```

![result](/assets/img/mp_build_guide/302049639-bb25398b-75af-47c3-8ba4-e609be26177b.png)
