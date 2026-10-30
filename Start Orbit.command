#!/bin/zsh
set -e
cd -- "$(dirname -- "$0")"
# Prefer an installed Node runtime, then the Codex desktop runtime.
project_runtime="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node"
if ! command -v node >/dev/null 2>&1; then
  export PATH="$project_runtime/bin:$PATH"
fi
if ! command -v node >/dev/null 2>&1; then
  echo 'Node.js 22 or newer is required. Install it from https://nodejs.org, then reopen this launcher.'
  read -r 'Press Return to close.'
  exit 1
fi
if [ ! -d node_modules ]; then
  if command -v pnpm >/dev/null 2>&1; then
    pnpm install --frozen-lockfile
  elif [ -f "$project_runtime/node_modules/pnpm/bin/pnpm.cjs" ]; then
    node "$project_runtime/node_modules/pnpm/bin/pnpm.cjs" install --frozen-lockfile
  else
    echo 'Install pnpm 11.25.0, then reopen this launcher.'
    exit 1
  fi
fi
echo 'Orbit: http://127.0.0.1:5173/Consumer-Profile/'
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort
