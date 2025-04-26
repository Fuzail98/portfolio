#!/bin/bash

CHATTY_DIR="$HOME/chatTyChat"
CHATTY_DIRS=("$CHATTY_DIR/configs" "$CHATTY_DIR/logs" "$CHATTY_DIR/store/chats" "$CHATTY_DIR/store/ascii" "$CHATTY_DIR/bin")
CHATTY_MIRROR_URL="https://portfolio-fuzi98.onrender.com"
CHATTY_SETUP_LOG_FILE="$CHATTY_DIR/logs/chattychat_setup.log"
BINARIES=(
    "$CHATTY_MIRROR_URL/public/binaries/backend/chatty-chat-linux-x64/chatty-chat-linux-x64.zip"
    "$CHATTY_MIRROR_URL/public/binaries/client/chattyClient.zip"
)
CHATTY_SERVICE_FILE_PATH="/lib/systemd/system/chattychat.service"

log() {
    echo "[INFO] $(date "+%Y-%m-%d %H:%M:%S") $1" | tee -a "$CHATTY_SETUP_LOG_FILE"
}

error() {
    echo "[ERROR] $(date "+%Y-%m-%d %H:%M:%S") $1" | tee -a "$CHATTY_SETUP_LOG_FILE" >&2
}

setup_service_file() {
    local service_file_url="$CHATTY_MIRROR_URL/public/chattychat.service"
    local link_target="/etc/systemd/system/chattychat.service"
    log "Downloading Chattychat service file from $service_file_url..."
    if ! curl -s -o "$CHATTY_SERVICE_FILE_PATH" "$service_file_url"; then
        error "Failed to download Chattychat service file."
        exit 1
    else
        log "Service file downloaded successfully."
    fi

    log "Creating Symbolic link between $CHATTY_SERVICE_FILE_PATH and $link_target"
    if [ ! -e "$link_target" ]; then
        ln -s "$CHATTY_SERVICE_FILE_PATH" "$link_target"
        log "Symbolic link created."
    else
        log "Symbolic link already exists."
    fi
}   

setup_exe_files(){
    [ -d "$CHATTY_DIR/bin" ] && rm -rf "$CHATTY_DIR/bin/*"
    local temp_dir
    temp_dir=$(mktemp -d)

    for BIN_URL in "${BINARIES[@]}"; do
        log "Downloading binary: $BIN_URL ..."
        if ! curl -s -o "$temp_dir/binary.zip" "$BIN_URL"; then
            error "Failed to download binary ZIP file from $BIN_URL."
            continue
        fi

        log "Extracting binary to ~/chatTyChat/bin directory..."
        if ! unzip -qo "$temp_dir/binary.zip" -d ~/chatTyChat/bin/; then
            error "Failed to extract binary ZIP file."
            continue
        fi
    done    

    chmod +x "$CHATTY_DIR/bin/"* || { error "Failed to set executable permissions on binaries."; exit 1; }
    rm -rf "$temp_dir"
    log "Binaries installed successfully."
}

echo "Starting setup..."
mkdir -p "${CHATTY_DIRS[@]}"
[ ! -e "$CHATTY_SETUP_LOG_FILE" ] && touch "$CHATTY_SETUP_LOG_FILE"

setup_service_file
setup_exe_files

log "Exporting $CHATTY_DIR/bin to PATH..."
if ! grep -q "export PATH=\$PATH:$CHATTY_DIR/bin" "$HOME/.bashrc"; then
    echo "export PATH=\$PATH:$CHATTY_DIR/bin" >> "$HOME/.bashrc"
    log "Added $CHATTY_DIR/bin to PATH in .bashrc."
else
    log "$CHATTY_DIR/bin is already in PATH."
fi

source "$HOME/.bashrc"

log "Reloading systemctl daemon"
systemctl daemon-reload

log "Enabling Chattychat backend..."
systemctl enable chattychat.service

log "Starting Chattychat backend..."
systemctl start chattychat.service

log "Setup completed."
