# Setting Up a Phira Multiplayer Server on Windows

## Using Pre-compiled Binaries (Easiest Method)

1. Go to the [Phira Download Station](https://phira.dmocken.top/mulity) to download the Windows pre-compiled package.
2. Double-click to run the executable or run it via **CMD**.
3. **Custom Ports:** If you need to specify a custom port, run it via CMD and add the `--port` flag. 
   Example: `RUST_LOG=debug ./phira-mp-server --port 11451`
4. **Public Access:** If you need to make the server accessible over the internet, please configure **intranet penetration** (port forwarding/tunneling) yourself.

---

## Compiling the Phira Server Manually

### 1. Install Git and Download Source Code
1. First, download and install the [Git tool](https://git-scm.com/).
2. Create a new folder anywhere, and use the following command to download the Phira-mp source code:
   `git clone https://github.com/TeamFlos/phira-mp.git` 
   (or use `gh repo clone TeamFlos/phira-mp` if you use GitHub CLI).

### 2. Install Rust
1. Go to the [Rust official website](https://rust-lang.org/) to download and install Rust.
2. Run the Rust installation tool.
3. In the selection prompt, choose **Option 1** (Default).
    ::: tip
    If **MSVC** is not installed on your computer, it will be downloaded automatically. Phira-mp requires Rust version **1.70.0** or higher.
    :::
4. After installation, restart your computer. Run `rustc -V` in any terminal. If a version number appears, the installation was successful.

### 3. Compile Phira-mp
1. Navigate into the folder where you cloned the source code.
2. Run the following command:
   `cargo build --release -p phira-mp-server`
   This will automatically download the necessary libraries and start the compilation.
3. Once finished, you will see a "**Finished**" message. The compiled file will be located in the `/phira-mp/target/release` directory.

---

## How to Restart the Server
Simply double-click the `phira-mp-server.exe` file again to restart the service.

---

## Frequently Asked Questions (FAQ)

1. **Network Errors:** If you encounter `warning: spurious network error (3 tries remaining): [55] Failed sending data to the peer` during compilation, please use a VPN/proxy and try again.
2. **Compilation Time:** The compilation process can take a significant amount of time; ensure your network connection is stable beforehand.
3. **Feedback:** If you find errors in this documentation, please contact **@Dmocken** on the [Phira Official QQ Channel](https://pd.qq.com/s/ezgv3q71g) or submit a report via [Phira Feedback](https://phira.dmocken.top/report).

[Phira FAQ (Continuously Updated)](/en/help/)