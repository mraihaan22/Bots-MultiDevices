# Menggunakan Clear Linux sebagai basis
FROM clearlinux:latest

# Install utilitas dasar dan Node.js
RUN swupd update && \
    swupd bundle-add \
      dev-utils \
      git \
      nodejs-basic && \
    npm install -g yarn

# Set shell default ke bash
SHELL ["/bin/bash", "-c"]

# Ekspose port 22 untuk SSH
EXPOSE 22
