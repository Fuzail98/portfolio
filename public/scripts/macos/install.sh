#!/bin/bash

CHATTY_DIR="$HOME/chatTyChat"
CHATTY_DIRS=("$CHATTY_DIR/configs" "$CHATTY_DIR/logs" "$CHATTY_DIR/store/chats" "$CHATTY_DIR/store/ascii" "$CHATTY_DIR/bin")
CHATTY_MIRROR_URL="https://portfolio-fuzi98.onrender.com"
# CHATTY_MIRROR_URL="http://localhost:5173"
CHATTY_SETUP_LOG_FILE="$CHATTY_DIR/logs/chattychat_setup.log"
CHATTY_BE_SERVER_LOG_FILE="$CHATTY_DIR/logs/server.log"
BINARIES=(
    "$CHATTY_MIRROR_URL/binaries/backend/macos/macos.zip"
    # "$CHATTY_MIRROR_URL/binaries/client/chattyClient.zip"
)

log() {
    echo "[INFO] $(date "+%Y-%m-%d %H:%M:%S") $1" | tee -a "$CHATTY_SETUP_LOG_FILE"
}

error() {
    echo "[ERROR] $(date "+%Y-%m-%d %H:%M:%S") $1" | tee -a "$CHATTY_SETUP_LOG_FILE" >&2
}

setup_exe_files() {
    [ -d "$CHATTY_DIR/bin" ] && rm -rf "$CHATTY_DIR/bin/*"
    local temp_dir
    temp_dir=$(mktemp -d)

    for BIN_URL in "${BINARIES[@]}"; do
        log "Downloading binary: $BIN_URL ..."
        if ! curl -o "$temp_dir/binary.zip" "$BIN_URL"; then
            error "Failed to download binary ZIP file from $BIN_URL. Curl error: $(curl -s -o /dev/null -w '%{http_code}' "$BIN_URL")"
            exit 1
        fi

        log "Extracting binary to ~/chatTyChat/bin directory..."
        if ! unzip -qo "$temp_dir/binary.zip" -d ~/chatTyChat/bin/; then
            error "Failed to extract binary ZIP file."
            exit 1
        fi
    done

    chmod +x "$CHATTY_DIR/bin/"* || { error "Failed to set executable permissions on binaries."; exit 1; }
    rm -rf "$temp_dir"
    log "Binaries installed successfully."
}

echo "Starting setup..."
mkdir -p "${CHATTY_DIRS[@]}"
[ ! -e "$CHATTY_SETUP_LOG_FILE" ] && touch "$CHATTY_SETUP_LOG_FILE"
[ ! -e "$CHATTY_BE_SERVER_LOG_FILE" ] && touch "$CHATTY_BE_SERVER_LOG_FILE"

setup_exe_files

log "Adding $CHATTY_DIR/bin to PATH permanently..."
if ! grep -q "export PATH=\$PATH:$CHATTY_DIR/bin" "$HOME/.bash_profile" 2>/dev/null; then
    echo "export PATH=\$PATH:$CHATTY_DIR/bin" >> "$HOME/.bash_profile"
    log "Added to .bash_profile."
fi

if ! grep -q "export PATH=\$PATH:$CHATTY_DIR/bin" "$HOME/.zshrc" 2>/dev/null; then
    echo "export PATH=\$PATH:$CHATTY_DIR/bin" >> "$HOME/.zshrc"
    log "Added to .zshrc."
fi

if [ -f "$HOME/.zshrc" ]; then
    source "$HOME/.zshrc"
    log "Sourced .zshrc to apply changes."
elif [ -f "$HOME/.bash_profile" ]; then
    source "$HOME/.bash_profile"
    log "Sourced .bash_profile to apply changes."
else
    log "No shell configuration file found to source."
fi

log "Starting chatty-chat server..."
nohup chatty-chat > "$CHATTY_DIR/logs/server.log" 2>&1 &

log "Setup completed."