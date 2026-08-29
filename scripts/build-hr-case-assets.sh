#!/bin/zsh
set -euo pipefail

ROOT="${0:A:h:h}"
cd "$ROOT"

upscale() {
  local source="$1"
  local target="$2"
  local long_edge="$3"
  local width height current filter extension

  mkdir -p "${target:h}"
  width=$(sips -g pixelWidth "$source" 2>/dev/null | awk '/pixelWidth/{print $2}')
  height=$(sips -g pixelHeight "$source" 2>/dev/null | awk '/pixelHeight/{print $2}')
  current=$(( width > height ? width : height ))

  if (( current >= long_edge )); then
    cp "$source" "$target"
    return
  fi

  if (( width >= height )); then
    filter="scale=${long_edge}:-2:flags=lanczos,unsharp=5:5:0.32:5:5:0"
  else
    filter="scale=-2:${long_edge}:flags=lanczos,unsharp=5:5:0.32:5:5:0"
  fi

  extension="${target:e:l}"
  if [[ "$extension" == "jpg" || "$extension" == "jpeg" ]]; then
    ffmpeg -nostdin -hide_banner -loglevel error -y -i "$source" -vf "$filter" -frames:v 1 -q:v 2 "$target"
  else
    ffmpeg -nostdin -hide_banner -loglevel error -y -i "$source" -vf "$filter" -frames:v 1 -compression_level 6 "$target"
  fi
}

upscale_gif() {
  local source="$1"
  local target="$2"
  local long_edge="$3"
  local width height filter

  mkdir -p "${target:h}"
  width=$(sips -g pixelWidth "$source" 2>/dev/null | awk '/pixelWidth/{print $2}')
  height=$(sips -g pixelHeight "$source" 2>/dev/null | awk '/pixelHeight/{print $2}')
  if (( width >= height )); then
    filter="scale=${long_edge}:-2:flags=lanczos"
  else
    filter="scale=-2:${long_edge}:flags=lanczos"
  fi

  ffmpeg -nostdin -hide_banner -loglevel error -y -i "$source" \
    -filter_complex "fps=15,${filter},split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle" \
    -loop 0 "$target"
}

# Eyewa: phone screens and testing artifacts need enough density for zoomed reading.
eyewa_fig=(
  benchmark-cards.png
  flow-map-1.png flow-map-2.png
  heat-a.png heat-b.png heat-c.png
  hifi-01.png hifi-02.png hifi-03.png hifi-04.png hifi-05.png
  imp-login.png
  lofi-01.png lofi-02.png lofi-03.png lofi-04.png
  orig-01.png orig-02.png orig-03.png orig-04.png orig-05.png
  orig-account.png orig-cart.png orig-contact.png orig-payment.png orig-payment-2.png
  orig-shipping.png orig-summary.png orig-thankyou.png
  cs-old.png cs-iter1.png cs-final-1.png cs-final-2.png
  pay-old.png pay-final.png
  prop-01.png prop-02.png prop-03.png prop-04.png prop-05.png
  suggest-card-marks.png suggest-secure-order.png
)
for file in $eyewa_fig; do
  upscale "assets/eyewa/fig/$file" "assets/eyewa/hr/fig/$file" 2400
done
for file in trim-comp-logo-1.png trim-comp-logo-2.png trim-comp-logo-3.png trim-comp-logo-4.png trim-comp-logo-5.png; do
  upscale "assets/eyewa/fig/$file" "assets/eyewa/hr/fig/$file" 1024
done
upscale "assets/projects/eyewa-device.png" "assets/projects/hr/eyewa-device.png" 2400

# Harmony: preserve the exact component library while giving every sheet a 2K+ source.
for file in harmony-sheet-input.png harmony-sheet-nav.png cb-heuristics.png cb-style-01.png cb-style-02.png cb-tokens.png cb-implementation.png mood-1.png mood-2.png mood-3.png mood-4.png mood-5.png; do
  upscale "assets/harmony/$file" "assets/harmony/hr/$file" 2560
done
upscale "assets/harmony/cb-style-03.png" "assets/harmony/hr/cb-style-03.png" 1600
upscale "assets/harmony/harmony-tokens.png" "assets/harmony/hr/harmony-tokens.png" 2560
cp "assets/harmony/harmony-logo.png" "assets/harmony/hr/harmony-logo.png"

# Talon.One: the main interface evidence is prepared at a 3K long edge.
for file in hero-prototype.png lofi.png hifi.png youtube.png outreach.png clarity-heatmap.png jakobs-law.png paper-wireframes.png before.png improvements.png after.png prototype.png rule-builder.png; do
  upscale "assets/talon/$file" "assets/talon/hr/$file" 3072
done
for file in r1-1.png r1-2.png r1-3.png r2-1.png r2-2.png r2-3.png r2-4.png r3-1.png r4-1.png r4-2.png r4-3.png r4-4.png r5-1.png r6-1.png r6-3.png r6-4.png comp-1.png comp-2.png comp-3.png customer-1.png customer-2.png; do
  upscale "assets/talon/logos/$file" "assets/talon/hr/logos/$file" 1024
done

# KFH: high-resolution research boards, flows, interface evidence and animated walkthroughs.
kfh_main=(
  "Device - Macbook Pro 3D.png"
  "Design Process.png"
  "Design Workflow.png"
  "HiFi wireframes/Component 7.png"
  "ds.png"
  "DS Kapple.png"
  "Before/image 90.png"
  "Before/image 91.png"
  "optimized/product-analysis.jpg"
  "optimized/heuristic-evaluation.jpg"
  "optimized/neobank-userflows.jpg"
  "optimized/flow-comparison.jpg"
  "optimized/version-control.jpg"
  "optimized/interface-improvements.jpg"
  "optimized/final-ui.jpg"
  "optimized/heatmap-validation.jpg"
  "optimized/mobile-preview.jpg"
  "optimized/user-interviews-poster.jpg"
  "optimized/prioritizing-tasks-poster.jpg"
  "optimized/design-system-poster.jpg"
  "optimized/original-screens-poster.jpg"
  "optimized/iterative-progress-poster.jpg"
)
for file in $kfh_main; do
  upscale "assets/kfh/$file" "assets/kfh/hr/$file" 3200
done
mkdir -p "assets/kfh/hr/optimized"
cp "assets/kfh/optimized/requirement-gathering-v2.svg" "assets/kfh/hr/optimized/requirement-gathering-v2.svg"

for group in "Traditional banks logos" "Neo Banks"; do
  for source in "assets/kfh/$group"/*.png; do
    upscale "$source" "assets/kfh/hr/$group/${source:t}" 1024
  done
done

for file in user-interviews.gif prioritizing-tasks.gif design-system.gif original-screens.gif iterative-progress.gif; do
  upscale_gif "assets/kfh/animated/$file" "assets/kfh/hr/animated/$file" 1800
done

echo "High-resolution case-study assets are ready."
