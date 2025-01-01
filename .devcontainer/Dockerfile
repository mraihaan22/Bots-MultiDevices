# Gunakan image dasar Debian Bullseye
FROM mcr.microsoft.com/devcontainers/base:bullseye

# Jalankan perintah sebagai root
USER root

# Perbarui daftar paket dan instal dependensi yang diperlukan
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        software-properties-common && \
    # Tambahkan kunci GPG resmi Docker
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    # Tambahkan repositori Docker ke sumber APT
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    # Perbarui daftar paket dan instal Docker
    apt-get update && \
    apt-get install -y --no-install-recommends \
        docker-ce \
        docker-ce-cli \
        containerd.io && \
    # Bersihkan cache APT
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Tambahkan pengguna 'vscode' ke grup 'docker' untuk mengizinkan penggunaan Docker tanpa sudo
RUN usermod -aG docker vscode

# Ubah kembali ke pengguna default
USER vscode
