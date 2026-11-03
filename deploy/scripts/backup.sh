#!/usr/bin/env bash
# MoneyTrack - Automated Database Backup Script
# Usage: ./backup.sh [/path/to/backup/dir]

set -euo pipefail

BACKUP_DIR="${1:-/var/backups/moneytrack}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
CONTAINER_NAME="moneytrack-db"
DB_USER="moneytrack"
DB_NAME="moneytrack"
BACKUP_FILE="${BACKUP_DIR}/moneytrack_backup_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "[$(date -Iseconds)] Starting MoneyTrack database backup..."

# Dump database directly from container, compress on the fly
docker exec "${CONTAINER_NAME}" pg_dump -U "${DB_USER}" "${DB_NAME}" | gzip > "${BACKUP_FILE}"

# Generate checksum
sha256sum "${BACKUP_FILE}" > "${BACKUP_FILE}.sha256"

# Verify non-empty
FILE_SIZE=$(stat -c%s "${BACKUP_FILE}" 2>/dev/null || stat -f%z "${BACKUP_FILE}")
if [ "${FILE_SIZE}" -lt 100 ]; then
    echo "[$(date -Iseconds)] ERROR: Backup file is empty or too small (${FILE_SIZE} bytes)!"
    exit 1
fi

echo "[$(date -Iseconds)] Backup completed successfully: ${BACKUP_FILE} (${FILE_SIZE} bytes)"

# Retention policy: Purge backups older than 14 days
echo "[$(date -Iseconds)] Cleaning up backups older than 14 days..."
find "${BACKUP_DIR}" -name "moneytrack_backup_*.sql.gz*" -type f -mtime +14 -delete

echo "[$(date -Iseconds)] Backup rotation completed."
