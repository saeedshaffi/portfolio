#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
build_dir="$project_dir/dist"

python3 "$project_dir/build.py"

rm -rf "$build_dir"
mkdir -p "$build_dir/client/assets" "$build_dir/server"

cp "$project_dir/index.html" "$project_dir/404.html" "$project_dir/CNAME" "$project_dir/.nojekyll" "$build_dir/client/"
cp "$project_dir"/site.*.css "$project_dir"/site.*.js "$build_dir/client/"
cp -R "$project_dir/assets/." "$build_dir/client/assets/"

cat > "$build_dir/server/index.js" <<'EOF'
export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
EOF

echo "Sites build ready in $build_dir"
