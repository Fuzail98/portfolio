#!/bin/bash

CHATTY_DIR="$HOME/chatTyChat"
CHATTY_DIRS=("$CHATTY_DIR/configs" "$CHATTY_DIR/logs" "$CHATTY_DIR/store/chats" "$CHATTY_DIR/store/ascii" "$CHATTY_DIR/bin")
CHATTY_MIRROR_URL="https://portfolio-fuzi98.onrender.com"
# CHATTY_MIRROR_URL="http://localhost:5173"
CHATTY_SETUP_LOG_FILE="$CHATTY_DIR/logs/chattychat_setup.log"
BINARIES=(
    "$CHATTY_MIRROR_URL/binaries/backend/macos/macos.zip"
    # "$CHATTY_MIRROR_URL/binaries/client/chattyClient.zip"
)
CHATTY_PLIST_FILE_PATH="$HOME/Library/LaunchAgents/com.fuzail.chatty.plist"

log() {
    echo "[INFO] $(date "+%Y-%m-%d %H:%M:%S") $1" | tee -a "$CHATTY_SETUP_LOG_FILE"
}

error() {
    echo "[ERROR] $(date "+%Y-%m-%d %H:%M:%S") $1" | tee -a "$CHATTY_SETUP_LOG_FILE" >&2
}

setup_plist_file() {
    local plist_file_url="$CHATTY_MIRROR_URL/scripts/chattychat.plist"
    log "Downloading Chattychat plist file from $plist_file_url..."
    if ! curl -o "$CHATTY_PLIST_FILE_PATH" "$plist_file_url"; then
        error "Failed to download plist file."
        exit 1
    else
        log "Plist file downloaded successfully."
    fi
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

setup_plist_file
setup_exe_files

if launchctl unload "$CHATTY_PLIST_FILE_PATH" 2>/dev/null; then
    log "Unloaded existing plist file."
fi

if launchctl load "$CHATTY_PLIST_FILE_PATH"; then
    log "Loaded plist file successfully."
    launchctl start com.fuzail.chatty || error "Failed to start the service."
else
    error "Failed to load plist file."
fi

log "Starting Chattychat backend..."
launchctl start com.fuzail.chatty

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

log "Setup completed."