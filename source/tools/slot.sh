#!/usr/bin/env bash
# Run a browser-heavy command in one of N shared slots (default 3): `bash tools/slot.sh node tools/check_chapter.js ...`
# Replaces a single global lock, which left the 2-core machine idle while one long audit held it.
# Wait for any free slot; the slot is released when the command exits.
set -u
N="${CHECK_SLOTS:-3}"; D=/tmp/comic-locks; mkdir -p "$D"
while :; do
  for i in $(seq 0 $((N-1))); do
    exec {fd}>"$D/check-slot-$i.lock"
    if flock -n "$fd"; then "$@"; rc=$?; exec {fd}>&-; exit $rc; fi
    exec {fd}>&-
  done
  sleep 2
done
