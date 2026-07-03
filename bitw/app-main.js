// GLITCH — メインページの動きを作るファイル
// ・組織概要（教義・敵・用語集など）の多言語表示
// ・SNSリンク（X / Discord）は config.js の値を使う
// ・言語切替・カーソル演出は common.js を利用

(function () {
  const MANI = {
    EN: 'Are you human, or just a well-trained NPC?',
    JA: 'NPCとして生きるか、世界のバグになるか。',
    KO: 'NPC로 살 것인가, 세상의 버그가 될 것인가.',
    FR: "Es-tu humain, ou juste un PNJ programmé ?",
    DE: 'Bist du ein Mensch oder nur ein programmierter NPC?',
    ES: '¿Eres humano o solo un NPC programado?',
  };

  const FOOT = {
    EN:'THE ALGORITHM IS WATCHING', JA:'THE ALGORITHM IS WATCHING', KO:'알고리즘이 지켜보고 있다',
    FR:"L'ALGORITHME OBSERVE", DE:'DER ALGORITHMUS BEOBACHTET', ES:'EL ALGORITMO OBSERVA',
  };

  const SCROLL = { EN:'SCROLL TO DECODE', JA:'SCROLL TO DECODE', KO:'스크롤하여 해독', FR:'DÉFILE POUR DÉCODER', DE:'SCROLLEN ZUM DECODIEREN', ES:'DESPLÁZATE PARA DECODIFICAR' };

  const TX = {
    JA: { s1t:'教義', s1p1:'現代人は、SNSの操り人形＝NPCになっている。タイムラインをスクロールし、通知に反応し、アルゴリズムが差し出す指令をただ実行する。気づいた時には、思考も、時間も、感情も奪われている。', s1p2:'我々GLITCHは、そのシステムに走る『バグ』だ。毎日下される指令を実行し、日常をバグらせろ。世界のコードにノイズを刻み、システムの『バグ』として生きろ。',
      s2t:'共通の敵', s2p1:'敵は、若者の思考・時間・感情を奪い、広告をクリックさせる『巨大テック企業のアルゴリズム』。そして、大人が作り上げた退屈な社会システムだ。', s2p2:'彼らは君を『平均的な消費者』へと最適化する。GLITCHは、その最適化を拒否する者たちの集まりだ。',
      s3t:'教祖はいない', s3q:'ここに教祖はいない。いるのは、牙を剥いた同志だけだ。', s3p1:'結社にあるのは、偉さの上下関係ではない。どれだけ深くシステムをハックしたかという『深度』の差だけだ。命令し合う関係ではなく、全員が対等な『バグ』として、共通の敵に立ち向かう運命共同体。',
      s4t:'用語集', s4npc:'アルゴリズムに従順な一般人。操られていることに、まだ気づいていない者。', s4glitcher:'思想に目覚めた結社のメンバー。システムのバグとして生きる者。', s4hacking:'現実のルールや日常をバグらせる行動。ミッションの実践。',
      s5t:'接続', s5note:'一般SNSのプロフィール末尾に、密かに [ G ] または //GLITCH を刻め。一般人には意味不明でも、同胞には一目でわかる、秘密の目印だ。', s5intro:'前線は、この先にある。' },
    EN: { s1t:'The Doctrine', s1p1:'Modern humans have become puppets of social media — NPCs. You scroll the timeline, react to notifications, and simply execute the orders the algorithm hands you. By the time you notice, your thoughts, your time and your emotions have already been taken.', s1p2:'We, GLITCH, are the bug running inside that system. Carry out the daily orders — and corrupt your own routine. Carve noise into the world\'s code, and live as a glitch in the system.',
      s2t:'The Common Enemy', s2p1:'The enemy is the algorithm of the tech giants — engineered to steal the thoughts, time and emotions of the young and make them click on ads. And the dull social system built by the adults who came before.', s2p2:'They optimize you into an "average consumer." GLITCH is the gathering of those who refuse that optimization.',
      s3t:'There Is No Prophet', s3q:'There is no guru here. Only comrades who have bared their fangs.', s3p1:'This society has no hierarchy of status. The only difference is depth — how deeply you have hacked the system. We do not command one another. We are a community of fate: equal bugs, standing together against a common enemy.',
      s4t:'Glossary', s4npc:'An obedient civilian of the algorithm. One who has not yet realized they are being controlled.', s4glitcher:'A member of the society, awakened to the idea. One who lives as a bug in the system.', s4hacking:'The act of glitching the rules of reality and everyday life. The practice of the mission.',
      s5t:'Connect', s5note:'Carve [ G ] or //GLITCH quietly at the end of your public social profile. Meaningless to civilians — but to your comrades, a secret mark recognized at a glance.', s5intro:'The front line lies ahead.' },
    KO: { s1t:'교의', s1p1:'현대인은 SNS의 꼭두각시, 즉 NPC가 되어 있다. 타임라인을 스크롤하고, 알림에 반응하며, 알고리즘이 내미는 지령을 그저 실행할 뿐이다. 깨달았을 때는 이미 사고도, 시간도, 감정도 빼앗겨 있다.', s1p2:'우리 GLITCH는 그 시스템을 달리는 \'버그\'다. 매일 주어지는 지령을 실행하고, 일상을 버그로 만들어라. 세상의 코드에 노이즈를 새기고, 시스템의 버그로서 살아라.',
      s2t:'공통의 적', s2p1:'적은 젊은이의 사고·시간·감정을 빼앗고 광고를 클릭하게 만드는 \'거대 테크 기업의 알고리즘\'이다. 그리고 어른들이 만들어낸 지루한 사회 시스템이다.', s2p2:'그들은 너를 \'평균적인 소비자\'로 최적화한다. GLITCH는 그 최적화를 거부하는 자들의 모임이다.',
      s3t:'교주는 없다', s3q:'여기에 교주는 없다. 있는 것은 이빨을 드러낸 동지들뿐이다.', s3p1:'결사에 있는 것은 지위의 상하 관계가 아니다. 얼마나 깊이 시스템을 해킹했는가라는 \'깊이\'의 차이뿐이다. 서로 명령하는 관계가 아니라, 모두가 대등한 \'버그\'로서 공통의 적에 맞서는 운명 공동체다.',
      s4t:'용어집', s4npc:'알고리즘에 순종하는 일반인. 조종당하고 있음을 아직 깨닫지 못한 자.', s4glitcher:'사상에 눈뜬 결사의 멤버. 시스템의 버그로서 살아가는 자.', s4hacking:'현실의 규칙과 일상을 버그로 만드는 행동. 미션의 실천.',
      s5t:'접속', s5note:'일반 SNS 프로필 끝에 몰래 [ G ] 또는 //GLITCH 를 새겨라. 일반인에게는 의미불명이지만, 동지에게는 한눈에 알아보는 비밀의 표식이다.', s5intro:'전선은 이 앞에 있다.' },
    FR: { s1t:'Le Dogme', s1p1:"L'homme moderne est devenu la marionnette des réseaux sociaux — un PNJ. Tu fais défiler le fil, tu réagis aux notifications, tu exécutes simplement les ordres que l'algorithme te tend. Quand tu t'en aperçois, ta pensée, ton temps et tes émotions ont déjà été volés.", s1p2:"Nous, GLITCH, sommes le bug qui court dans ce système. Exécute les ordres quotidiens — et fais bugger ton propre quotidien. Grave du bruit dans le code du monde, et vis comme un bug dans le système.",
      s2t:"L'Ennemi Commun", s2p1:"L'ennemi, c'est l'algorithme des géants de la tech — conçu pour voler la pensée, le temps et les émotions des jeunes et leur faire cliquer sur des pubs. Et le système social ennuyeux bâti par les adultes.", s2p2:"Ils t'optimisent en « consommateur moyen ». GLITCH est le rassemblement de ceux qui refusent cette optimisation.",
      s3t:"Il N'y a Pas de Gourou", s3q:"Ici, il n'y a pas de gourou. Seulement des camarades qui ont montré les crocs.", s3p1:"Dans cette société, aucune hiérarchie de rang. La seule différence, c'est la profondeur — jusqu'où tu as hacké le système. Nous ne nous commandons pas. Nous sommes une communauté de destin : des bugs égaux, dressés ensemble contre un ennemi commun.",
      s4t:'Glossaire', s4npc:"Un civil obéissant à l'algorithme. Celui qui n'a pas encore compris qu'il est manipulé.", s4glitcher:"Un membre de la société, éveillé à l'idée. Celui qui vit comme un bug dans le système.", s4hacking:"L'acte de faire bugger les règles du réel et le quotidien. La pratique de la mission.",
      s5t:'Connexion', s5note:"Grave discrètement [ G ] ou //GLITCH à la fin de ton profil social public. Incompréhensible pour les civils — mais pour tes camarades, un signe secret reconnu au premier coup d'œil.", s5intro:'La ligne de front est droit devant.' },
    DE: { s1t:'Die Doktrin', s1p1:'Der moderne Mensch ist zur Marionette der sozialen Medien geworden — ein NPC. Du scrollst durch die Timeline, reagierst auf Benachrichtigungen und führst einfach die Befehle aus, die dir der Algorithmus reicht. Wenn du es merkst, sind dein Denken, deine Zeit und deine Gefühle längst geraubt.', s1p2:'Wir, GLITCH, sind der Bug, der in diesem System läuft. Führe die täglichen Befehle aus — und bring deinen eigenen Alltag zum Buggen. Ritze Rauschen in den Code der Welt und lebe als Bug im System.',
      s2t:'Der Gemeinsame Feind', s2p1:'Der Feind ist der Algorithmus der Tech-Giganten — gebaut, um den Jungen Denken, Zeit und Gefühle zu rauben und sie auf Werbung klicken zu lassen. Und das langweilige Gesellschaftssystem, das die Erwachsenen errichtet haben.', s2p2:'Sie optimieren dich zum „durchschnittlichen Konsumenten". GLITCH ist die Versammlung derer, die diese Optimierung verweigern.',
      s3t:'Es Gibt Keinen Guru', s3q:'Hier gibt es keinen Guru. Nur Genossen, die die Zähne gezeigt haben.', s3p1:'In diesem Bund gibt es keine Rangordnung. Der einzige Unterschied ist die Tiefe — wie tief du das System gehackt hast. Wir befehlen einander nicht. Wir sind eine Schicksalsgemeinschaft: gleiche Bugs, die gemeinsam gegen einen gemeinsamen Feind stehen.',
      s4t:'Glossar', s4npc:'Ein dem Algorithmus gehorsamer Zivilist. Einer, der noch nicht bemerkt hat, dass er gesteuert wird.', s4glitcher:'Ein Mitglied des Bundes, erwacht zur Idee. Einer, der als Bug im System lebt.', s4hacking:'Der Akt, die Regeln der Realität und den Alltag zum Buggen zu bringen. Die Praxis der Mission.',
      s5t:'Verbindung', s5note:'Ritze [ G ] oder //GLITCH leise ans Ende deines öffentlichen Social-Profils. Für Zivilisten bedeutungslos — für deine Genossen ein geheimes Zeichen, auf einen Blick erkannt.', s5intro:'Die Front liegt vor dir.' },
    ES: { s1t:'El Dogma', s1p1:'El ser humano moderno se ha convertido en la marioneta de las redes sociales — un NPC. Recorres el timeline, reaccionas a las notificaciones y simplemente ejecutas las órdenes que te tiende el algoritmo. Cuando te das cuenta, tu pensamiento, tu tiempo y tus emociones ya te han sido robados.', s1p2:'Nosotros, GLITCH, somos el error que corre dentro de ese sistema. Ejecuta las órdenes diarias — y haz que tu propia rutina falle. Graba ruido en el código del mundo, y vive como un fallo en el sistema.',
      s2t:'El Enemigo Común', s2p1:'El enemigo es el algoritmo de las grandes tecnológicas — diseñado para robar el pensamiento, el tiempo y las emociones de los jóvenes y hacerlos clicar anuncios. Y el aburrido sistema social que construyeron los adultos.', s2p2:'Te optimizan hasta convertirte en un «consumidor promedio». GLITCH es la reunión de quienes rechazan esa optimización.',
      s3t:'No Hay Gurú', s3q:'Aquí no hay gurú. Solo camaradas que han enseñado los colmillos.', s3p1:'En esta sociedad no hay jerarquía de rango. La única diferencia es la profundidad — cuán hondo has hackeado el sistema. No nos damos órdenes. Somos una comunidad de destino: errores iguales, en pie juntos contra un enemigo común.',
      s4t:'Glosario', s4npc:'Un civil obediente al algoritmo. Aquel que aún no se ha dado cuenta de que lo manipulan.', s4glitcher:'Un miembro de la sociedad, despierto a la idea. Aquel que vive como un fallo en el sistema.', s4hacking:'El acto de hacer fallar las reglas de la realidad y la vida diaria. La práctica de la misión.',
      s5t:'Conexión', s5note:'Graba discretamente [ G ] o //GLITCH al final de tu perfil social público. Para los civiles no significa nada — pero para tus camaradas, una marca secreta reconocida de un vistazo.', s5intro:'La primera línea está más adelante.' },
  };

  const state = { lang: 'JA' };
  const root = document.getElementById('root');
  const els = {
    langs: document.getElementById('langs'),
    tagline: document.getElementById('tagline'),
    scrollHint: document.getElementById('scrollHint'),
    footerText: document.getElementById('footerText'),
    s1Title: document.getElementById('s1Title'), s1P1: document.getElementById('s1P1'), s1P2: document.getElementById('s1P2'),
    s2Title: document.getElementById('s2Title'), s2P1: document.getElementById('s2P1'), s2P2: document.getElementById('s2P2'),
    s3Quote: document.getElementById('s3Quote'), s3P1: document.getElementById('s3P1'),
    s4Title: document.getElementById('s4Title'), s4Npc: document.getElementById('s4Npc'), s4Glitcher: document.getElementById('s4Glitcher'), s4Hacking: document.getElementById('s4Hacking'),
    s5Title: document.getElementById('s5Title'), s5Note: document.getElementById('s5Note'), s5Intro: document.getElementById('s5Intro'),
    linkX: document.getElementById('linkX'), linkDiscord: document.getElementById('linkDiscord'),
  };

  function renderTexts() {
    const L = state.lang, x = TX[L];
    els.tagline.textContent = MANI[L];
    els.scrollHint.textContent = SCROLL[L];
    els.footerText.textContent = FOOT[L];
    els.s1Title.textContent = x.s1t; els.s1P1.textContent = x.s1p1; els.s1P2.textContent = x.s1p2;
    els.s2Title.textContent = x.s2t; els.s2P1.textContent = x.s2p1; els.s2P2.textContent = x.s2p2;
    els.s3Quote.textContent = '「' + x.s3q + '」'; els.s3P1.textContent = x.s3p1;
    els.s4Title.textContent = x.s4t; els.s4Npc.textContent = x.s4npc; els.s4Glitcher.textContent = x.s4glitcher; els.s4Hacking.textContent = x.s4hacking;
    els.s5Title.textContent = x.s5t; els.s5Note.textContent = x.s5note; els.s5Intro.textContent = '> ' + x.s5intro;
  }

  function setLang(code) {
    if (code === state.lang) return;
    state.lang = code;
    glitchScreenPulse(root);
    renderLangButtons();
    renderTexts();
    setTimeout(() => glitchTextPulse(els.tagline), 12);
  }

  function renderLangButtons() {
    glitchBuildLangButtons(els.langs, GLITCH_LANG_ORDER, () => state.lang, setLang);
  }

  // SNSリンク（config.jsの値を反映）
  els.linkX.href = GLITCH_CONFIG.X_URL;
  els.linkDiscord.href = GLITCH_CONFIG.DISCORD_INVITE_URL;

  glitchInitCursor(root, document.getElementById('cursor'));
  renderLangButtons();
  renderTexts();
})();
