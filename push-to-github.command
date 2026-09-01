#!/bin/bash
# Double-click me: waits for a working connection to GitHub, then pushes.
# Tries for up to ~10 minutes. Log saved to push-log.txt for Claude.
cd "$(dirname "$0")" || exit 1
LOG="push-log.txt"
{
  echo "=== Auto-retry push: $(date) ==="
  for attempt in $(seq 1 40); do
    code=$(curl -s --max-time 8 -o /dev/null -w "%{http_code}" https://github.com 2>/dev/null)
    echo "[$(date +%H:%M:%S)] probe $attempt: HTTP $code"
    if [ "$code" = "200" ] || [ "$code" = "301" ]; then
      echo ">>> connection is up — pushing now..."
      if git push origin main 2>&1; then
        echo ">>> PUSH SUCCEEDED at $(date)"
        break
      else
        echo ">>> push failed, will keep retrying..."
      fi
    fi
    sleep 8
  done
} 2>&1 | tee "$LOG"
echo ""
echo "Done. Results saved for Claude."
read -r -p "Press Enter to close..."
