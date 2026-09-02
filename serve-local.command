#!/bin/bash
# Double-click me: serves this folder at http://localhost:8000 and opens it.
cd "$(dirname "$0")" || exit 1
PORT=8000
# Free the port if a previous run is still holding it.
lsof -ti tcp:$PORT | xargs kill -9 2>/dev/null
python3 build.py >/dev/null 2>&1
echo "Serving $(pwd) at http://localhost:$PORT"
echo "Leave this window open. Press Ctrl+C to stop."
sleep 1 && open "http://localhost:$PORT/?local=1" &
python3 -m http.server $PORT
