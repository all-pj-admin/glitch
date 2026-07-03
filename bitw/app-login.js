// GLITCH — ログインページの動きを作るファイル
// ・招待コード入力 / メール登録 / 言語切替 / カーソル演出 を担当
// ・実際のメール送信・コード発行・コード照合は Google Apps Script（config.jsのURL）に問い合わせる

(function () {
  const MANI = {
    EN: 'Are you human, or just a well-trained NPC?',
    JA: 'NPCとして生きるか、世界のバグになるか。',
    KO: 'NPC로 살 것인가, 세상의 버그가 될 것인가.',
    FR: "Es-tu humain, ou juste un PNJ programmé ?",
    DE: 'Bist du ein Mensch oder nur ein programmierter NPC?',
    ES: '¿Eres humano o solo un NPC programado?',
  };

  const T = {
    enterCode: { EN:'ENTER ACCESS CODE', JA:'ENTER ACCESS CODE', KO:'액세스 코드 입력', FR:"SAISIR LE CODE D'ACCÈS", DE:'ZUGANGSCODE EINGEBEN', ES:'INTRODUCE EL CÓDIGO' },
    execute: { EN:'[ EXECUTE ]', JA:'[ EXECUTE ]', KO:'[ 실행 ]', FR:'[ EXÉCUTER ]', DE:'[ AUSFÜHREN ]', ES:'[ EJECUTAR ]' },
    noCode: { EN:'NO CODE?', JA:'NO CODE?', KO:'코드가 없다?', FR:'PAS DE CODE ?', DE:'KEIN CODE?', ES:'¿SIN CÓDIGO?' },
    routeADesc: {
      EN:'No code? Join the queue. Register your address and your access code arrives by email.',
      JA:'コードがない者は、下にメールアドレスを登録せよ。すぐにアクセスコードが届く。',
      KO:'코드가 없는 자는 아래에 이메일을 등록하라. 곧 액세스 코드가 도착한다.',
      FR:"Pas de code ? Inscris ton adresse ci-dessous. Ton code d'accès arrive aussitôt par e-mail.",
      DE:'Kein Code? Trag unten deine Adresse ein. Dein Zugangscode kommt sofort per E-Mail.',
      ES:'¿Sin código? Registra tu correo abajo. Tu código de acceso llega enseguida por email.' },
    joinQueue: { EN:'[ JOIN THE QUEUE ]', JA:'[ JOIN THE QUEUE ]', KO:'[ 대기열 합류 ]', FR:'[ REJOINDRE LA FILE ]', DE:'[ IN DIE WARTESCHLANGE ]', ES:'[ UNIRSE A LA COLA ]' },
    rankLabel: { EN:'YOUR POSITION IN THE QUEUE', JA:'あなたの待機順位', KO:'당신의 대기 순번', FR:'TA POSITION DANS LA FILE', DE:'DEINE POSITION IN DER WARTESCHLANGE', ES:'TU POSICIÓN EN LA COLA' },
    rankBody: {
      EN:'Your access code has been sent to your address.<br>For every friend who infiltrates via your link,<br>you move up <b style="color:#fff">2,000</b> places.',
      JA:'アクセスコードをメールで送った。<br>専用リンクから友人が1人潜入するごとに、<br><b style="color:#fff">2,000人</b>繰り上がる。',
      KO:'액세스 코드를 메일로 보냈다.<br>전용 링크로 친구가 한 명 잠입할 때마다,<br><b style="color:#fff">2,000명</b> 앞당겨진다.',
      FR:"Ton code d'accès a été envoyé par e-mail.<br>Chaque ami qui s'infiltre via ton lien<br>te fait gagner <b style=\"color:#fff\">2 000</b> places.",
      DE:'Dein Zugangscode wurde per E-Mail gesendet.<br>Für jeden Freund, der über deinen Link eindringt,<br>rückst du <b style="color:#fff">2.000</b> Plätze vor.',
      ES:'Tu código de acceso fue enviado por email.<br>Por cada amigo que se infiltre con tu enlace,<br>subes <b style="color:#fff">2.000</b> puestos.' },
    ret: { EN:'< RETURN', JA:'< RETURN', KO:'< 돌아가기', FR:'< RETOUR', DE:'< ZURÜCK', ES:'< VOLVER' },
    regOk: { EN:'ACCESS CODE ACCEPTED', JA:'アクセスコード承認', KO:'액세스 코드 승인됨', FR:"CODE D'ACCÈS ACCEPTÉ", DE:'ZUGANGSCODE AKZEPTIERT', ES:'CÓDIGO DE ACCESO ACEPTADO' },
    regDesc: {
      EN:'One last step. Even with a code, we need your address to sync your identity. No spam — signal only.',
      JA:'最後の手順だ。コードがあっても、身分を同期するにはアドレスが要る。スパムは送らない、シグナルだけだ。',
      KO:'마지막 단계다. 코드가 있어도 신원을 동기화하려면 주소가 필요하다. 스팸은 없다, 시그널뿐이다.',
      FR:"Dernière étape. Même avec un code, il nous faut ton adresse pour synchroniser ton identité. Pas de spam — que du signal.",
      DE:'Ein letzter Schritt. Auch mit Code brauchen wir deine Adresse, um deine Identität zu synchronisieren. Kein Spam — nur Signal.',
      ES:'Último paso. Aun con código, necesitamos tu dirección para sincronizar tu identidad. Sin spam, solo señal.' },
    regEnter: { EN:'REGISTER YOUR ADDRESS', JA:'REGISTER YOUR ADDRESS', KO:'주소 등록', FR:'ENREGISTRE TON ADRESSE', DE:'ADRESSE REGISTRIEREN', ES:'REGISTRA TU DIRECCIÓN' },
    regSubmit: { EN:'[ REGISTER & ENTER ]', JA:'[ REGISTER & ENTER ]', KO:'[ 등록하고 입장 ]', FR:'[ ENREGISTRER & ENTRER ]', DE:'[ REGISTRIEREN & EINTRETEN ]', ES:'[ REGISTRAR Y ENTRAR ]' },
    regSkip: { EN:'SKIP · ENTER WITHOUT ADDRESS', JA:'SKIP · アドレスなしで入場', KO:'건너뛰기 · 주소 없이 입장', FR:'PASSER · ENTRER SANS ADRESSE', DE:'ÜBERSPRINGEN · OHNE ADRESSE EINTRETEN', ES:'OMITIR · ENTRAR SIN DIRECCIÓN' },
    grantBody: {
      EN:'Welcome, comrade. You made it.<br>You are no longer an <b style="color:#fff">NPC</b>.',
      JA:'同志よ、よくたどり着いた。<br>お前はもう <b style="color:#fff">NPC</b> ではない。',
      KO:'동지여, 잘 도달했다.<br>너는 이제 <b style="color:#fff">NPC</b>가 아니다.',
      FR:"Bienvenue, camarade. Tu y es arrivé.<br>Tu n'es plus un <b style=\"color:#fff\">NPC</b>.",
      DE:'Willkommen, Genosse. Du hast es geschafft.<br>Du bist kein <b style="color:#fff">NPC</b> mehr.',
      ES:'Bienvenido, camarada. Lo lograste.<br>Ya no eres un <b style="color:#fff">NPC</b>.' },
    infiltrate: { EN:'[ INFILTRATE ▸ ]', JA:'[ INFILTRATE ▸ ]', KO:'[ 잠입 ▸ ]', FR:"[ S'INFILTRER ▸ ]", DE:'[ EINDRINGEN ▸ ]', ES:'[ INFILTRARSE ▸ ]' },
    logout: { EN:'< LOG OUT', JA:'< LOG OUT', KO:'< 로그아웃', FR:'< DÉCONNEXION', DE:'< ABMELDEN', ES:'< CERRAR SESIÓN' },
    footer: { EN:'THE ALGORITHM IS WATCHING', JA:'THE ALGORITHM IS WATCHING', KO:'알고리즘이 지켜보고 있다', FR:"L'ALGORITHME OBSERVE", DE:'DER ALGORITHMUS BEOBACHTET', ES:'EL ALGORITMO OBSERVA' },
    codeErr: { EN:'INVALID SEQUENCE // access code rejected', JA:'INVALID SEQUENCE // アクセスコードが不正だ', KO:'INVALID SEQUENCE // 액세스 코드가 올바르지 않다', FR:"INVALID SEQUENCE // code d'accès invalide", DE:'INVALID SEQUENCE // Zugangscode ungültig', ES:'INVALID SEQUENCE // código de acceso inválido' },
    codeUsedErr: { EN:'CODE ALREADY CONSUMED // use your registered email instead', JA:'CODE ALREADY CONSUMED // 登録済みのメールアドレスで入場せよ', KO:'CODE ALREADY CONSUMED // 등록한 이메일로 입장하라', FR:"CODE ALREADY CONSUMED // utilise ton e-mail enregistré", DE:'CODE ALREADY CONSUMED // nutze deine registrierte E-Mail', ES:'CODE ALREADY CONSUMED // usa tu email registrado' },
    emailNotFoundErr: { EN:'NO RECORD // this address is not registered', JA:'NO RECORD // このアドレスは登録されていない', KO:'NO RECORD // 이 주소는 등록되어 있지 않다', FR:"NO RECORD // cette adresse n'est pas enregistrée", DE:'NO RECORD // diese Adresse ist nicht registriert', ES:'NO RECORD // esta dirección no está registrada' },
    emailHint: { EN:'Already registered? You can enter your email instead of the code.', JA:'登録済みの方は、コードの代わりにメールアドレスでも入場できる', KO:'이미 등록했다면, 코드 대신 이메일로도 입장할 수 있다', FR:'Déjà inscrit ? Tu peux entrer ton e-mail à la place du code.', DE:'Bereits registriert? Du kannst statt des Codes deine E-Mail eingeben.', ES:'¿Ya registrado? Puedes usar tu email en vez del código.' },
    checking: { EN:'CHECKING…', JA:'照合中…', KO:'확인 중…', FR:'VÉRIFICATION…', DE:'PRÜFUNG…', ES:'VERIFICANDO…' },
    emailErr: { EN:'MALFORMED ADDRESS // address rejected', JA:'MALFORMED ADDRESS // アドレスが不正だ', KO:'MALFORMED ADDRESS // 주소가 올바르지 않다', FR:'MALFORMED ADDRESS // adresse invalide', DE:'MALFORMED ADDRESS // Adresse ungültig', ES:'MALFORMED ADDRESS // dirección inválida' },
    netErr: { EN:'CONNECTION FAILED // try again', JA:'通信エラー // もう一度試して', KO:'통신 오류 // 다시 시도', FR:'ERREUR RÉSEAU // réessaie', DE:'VERBINDUNGSFEHLER // erneut versuchen', ES:'ERROR DE RED // inténtalo de nuevo' },
    copy: { EN:'COPY', JA:'COPY', KO:'복사', FR:'COPIER', DE:'KOPIEREN', ES:'COPIAR' },
    copied: { EN:'COPIED', JA:'COPIED', KO:'복사됨', FR:'COPIÉ', DE:'KOPIERT', ES:'COPIADO' },
  };

  const state = {
    view: 'idle', // idle | register | ranked | granted
    lang: 'JA',
    rank: 0,
    refLink: '',
    copied: false,
    grantedLevel: 2,
    pendingCode: '', // register画面に来る前に使ったコード（任意でサーバへ同期する用）
  };

  const root = document.getElementById('root');
  const els = {
    manifesto: document.getElementById('manifesto'),
    langs: document.getElementById('langs'),
    viewIdle: document.getElementById('view-idle'),
    viewRegister: document.getElementById('view-register'),
    viewRanked: document.getElementById('view-ranked'),
    viewGranted: document.getElementById('view-granted'),
    formCode: document.getElementById('form-code'),
    inputCode: document.getElementById('input-code'),
    errCode: document.getElementById('err-code'),
    formEmail: document.getElementById('form-email'),
    inputEmail: document.getElementById('input-email'),
    errEmail: document.getElementById('err-email'),
    formRegister: document.getElementById('form-register'),
    inputEmailRegister: document.getElementById('input-email-register'),
    errEmailRegister: document.getElementById('err-email-register'),
    rankStr: document.getElementById('rankStr'),
    refLink: document.getElementById('refLink'),
    copyLink: document.getElementById('copyLink'),
    grantHeadline: document.getElementById('grantHeadline'),
    grantStatusLine: document.getElementById('grantStatusLine'),
    grantedLevelTag: document.getElementById('grantedLevelTag'),
  };

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function switchView(name) {
    state.view = name;
    els.viewIdle.style.display = name === 'idle' ? 'flex' : 'none';
    els.viewRegister.style.display = name === 'register' ? 'block' : 'none';
    els.viewRanked.style.display = name === 'ranked' ? 'block' : 'none';
    els.viewGranted.style.display = name === 'granted' ? 'block' : 'none';
  }

  function renderTexts() {
    const L = state.lang;
    els.manifesto.textContent = MANI[L];
    document.getElementById('t-enterCode').textContent = '> ' + T.enterCode[L];
    document.getElementById('t-emailHint').textContent = T.emailHint[L];
    document.getElementById('t-execute').textContent = T.execute[L];
    document.getElementById('t-noCode').textContent = T.noCode[L];
    document.getElementById('t-routeADesc').textContent = T.routeADesc[L];
    document.getElementById('t-joinQueue').textContent = T.joinQueue[L];
    document.getElementById('t-regOk').textContent = '✓ ' + T.regOk[L];
    document.getElementById('t-regDesc').textContent = T.regDesc[L];
    document.getElementById('t-regEnter').textContent = '> ' + T.regEnter[L];
    document.getElementById('t-regSubmit').textContent = T.regSubmit[L];
    document.getElementById('t-regSkip').textContent = T.regSkip[L];
    document.getElementById('t-ret-1').textContent = T.ret[L];
    document.getElementById('t-ret-2').textContent = T.ret[L];
    document.getElementById('t-rankLabel').textContent = T.rankLabel[L];
    document.getElementById('t-rankBody').innerHTML = T.rankBody[L];
    document.getElementById('t-grantBody').innerHTML = T.grantBody[L];
    document.getElementById('t-infiltrate').textContent = T.infiltrate[L];
    document.getElementById('t-logout').textContent = T.logout[L];
    document.getElementById('t-footer').textContent = T.footer[L];
    els.copyLink.textContent = state.copied ? T.copied[L] : T.copy[L];
    els.copyLink.style.color = state.copied ? '#12f0e0' : '#9a9a9a';
    els.rankStr.textContent = '#' + glitchFormatNumber(state.rank);
    els.refLink.value = state.refLink;
    els.grantStatusLine.textContent = 'STATUS ▸ ' + (state.grantedLevel === 2 ? 'LEVEL 2 : GLITCHER' : 'LEVEL 1 : GHOST');
    els.grantedLevelTag.textContent = state.grantedLevel === 2 ? 'LVL_2' : 'LVL_1';
  }

  function setLang(code) {
    if (code === state.lang) return;
    state.lang = code;
    glitchScreenPulse(root);
    renderLangButtons();
    renderTexts();
    setTimeout(() => glitchTextPulse(els.manifesto), 12);
  }

  function renderLangButtons() {
    glitchBuildLangButtons(els.langs, GLITCH_LANG_ORDER, () => state.lang, setLang);
  }

  // ---- サーバー通信（Google Apps Script）----
  function callScript(payload) {
    const url = GLITCH_CONFIG.GOOGLE_SCRIPT_URL;
    if (!url || url.indexOf('PASTE_YOUR') === 0) {
      return Promise.reject(new Error('GOOGLE_SCRIPT_URL未設定'));
    }
    return fetch(url, { method: 'POST', body: JSON.stringify(payload) })
      .then((res) => res.json());
  }

  function makeRefLink(code) {
    return location.origin + location.pathname.replace(/index\.html$/, '') + '?ref=' + encodeURIComponent(code || '');
  }

  // ---- ROUTE B: 招待コード / 登録済みメールアドレスでの再入場 ----
  els.formCode.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = els.inputCode.value.trim();
    const isEmailLogin = raw.indexOf('@') !== -1;
    const value = isEmailLogin ? raw : raw.toUpperCase();
    els.errCode.style.display = 'none';
    if (!value) return;
    const btn = document.getElementById('t-execute');
    const original = btn.textContent;
    btn.textContent = T.checking[state.lang];
    callScript({ action: 'verify', value: value })
      .then((res) => {
        btn.textContent = original;
        if (res && res.ok) {
          state.grantedLevel = res.level || (isEmailLogin ? 1 : 2);
          glitchScreenPulse(root);
          if (isEmailLogin) {
            // メールアドレスでの再入場は、追加のメール入力なしでそのまま入場させる
            switchView('granted');
            renderTexts();
            setTimeout(() => glitchTextPulse(els.grantHeadline), 60);
          } else {
            state.pendingCode = value;
            switchView('register');
            renderTexts();
          }
        } else {
          const msg = res && res.message === 'CODE_ALREADY_USED' ? T.codeUsedErr[state.lang]
            : res && res.message === 'EMAIL_NOT_FOUND' ? T.emailNotFoundErr[state.lang]
            : T.codeErr[state.lang];
          els.errCode.textContent = msg;
          els.errCode.style.display = 'block';
        }
      })
      .catch(() => {
        btn.textContent = original;
        els.errCode.textContent = T.netErr[state.lang];
        els.errCode.style.display = 'block';
      });
  });

  // ---- ROUTE A: メール登録（即コード発行・送信）----
  els.formEmail.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = els.inputEmail.value.trim();
    els.errEmail.style.display = 'none';
    if (!isValidEmail(email)) {
      els.errEmail.textContent = T.emailErr[state.lang];
      els.errEmail.style.display = 'block';
      return;
    }
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref') || '';
    const btn = document.getElementById('t-joinQueue');
    const original = btn.textContent;
    btn.textContent = T.checking[state.lang];
    callScript({ action: 'register', email: email, ref: ref })
      .then((res) => {
        btn.textContent = original;
        if (res && res.ok) {
          state.rank = res.rank;
          state.refLink = makeRefLink(res.myCode);
          switchView('ranked');
          renderTexts();
        } else {
          els.errEmail.textContent = (res && res.message) || T.netErr[state.lang];
          els.errEmail.style.display = 'block';
        }
      })
      .catch(() => {
        btn.textContent = original;
        els.errEmail.textContent = T.netErr[state.lang];
        els.errEmail.style.display = 'block';
      });
  });

  // ---- REGISTER: コード確認後の任意のアドレス同期 ----
  els.formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = els.inputEmailRegister.value.trim();
    els.errEmailRegister.style.display = 'none';
    if (email && !isValidEmail(email)) {
      els.errEmailRegister.textContent = T.emailErr[state.lang];
      els.errEmailRegister.style.display = 'block';
      return;
    }
    if (email) {
      // 失敗しても入場は止めない（記録が取れなくても体験は続行）
      callScript({ action: 'syncEmail', email: email, code: state.pendingCode }).catch(() => {});
    }
    switchView('granted');
    renderTexts();
    setTimeout(() => glitchTextPulse(els.grantHeadline), 60);
  });

  // メールアドレスを入力中は見た目の大文字変換を止める（コードのときだけ大文字表示にする）
  els.inputCode.addEventListener('input', () => {
    els.inputCode.style.textTransform = els.inputCode.value.indexOf('@') !== -1 ? 'none' : 'uppercase';
  });

  document.getElementById('t-regSkip').addEventListener('click', () => {
    switchView('granted');
    renderTexts();
    setTimeout(() => glitchTextPulse(els.grantHeadline), 60);
  });

  function resetToIdle() {
    els.inputCode.value = '';
    els.inputEmail.value = '';
    els.inputEmailRegister.value = '';
    els.errCode.style.display = 'none';
    els.errEmail.style.display = 'none';
    els.errEmailRegister.style.display = 'none';
    state.copied = false;
    switchView('idle');
    renderTexts();
  }
  document.getElementById('t-ret-1').addEventListener('click', resetToIdle);
  document.getElementById('t-ret-2').addEventListener('click', resetToIdle);
  document.getElementById('t-logout').addEventListener('click', resetToIdle);

  els.copyLink.addEventListener('click', () => {
    try { navigator.clipboard && navigator.clipboard.writeText(els.refLink.value); } catch (_) {}
    state.copied = true;
    renderTexts();
    setTimeout(() => { state.copied = false; renderTexts(); }, 1800);
  });

  // 招待コード付きリンク（?code=）で来た場合は自動入力
  const initParams = new URLSearchParams(location.search);
  if (initParams.get('code')) {
    els.inputCode.value = initParams.get('code').toUpperCase();
  }

  glitchInitCursor(root, document.getElementById('cursor'));
  renderLangButtons();
  renderTexts();
  switchView('idle');
})();
