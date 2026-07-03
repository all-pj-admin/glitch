// GLITCH — 共通の演出ロジック（カーソル・多言語切替・グリッチ効果）
// ログインページ・メインページの両方から読み込んで使う

const GLITCH_LANG_ORDER = ['EN', 'JA', 'KO', 'FR', 'DE', 'ES'];

// マウスカーソルを [G] アイコンに差し替える演出
function glitchInitCursor(rootEl, cursorEl) {
  rootEl.addEventListener('mousemove', (e) => {
    cursorEl.style.opacity = '1';
    cursorEl.style.transform = 'translate(' + (e.clientX - 7) + 'px,' + (e.clientY - 7) + 'px)';
  });
  rootEl.addEventListener('touchstart', (e) => {
    const t = e.touches && e.touches[0];
    if (!t) return;
    const ping = document.createElement('img');
    ping.src = 'assets/glitch_cursor.png';
    ping.style.cssText = 'position:fixed;z-index:9999;pointer-events:none;width:30px;height:30px;object-fit:contain;left:' + t.clientX + 'px;top:' + t.clientY + 'px;filter:drop-shadow(1.6px 0 #ff2e57) drop-shadow(-1.6px 0 #12f0e0);animation:gl-ping .5s ease-out forwards;';
    document.body.appendChild(ping);
    setTimeout(() => ping.remove(), 520);
  }, { passive: true });
}

// 画面隅の [ EN ][ JA ]... 言語切替ボタンを作る
// order: 言語コードの配列 / getCurrent: 現在の言語コードを返す関数 / onSelect: 選択時に呼ぶ関数
function glitchBuildLangButtons(container, order, getCurrent, onSelect) {
  container.innerHTML = '';
  order.forEach((code) => {
    const btn = document.createElement('button');
    btn.textContent = '[ ' + code + ' ]';
    if (code === getCurrent()) btn.classList.add('active');
    btn.addEventListener('click', () => onSelect(code));
    container.appendChild(btn);
  });
}

// 言語切替時の画面グリッチ演出（一瞬だけ色反転させる）
function glitchScreenPulse(rootEl) {
  rootEl.style.animation = 'gl-screenglitch .3s steps(1) 1';
  setTimeout(() => { rootEl.style.animation = ''; }, 320);
}

// テキスト要素のグリッチ演出（切替時にノイズがかかる）
function glitchTextPulse(el) {
  if (!el) return;
  el.style.animation = 'gl-glitchtext .4s steps(2) 1';
  el.style.textShadow = '2px 0 #ff2e57, -2px 0 #12f0e0';
  setTimeout(() => { el.style.animation = ''; el.style.textShadow = ''; }, 420);
}

function glitchFormatNumber(n) {
  return n.toLocaleString('en-US');
}
