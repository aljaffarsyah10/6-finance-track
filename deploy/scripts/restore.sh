#!/usr/bin/env bash
# MoneyTrack - Database Restore Script
# Usage: ./restore.sh <path_to_backup_file.sql.gz>

set -euo pipefail

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path_to_backup_file.sql.gz>"
    exit 1
fi

BACKUP_FILE="$1"
CONTAINER_NAME="moneytrack-db"
DB_USER="moneytrack"
DB_NAME="moneytrack"

if [ ! -f "${BACKUP_FILE}" ]; then
    echo "ERROR: Backup file does not exist: ${BACKUP_FILE}"
    exit 1
fi

echo "=========================================================="
echo " WARNING: THIS WILL OVERWRITE THE CURRENT PRODUCTION DB!"
echo " Target Database: ${DB_NAME} in container ${CONTAINER_NAME}"
echo " Source Backup:   ${BACKUP_FILE}"
echo "=========================================================="
read -p "Are you sure you want to proceed? (Type 'YES' to confirm): " CONFIRM
if [ "${CONFIRM}" != "YES" ]; then
    echo "Restore cancelled by user."
    exit 0
fi

# Verify checksum if present
if [ -f "${BACKUP_FILE}.sha256" ]; then
    echo "Verifying SHA256 checksum..."
    sha256sum -c "${BACKUP_FILE}.sha256"
fi

echo "[$(date -Iseconds)] Stopping app container to prevent active connections..."
docker compose stop app || true

echo "[$(date -Iseconds)] Restoring database from backup..."
gunzip -c "${BACKUP_FILE}" | docker exec -i "${CONTAINER_NAME}" psql -U "${DB_USER}" -d "${DB_NAME}"

echo "[$(date -Iseconds)] Database restored successfully."

echo "[$(date -Iseconds)] Restarting app container..."
docker compose start app

echo "[$(date -Iseconds)] Verification: checking database connectivity..."
docker exec "${CONTAINER_NAME}" psql -U "${DB_USER}" -d "${DB_NAME}" -c "SELECT COUNT(*) FROM \"User\";"

echo "[$(date -Iseconds)] Restore process complete!"
