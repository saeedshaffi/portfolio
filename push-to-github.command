#!/bin/bash
# Double-click me (round 2): tests git's connection step by step, then pushes.
# Results are saved to push-log.txt so Claude can read them.
cd "$(dirname "$0")" || exit 1
LOG="push-log.txt"
{
  echo "=== Round 2: $(date) ==="
  echo "--- step 1: tiny read-only git request (ls-remote) ---"
  git ls-remote origin HEAD 2>&1
  echo "--- ls-remote exit: $? ---"
  echo ""
  echo "--- step 2: push with whole-buffer upload (no chunked streaming) ---"
  git -c http.postBuffer=530000000 push origin main 2>&1
  code=$?
  echo "--- push exit: $code ---"
  if [ "$code" -ne 0 ]; then
    echo ""
    echo "--- step 3: network trace of the failing request ---"
    GIT_TRACE_CURL=1 GIT_TRACE_CURL_NO_DATA=1 git ls-remote origin HEAD 2>&1 | tail -60
  fi
} 2>&1 | tee "$LOG"
echo ""
echo "Done. Results saved to push-log.txt for Claude."
read -r -p "Press Enter to close..."
