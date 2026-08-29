#!/bin/bash
# Double-click to serve this portfolio at http://localhost:8000
cd "$(dirname "$0")"
PORT=8000
while lsof -i :$PORT -sTCP:LISTEN >/dev/null 2>&1; do PORT=$((PORT+1)); done
echo "Serving $(pwd) at http://localhost:$PORT"
open "http://localhost:$PORT/index.html"
python3 -m http.server $PORT --bind 127.0.0.1
