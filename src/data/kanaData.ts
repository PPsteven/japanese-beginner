export interface Example {
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
}

export interface KanaItem {
  kana: string;
  katakana: string;
  romaji: string;
  examples: Example[];
  row?: number;
  col?: number;
}

export interface KanaCategory {
  id: string;
  name: string;
  description: string;
  items: KanaItem[];
}

export const KANA_DATA: KanaCategory[] = [
  {
    id: 'pure',
    name: '五十音',
    description: '日语发音的基础，包含平假名与片假名。',
    items: [
      { kana: 'あ', katakana: 'ア', romaji: 'a', row: 0, col: 0, examples: [{ word: '朝', reading: 'あさ', romaji: 'asa', meaning: '早晨' }] },
      { kana: 'い', katakana: 'イ', romaji: 'i', row: 0, col: 1, examples: [{ word: '犬', reading: 'いぬ', romaji: 'inu', meaning: '狗' }] },
      { kana: 'う', katakana: 'ウ', romaji: 'u', row: 0, col: 2, examples: [{ word: '海', reading: 'うmi', romaji: 'umi', meaning: '大海' }] },
      { kana: 'え', katakana: 'エ', romaji: 'e', row: 0, col: 3, examples: [{ word: '駅', reading: 'えき', romaji: 'eki', meaning: '车站' }] },
      { kana: 'お', katakana: 'オ', romaji: 'o', row: 0, col: 4, examples: [{ word: '美味しい', reading: 'おいしい', romaji: 'oishii', meaning: '好吃' }] },
      
      { kana: 'か', katakana: 'カ', romaji: 'ka', row: 1, col: 0, examples: [{ word: '傘', reading: 'かさ', romaji: 'kasa', meaning: '伞' }] },
      { kana: 'き', katakana: 'キ', romaji: 'ki', row: 1, col: 1, examples: [{ word: '切手', reading: 'きって', romaji: 'kitte', meaning: '邮票' }] },
      { kana: 'く', katakana: 'ク', romaji: 'ku', row: 1, col: 2, examples: [{ word: '车', reading: 'くるま', romaji: 'kuruma', meaning: '车' }] },
      { kana: 'け', katakana: 'ケ', romaji: 'ke', row: 1, col: 3, examples: [{ word: '携帯', reading: 'けいたい', romaji: 'keitai', meaning: '手机' }] },
      { kana: 'こ', katakana: 'コ', romaji: 'ko', row: 1, col: 4, examples: [{ word: '子供', reading: 'こども', romaji: 'kodomo', meaning: '孩子' }] },
      
      { kana: 'さ', katakana: 'サ', romaji: 'sa', row: 2, col: 0, examples: [{ word: '魚', reading: 'さかな', romaji: 'sakana', meaning: '鱼' }] },
      { kana: 'し', katakana: 'シ', romaji: 'shi', row: 2, col: 1, examples: [{ word: '新聞', reading: 'しんぶん', romaji: 'shinbun', meaning: '新闻' }] },
      { kana: 'す', katakana: 'ス', romaji: 'su', row: 2, col: 2, examples: [{ word: '寿司', reading: 'すし', romaji: 'sushi', meaning: '寿司' }] },
      { kana: 'せ', katakana: 'セ', romaji: 'se', row: 2, col: 3, examples: [{ word: '先生', reading: 'せんせい', romaji: 'sensei', meaning: '老师' }] },
      { kana: 'そ', katakana: 'ソ', romaji: 'so', row: 2, col: 4, examples: [{ word: '空', reading: 'そら', romaji: 'sora', meaning: '天空' }] },
      
      { kana: 'た', katakana: 'タ', romaji: 'ta', row: 3, col: 0, examples: [{ word: '卵', reading: 'たまご', romaji: 'tamago', meaning: '鸡蛋' }] },
      { kana: 'ち', katakana: 'チ', romaji: 'chi', row: 3, col: 1, examples: [{ word: '地下鉄', reading: 'ちかてつ', romaji: 'chikatetsu', meaning: '地铁' }] },
      { kana: 'つ', katakana: 'ツ', romaji: 'tsu', row: 3, col: 2, examples: [{ word: '机', reading: 'つくえ', romaji: 'tsukue', meaning: '桌子' }] },
      { kana: 'て', katakana: 'テ', romaji: 'te', row: 3, col: 3, examples: [{ word: '手紙', reading: 'てがmi', romaji: 'tegami', meaning: '信' }] },
      { kana: 'と', katakana: 'ト', romaji: 'to', row: 3, col: 4, examples: [{ word: '友達', reading: 'ともだち', romaji: 'tomodachi', meaning: '朋友' }] },
      
      { kana: 'な', katakana: 'ナ', romaji: 'na', row: 4, col: 0, examples: [{ word: '夏', reading: 'なつ', romaji: 'natsu', meaning: '夏天' }] },
      { kana: 'に', katakana: 'ニ', romaji: 'ni', row: 4, col: 1, examples: [{ word: '肉', reading: 'にく', romaji: 'niku', meaning: '肉' }] },
      { kana: 'ぬ', katakana: 'ヌ', romaji: 'nu', row: 4, col: 2, examples: [{ word: 'ぬいぐるみ', reading: 'ぬいぐるみ', romaji: 'nuigurumi', meaning: '毛绒玩具' }] },
      { kana: 'ね', katakana: 'ネ', romaji: 'ne', row: 4, col: 3, examples: [{ word: '猫', reading: 'ねこ', romaji: 'neko', meaning: '猫' }] },
      { kana: 'の', katakana: 'ノ', romaji: 'no', row: 4, col: 4, examples: [{ word: '飲み物', reading: 'のみもの', romaji: 'nomimono', meaning: '饮料' }] },
      
      { kana: 'は', katakana: 'ハ', romaji: 'ha', row: 5, col: 0, examples: [{ word: '花', reading: 'はな', romaji: 'hana', meaning: '花' }] },
      { kana: 'ひ', katakana: 'ヒ', romaji: 'hi', row: 5, col: 1, examples: [{ word: '飛行機', reading: 'ひこうき', romaji: 'hikouki', meaning: '飞机' }] },
      { kana: 'ふ', katakana: 'フ', romaji: 'fu', row: 5, col: 2, examples: [{ word: '船', reading: 'ふね', romaji: 'fune', meaning: '船' }] },
      { kana: 'へ', katakana: 'ヘ', romaji: 'he', row: 5, col: 3, examples: [{ word: '部屋', reading: 'へや', romaji: 'heya', meaning: '房间' }] },
      { kana: 'ほ', katakana: 'ホ', romaji: 'ho', row: 5, col: 4, examples: [{ word: '本', reading: 'ほん', romaji: 'hon', meaning: '书' }] },
      
      { kana: 'ま', katakana: 'マ', romaji: 'ma', row: 6, col: 0, examples: [{ word: '窓', reading: 'まど', romaji: 'mado', meaning: '窗户' }] },
      { kana: 'み', katakana: 'ミ', romaji: 'mi', row: 6, col: 1, examples: [{ word: '耳', reading: 'みみ', romaji: 'mimi', meaning: '耳朵' }] },
      { kana: 'む', katakana: 'ム', romaji: 'mu', row: 6, col: 2, examples: [{ word: '虫', reading: 'むし', romaji: 'mushi', meaning: '虫子' }] },
      { kana: 'め', katakana: 'メ', romaji: 'me', row: 6, col: 3, examples: [{ word: '眼鏡', reading: 'めがね', romaji: 'megane', meaning: '眼镜' }] },
      { kana: 'も', katakana: 'モ', romaji: 'mo', row: 6, col: 4, examples: [{ word: '森', reading: 'もり', romaji: 'mori', meaning: '森林' }] },
      
      { kana: 'や', katakana: 'ヤ', romaji: 'ya', row: 7, col: 0, examples: [{ word: '山', reading: 'やま', romaji: 'yama', meaning: '山' }] },
      { kana: 'ゆ', katakana: 'ユ', romaji: 'yu', row: 7, col: 2, examples: [{ word: '雪', reading: 'ゆき', romaji: 'yuki', meaning: '雪' }] },
      { kana: 'よ', katakana: 'ヨ', romaji: 'yo', row: 7, col: 4, examples: [{ word: '夜', reading: 'よる', romaji: 'yoru', meaning: '夜晚' }] },
      
      { kana: 'ら', katakana: 'ラ', romaji: 'ra', row: 8, col: 0, examples: [{ word: '来週', reading: 'らいしゅう', romaji: 'raishuu', meaning: '下周' }] },
      { kana: 'り', katakana: 'リ', romaji: 'ri', row: 8, col: 1, examples: [{ word: '林檎', reading: 'りんご', romaji: 'ringo', meaning: '苹果' }] },
      { kana: 'る', katakana: 'ル', romaji: 'ru', row: 8, col: 2, examples: [{ word: '留守', reading: 'るす', romaji: 'rusu', meaning: '不在家' }] },
      { kana: 'れ', katakana: 'レ', romaji: 're', row: 8, col: 3, examples: [{ word: '练习', reading: 'れんしゅう', romaji: 'renshuu', meaning: '练习' }] },
      { kana: 'ろ', katakana: 'ロ', romaji: 'ro', row: 8, col: 4, examples: [{ word: '六', reading: 'ろく', romaji: 'roku', meaning: '六' }] },
      
      { kana: 'わ', katakana: 'ワ', romaji: 'wa', row: 9, col: 0, examples: [{ word: '私', reading: 'わたし', romaji: 'watashi', meaning: '我' }] },
      { kana: 'を', katakana: 'ヲ', romaji: 'wo', row: 9, col: 4, examples: [{ word: '本を', reading: 'ほんを', romaji: 'hon-wo', meaning: '（读）书' }] },
      { kana: 'ん', katakana: 'ン', romaji: 'n', row: 10, col: 0, examples: [{ word: '新聞', reading: 'しんぶん', romaji: 'shinbun', meaning: '新闻' }] },
    ]
  },
  {
    id: 'dakuon',
    name: '变音 (Dakuon)',
    description: '浊音/半浊音（が、ぱ），展示清浊对比（如：か vs が）。右上角加 ゛ 或 ゜。',
    items: [
      { kana: 'が', katakana: 'ガ', romaji: 'ga', examples: [{ word: '大学', reading: 'だいがく', romaji: 'daigaku', meaning: '大学' }, { word: '学校', reading: 'がっこう', romaji: 'gakkou', meaning: '学校' }] },
      { kana: 'ざ', katakana: 'ザ', romaji: 'za', examples: [{ word: '雑誌', reading: 'ざっし', romaji: 'zasshi', meaning: '杂志' }] },
      { kana: 'だ', katakana: 'ダ', romaji: 'da', examples: [{ word: '台所', reading: 'だいどころ', romaji: 'daidokoro', meaning: '厨房' }] },
      { kana: 'ば', katakana: 'バ', romaji: 'ba', examples: [{ word: '晩御飯', reading: 'ばんごはん', romaji: 'bangohan', meaning: '晚餐' }] },
      { kana: 'ぱ', katakana: 'パ', romaji: 'pa', examples: [{ word: '天ぷら', reading: 'てんぷら', romaji: 'tenpura', meaning: '天妇罗' }] },
    ]
  },
  {
    id: 'contracted',
    name: '组合音 (Contracted)',
    description: '拗音（きゃ、しゅ），い段假名 + 小写 ya/yu/yo。两个假名缩为一个节拍。',
    items: [
      { kana: 'きゃ', katakana: 'キャ', romaji: 'kya', examples: [{ word: '客', reading: 'きゃく', romaji: 'kyaku', meaning: '客人' }] },
      { kana: 'しゃ', katakana: 'シャ', romaji: 'sha', examples: [{ word: '写真', reading: 'しゃしん', romaji: 'shashin', meaning: '照片' }] },
      { kana: 'ちゃ', katakana: 'チャ', romaji: 'cha', examples: [{ word: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaning: '茶' }] },
    ]
  },
  {
    id: 'special',
    name: '节拍音 (Special)',
    description: '促音（っ）、拨音（ん）、长音（ー）。',
    items: [
      { kana: 'っ', katakana: 'ッ', romaji: '(pause)', examples: [{ word: '切手', reading: 'きって', romaji: 'kitte', meaning: '邮票' }, { word: '学校', reading: 'がっこう', romaji: 'gakkou', meaning: '学校' }] },
      { kana: 'ん', katakana: 'ン', romaji: 'n', examples: [{ word: '先生', reading: 'せんせい', romaji: 'sensei', meaning: '老师' }, { word: '案内', reading: 'あんない', romaji: 'annai', meaning: '引导' }] },
      { kana: 'ー', katakana: 'ー', romaji: '(long)', examples: [{ word: 'ノート', reading: 'のーと', romaji: 'nōto', meaning: '笔记本' }] },
    ]
  }
];
