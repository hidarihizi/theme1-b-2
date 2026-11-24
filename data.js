// =============================================
// 売り場と商品のデータ
// 商品を増やしたいときは、下の ITEMS に1行追加するだけでOK
// =============================================

// 売り場（店内マップ上の四角形）
//   id   : 商品とつなぐための名前（半角英字）
//   name : 画面に表示する売り場名
//   x, y : 四角形の左上の位置 / w, h : 幅と高さ
//   ※ マップ全体の大きさは 横400 × 縦520（左上が 0,0）
const SECTIONS = [
  { id: "drink",      name: "飲料",           x: 25,  y: 25,  w: 160, h: 50 },
  { id: "bento",      name: "弁当・おにぎり", x: 195, y: 25,  w: 180, h: 50 },
  { id: "bread",      name: "パン",           x: 25,  y: 95,  w: 90,  h: 80 },
  { id: "book",       name: "雑誌・本",       x: 25,  y: 185, w: 90,  h: 80 },
  { id: "stationery", name: "文具",           x: 25,  y: 275, w: 90,  h: 100 },
  { id: "snack",      name: "お菓子",         x: 140, y: 105, w: 135, h: 40 },
  { id: "food",       name: "カップ麺・食品", x: 140, y: 175, w: 135, h: 40 },
  { id: "daily",      name: "日用品・医薬品", x: 140, y: 245, w: 135, h: 40 },
  { id: "dessert",    name: "デザート",       x: 300, y: 95,  w: 75,  h: 90 },
  { id: "ice",        name: "アイス",         x: 300, y: 195, w: 75,  h: 70 },
  { id: "copy",       name: "コピー機",       x: 300, y: 275, w: 75,  h: 60 },
  { id: "hotsnack",   name: "ホットスナック", x: 140, y: 400, w: 120, h: 45 },
  { id: "register",   name: "レジ",           x: 270, y: 400, w: 105, h: 45 },
];

// 商品
//   name     : 商品名
//   section  : 置いてある売り場の id（上の SECTIONS の id）
//   keywords : ほかの呼び方や読みがな（なくてもOK）
//   ※ カタカナとひらがな、全角と半角の違いは自動でそろえるので、どちらか片方を書けばOK
const ITEMS = [
  // 飲料
  { name: "お茶", section: "drink", keywords: ["おちゃ", "緑茶", "麦茶", "むぎちゃ", "ほうじ茶", "ウーロン茶"] },
  { name: "水", section: "drink", keywords: ["みず", "ミネラルウォーター", "天然水"] },
  { name: "コーヒー", section: "drink", keywords: ["缶コーヒー", "カフェオレ"] },
  { name: "紅茶", section: "drink", keywords: ["こうちゃ", "ミルクティー", "レモンティー"] },
  { name: "ジュース", section: "drink", keywords: ["オレンジジュース", "りんごジュース", "野菜ジュース"] },
  { name: "炭酸飲料", section: "drink", keywords: ["炭酸", "たんさん", "コーラ", "サイダー"] },
  { name: "スポーツドリンク", section: "drink", keywords: ["スポドリ"] },
  { name: "エナジードリンク", section: "drink", keywords: ["エナドリ"] },
  { name: "牛乳", section: "drink", keywords: ["ぎゅうにゅう", "ミルク"] },

  // 弁当・おにぎり
  { name: "おにぎり", section: "bento", keywords: ["おむすび"] },
  { name: "弁当", section: "bento", keywords: ["べんとう", "お弁当"] },
  { name: "サンドイッチ", section: "bento", keywords: ["サンド"] },
  { name: "サラダ", section: "bento" },
  { name: "パスタ", section: "bento", keywords: ["スパゲッティ"] },
  { name: "そば・うどん", section: "bento", keywords: ["そば", "うどん", "冷やし中華"] },

  // パン
  { name: "菓子パン", section: "bread", keywords: ["メロンパン", "あんぱん", "クリームパン"] },
  { name: "惣菜パン", section: "bread", keywords: ["カレーパン", "焼きそばパン", "ウインナーパン"] },
  { name: "食パン", section: "bread", keywords: ["しょくぱん"] },

  // デザート
  { name: "ヨーグルト", section: "dessert" },
  { name: "プリン", section: "dessert" },
  { name: "シュークリーム", section: "dessert", keywords: ["スイーツ"] },
  { name: "ゼリー", section: "dessert" },

  // お菓子
  { name: "ポテトチップス", section: "snack", keywords: ["ポテチ", "スナック菓子"] },
  { name: "チョコレート", section: "snack", keywords: ["ちょこれいと"] },
  { name: "クッキー", section: "snack", keywords: ["ビスケット"] },
  { name: "グミ", section: "snack" },
  { name: "ガム", section: "snack" },
  { name: "あめ", section: "snack", keywords: ["飴", "キャンディ", "のど飴"] },
  { name: "せんべい", section: "snack", keywords: ["おせんべい"] },
  { name: "ナッツ", section: "snack", keywords: ["アーモンド"] },

  // カップ麺・食品
  { name: "カップ麺", section: "food", keywords: ["カップめん", "カップラーメン", "ラーメン"] },
  { name: "カップ焼きそば", section: "food", keywords: ["焼きそば", "やきそば"] },
  { name: "インスタント味噌汁", section: "food", keywords: ["味噌汁", "みそしる", "スープ"] },
  { name: "レトルトカレー", section: "food", keywords: ["カレーライス"] },
  { name: "パックご飯", section: "food", keywords: ["ご飯", "ごはん", "ライス"] },
  { name: "調味料", section: "food", keywords: ["醤油", "しょうゆ", "マヨネーズ", "ケチャップ", "塩"] },

  // 日用品・医薬品
  { name: "ティッシュ", section: "daily", keywords: ["ポケットティッシュ"] },
  { name: "マスク", section: "daily" },
  { name: "歯ブラシ", section: "daily", keywords: ["はぶらし", "歯みがき粉", "歯磨き粉"] },
  { name: "絆創膏", section: "daily", keywords: ["ばんそうこう"] },
  { name: "目薬", section: "daily", keywords: ["めぐすり"] },
  { name: "風邪薬", section: "daily", keywords: ["かぜ薬", "くすり", "頭痛薬"] },
  { name: "電池", section: "daily", keywords: ["でんち", "乾電池"] },
  { name: "充電ケーブル", section: "daily", keywords: ["ケーブル", "充電器", "USBケーブル"] },
  { name: "傘", section: "daily", keywords: ["かさ", "ビニール傘"] },
  { name: "ハンドソープ", section: "daily", keywords: ["せっけん", "石けん"] },
  { name: "ゴミ袋", section: "daily", keywords: ["ごみぶくろ"] },

  // 文具
  { name: "ボールペン", section: "stationery" },
  { name: "シャープペンシル", section: "stationery", keywords: ["シャーペン"] },
  { name: "シャープペンの芯", section: "stationery", keywords: ["シャー芯", "替え芯"] },
  { name: "消しゴム", section: "stationery", keywords: ["けしごむ"] },
  { name: "ノート", section: "stationery", keywords: ["大学ノート"] },
  { name: "ルーズリーフ", section: "stationery" },
  { name: "クリアファイル", section: "stationery", keywords: ["ファイル"] },
  { name: "蛍光ペン", section: "stationery", keywords: ["けいこうペン", "マーカー"] },
  { name: "修正テープ", section: "stationery", keywords: ["修正液"] },
  { name: "のり", section: "stationery", keywords: ["スティックのり"] },
  { name: "はさみ", section: "stationery" },
  { name: "定規", section: "stationery", keywords: ["じょうぎ", "ものさし"] },
  { name: "付箋", section: "stationery", keywords: ["ふせん"] },
  { name: "レポート用紙", section: "stationery" },
  { name: "封筒", section: "stationery", keywords: ["ふうとう"] },
  { name: "USBメモリ", section: "stationery" },
  { name: "電卓", section: "stationery", keywords: ["でんたく", "関数電卓"] },

  // 雑誌・本
  { name: "雑誌", section: "book", keywords: ["ざっし"] },
  { name: "漫画", section: "book", keywords: ["まんが", "コミック"] },
  { name: "参考書", section: "book", keywords: ["さんこうしょ", "教科書"] },
  { name: "就活本", section: "book", keywords: ["就活", "就職", "SPI"] },
  { name: "新聞", section: "book", keywords: ["しんぶん"] },

  // アイス
  { name: "アイス", section: "ice", keywords: ["アイスクリーム", "チョコアイス", "ソフトクリーム"] },
  { name: "かき氷", section: "ice", keywords: ["かきごおり"] },
  { name: "氷", section: "ice", keywords: ["こおり", "ロックアイス"] },

  // コピー機
  { name: "コピー", section: "copy", keywords: ["印刷", "いんさつ", "プリント"] },

  // ホットスナック（レジ横）
  { name: "からあげ", section: "hotsnack", keywords: ["唐揚げ", "から揚げ"] },
  { name: "フライドチキン", section: "hotsnack", keywords: ["チキン"] },
  { name: "肉まん", section: "hotsnack", keywords: ["にくまん", "中華まん", "あんまん"] },
  { name: "コロッケ", section: "hotsnack" },

  // レジ
  { name: "切手", section: "register", keywords: ["きって"] },
  { name: "はがき", section: "register", keywords: ["葉書"] },
  { name: "レジ袋", section: "register", keywords: ["レジぶくろ"] },
  { name: "宅配便", section: "register", keywords: ["たくはいびん", "宅急便", "配送"] },
  { name: "電子マネーのチャージ", section: "register", keywords: ["チャージ"] },
];
