#!/usr/bin/env bash
#
# Cache busting automatico.
# Recorre los assets (css/js) y pone ?v=<hash> en todas las paginas .html.
# El hash cambia solo cuando cambia el contenido del archivo, asi el
# navegador descarga la version nueva en cuanto subes cambios.
#
# Se ejecuta solo en cada commit (ver .git/hooks/pre-commit),
# pero tambien lo puedes correr a mano:  bash scripts/cache-bust.sh
#
set -e

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

bust () {
  asset="$1"
  [ -f "$asset" ] || return 0

  # Huella corta basada en el contenido del archivo
  hash="$(git hash-object "$asset" | cut -c1-8)"

  # Escapa caracteres especiales de regex en la ruta del asset
  esc="$(printf '%s' "$asset" | sed 's/[.[\*^$]/\\&/g')"

  for html in *.html; do
    [ -f "$html" ] || continue
    # Reemplaza  href/src="ruta"  o  href/src="ruta?v=viejo"  por  ...?v=hash
    sed -i -E "s#((href|src)=\"${esc})(\?v=[0-9a-f]+)?\"#\1?v=${hash}\"#g" "$html"
  done

  echo "  $asset -> ?v=$hash"
}

echo "Cache busting:"
for f in assets/*.css assets/*.js; do
  bust "$f"
done

# Re-agrega los HTML modificados al commit en curso
git add -- *.html 2>/dev/null || true
