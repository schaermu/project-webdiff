FROM mcr.microsoft.com/devcontainers/python:1-3.12

ENV PYTHONUNBUFFERED 1

# install cypress dependencies
RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y install --no-install-recommends \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 xauth xvfb