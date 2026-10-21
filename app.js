/* =========================================================
   遗珍 · 非物质文化遗产数字档案馆
   Interaction layer — no external dependencies
   ========================================================= */
(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* =======================================================
     1. Content model
     ======================================================= */

  const categoryColors = {
    '传统戏剧': '#d15a42',
    '传统技艺': '#c7a86a',
    '传统音乐': '#8fc9b3',
    '民俗': '#9aa89f',
    '传统美术': '#d18a6a',
    '传统医药': '#a87f9a',
    '民间文学': '#8b9fc7',
    '传统舞蹈': '#c98a9a',
    '曲艺': '#b7a06a',
    '传统体育、游艺与杂技': '#7fa6c9'
  };

  const projects = [
    {
      id: 'kunqu', no: 'ICH-001', title: '昆曲', en: 'Kunqu Opera',
      category: '传统戏剧', region: '江苏 · 昆山 / 苏州', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2001, glyph: '戏', art: 'stage', image: 'assets/images/kunqu.jpg',
      motto: '无声不歌，无动不舞',
      signature: [
        { k: '声腔', v: '水磨调' },
        { k: '伴奏', v: '曲笛主奏' },
        { k: '特征', v: '一唱三叹' }
      ],
      c1: '#47211b', c2: '#1b3329', accent: '#d15a42',
      unit: '江苏省昆剧院',
      lede: '水磨调起，一唱三叹。中国最古老的剧种之一，把诗、乐、舞与身段熔成一杯需要慢慢啜饮的茶。',
      history: [
        '昆曲发源于元末明初的江苏昆山。明代嘉靖年间，魏良辅吸收北曲与江南民间曲调，改良出细腻婉转的“水磨调”；梁辰鱼以《浣纱记》将其搬上舞台，昆曲由此从清唱走向完整的戏剧形态。',
        '此后数百年，昆曲在文人雅集与宫廷演出之间流转，形成南曲与北曲并存的声腔体系。2001 年，昆曲被联合国教科文组织列入首批“人类口头和非物质遗产代表作”，成为世界认识中国表演艺术的一扇窗口。'
      ],
      craft: [
        '昆曲以曲笛为主奏，辅以笙、琵琶、三弦等，讲究“字清、腔纯、板正”。唱腔分为南曲与北曲，南曲婉转、北曲遒劲，一折戏里往往悲喜相间。',
        '表演高度程式化：水袖、台步、眼神、指法皆有法度，却又要求演员在法度中见性情。生、旦、净、末、丑各行当各有发声与身段规范，所谓“无声不歌，无动不舞”。'
      ],
      steps: ['拍曲：先正字音、再练腔格，一拍一板地磨。', '身段：水袖、圆场、指法，将唱词化为可看的动作。', '合乐：与笛师、鼓师磨合气口，完成一折完整的舞台呈现。'],
      facts: [{ b: '600+', s: '年历史' }, { b: '2001', s: '首批人类非遗' }, { b: '水磨腔', s: '核心声腔' }],
      lineage: [
        { name: '汪世瑜', role: '生行 · 国家级代表性传承人', note: '以巾生戏见长，《牡丹亭》柳梦梅一角影响深远。' },
        { name: '张继青', role: '旦行 · 国家级代表性传承人', note: '人称“张三梦”，以《惊梦》《寻梦》《痴梦》著称。' },
        { name: '蔡正仁', role: '小生 · 国家级代表性传承人', note: '师承俞振飞，兼擅官生与巾生，推动昆曲海外传播。' }
      ]
    },
    {
      id: 'kesi', no: 'ICH-002', title: '苏州缂丝织造技艺', en: 'Suzhou Kesi Silk Tapestry',
      category: '传统技艺', region: '江苏 · 苏州', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '织', art: 'weave', image: 'assets/images/kesi.jpg',
      motto: '一寸缂丝一寸金',
      signature: [
        { k: '织法', v: '通经断纬' },
        { k: '效果', v: '正反同观' },
        { k: '境界', v: '以梭代笔' }
      ],
      c1: '#3f3520', c2: '#1a332b', accent: '#c7a86a',
      unit: '苏州市非物质文化遗产保护管理办公室',
      lede: '以梭代笔，通经断纬。一寸缂丝一寸金，织机上的每一次停顿，都是画面呼吸的地方。',
      history: [
        '缂丝起源于汉魏，成熟于唐代，至宋代随书画装裱与宫廷赏玩而盛。宋代宣和年间，缂丝名家辈出，作品从实用织物转向对书画的再现，形成“以丝作画”的传统。',
        '明清时期，苏州成为缂丝生产的中心，宫廷袍服、唐卡、书画包首多在此织造。2009 年，中国蚕桑丝织技艺（含苏州缂丝）列入联合国教科文组织人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '缂丝采用“通经断纬”的织法：经线贯通全幅，纬线只在需要的色块内往返，色块之间留下细如发丝的缝隙，因而正反两面皆可观赏，图案边缘呈“雕镂之象”。',
        '一件作品往往需要数月乃至数年。织工须同时具备绘画修养与织造经验，配色、劈丝、落经、结梭，每一步都容不得急躁。'
      ],
      steps: ['落经：将生丝上机，确定幅面与经密度。', '缂织：按画稿分色，小梭在经线间来回穿织。', '结梭与修毛：收口、修整背面浮线，使画面平整挺括。'],
      facts: [{ b: '通经断纬', s: '核心织法' }, { b: '正反可观', s: '双面效果' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '王金山', role: '国家级代表性传承人', note: '恢复宋代缂丝技法，擅长书画与花卉题材。' },
        { name: '马惠娟', role: '国家级代表性传承人', note: '以精细的劈丝与配色见长，作品多次作为国礼。' },
        { name: '陈文', role: '省级代表性传承人', note: '致力于缂丝纹样研究与青年人才培养。' }
      ]
    },
    {
      id: 'celadon', no: 'ICH-003', title: '龙泉青瓷烧制技艺', en: 'Longquan Celadon Firing',
      category: '传统技艺', region: '浙江 · 龙泉', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '瓷', art: 'vase', image: 'assets/images/celadon.jpg',
      motto: '雨过天青云破处',
      signature: [
        { k: '釉色', v: '粉青 · 梅子青' },
        { k: '烧成', v: '还原焰 1300℃' },
        { k: '窑炉', v: '龙窑' }
      ],
      c1: '#1c3d33', c2: '#24372a', accent: '#8fc9b3',
      unit: '龙泉市非物质文化遗产保护中心',
      lede: '雨过天青，梅子初熟。一窑火色里，藏着中国人对“温润”二字最具体的想象。',
      history: [
        '龙泉窑始于三国两晋，南宋时达到鼎盛。匠人以本地紫金土与瓷石配制胎釉，烧出粉青、梅子青等釉色，器物质地温润，被誉为“青瓷之花”。',
        '宋代龙泉青瓷沿海上丝绸之路远销亚非欧，成为世界陶瓷史中的重要一页。2009 年，龙泉青瓷传统烧制技艺列入人类非物质文化遗产代表作名录，是当时唯一入选的陶瓷类项目。'
      ],
      craft: [
        '龙泉青瓷讲究“胎薄釉厚”。釉层在高温中流动、玻化，形成如玉的质感；梅子青需在还原焰中精准控制温度与气氛，得失往往只在数度之间。',
        '从淘洗、练泥、拉坯、修坯到素烧、施釉、装窑、烧成，一件器物要经过数十道工序。传统龙窑依山而建，窑内温差大，烧成经验高度依赖把桩师傅的判断。'
      ],
      steps: ['练泥：反复淘洗、陈腐，使胎土细腻均匀。', '施釉：以浸釉、荡釉结合，控制釉层厚薄。', '还原烧成：在龙窑中以还原焰烧至约 1300℃，等待釉色显现。'],
      facts: [{ b: '粉青 / 梅子青', s: '代表釉色' }, { b: '1300℃', s: '烧成温度' }, { b: '2009', s: '唯一陶瓷类人类非遗' }],
      lineage: [
        { name: '徐朝兴', role: '国家级代表性传承人', note: '中国工艺美术大师，恢复龙泉青瓷传统技艺的重要人物。' },
        { name: '毛正聪', role: '国家级代表性传承人', note: '以梅子青釉与器型设计见长。' },
        { name: '夏侯文', role: '国家级代表性传承人', note: '擅长青瓷装饰与刻花工艺。' }
      ]
    },
    {
      id: 'piying', no: 'ICH-004', title: '中国皮影戏', en: 'Chinese Shadow Puppetry',
      category: '传统戏剧', region: '陕西 · 河北 · 山东等地', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2011, glyph: '影', art: 'shadow', image: 'assets/images/piying.jpg',
      motto: '一口道尽千古事，双手对舞百万兵',
      signature: [
        { k: '媒介', v: '灯影投射' },
        { k: '操纵', v: '竹签三杆' },
        { k: '材料', v: '驴皮镂刻' }
      ],
      c1: '#46251b', c2: '#31261a', accent: '#d15a42',
      unit: '相关省份非物质文化遗产保护中心',
      lede: '一口道尽千古事，双手对舞百万兵。灯亮起时，幕布之后的手艺人便成了千军万马。',
      history: [
        '皮影戏以兽皮或纸板雕刻人物剪影，借灯光投射于幕布，配以唱腔、道白与乐器伴奏。关于其起源有西汉之说，宋代文献中已见成熟演出记载，元代随军队与商路传播更广。',
        '各地皮影在造型、唱腔与伴奏上形成不同流派：陕西华县皮影雕刻细腻，河北唐山皮影造型俊俏，山东泰山皮影以一人多角色的“十不闲”绝技闻名。2011 年，中国皮影戏列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '影人通常选用驴皮、牛皮，经泡制、刮薄、描样、镂刻、敷彩、熨平、装签等工序完成。雕刻讲究“刀口利落、线条不断”，染色多用矿物与植物颜料，通透而不艳俗。',
        '表演时，艺人以竹签操纵影人的头、手、足，配合唱腔与锣鼓。幕布、灯源、影人与乐队的距离都会影响成像，老艺人往往一人能兼演数个角色。'
      ],
      steps: ['选皮与泡制：去毛、刮薄，得到半透明的皮料。', '镂刻与敷彩：按角色谱式雕刻，再分层染色、熨平。', '装签与排练：为影人装上竹签关节，与唱腔、锣鼓合演。'],
      facts: [{ b: '灯影', s: '核心媒介' }, { b: '多流派', s: '地域风格' }, { b: '2011', s: '列入人类非遗' }],
      lineage: [
        { name: '范正安', role: '泰山皮影 · 国家级代表性传承人', note: '以“十不闲”一人完成操纵、演唱与伴奏的绝技闻名。' },
        { name: '汪天稳', role: '华县皮影 · 国家级代表性传承人', note: '皮影雕刻名家，刀法细密，人物造型古朴。' },
        { name: '齐永衡', role: '唐山皮影 · 代表性传承人', note: '推动唐山皮影的舞台化与海外交流。' }
      ]
    },
    {
      id: 'guqin', no: 'ICH-005', title: '古琴艺术', en: 'Guqin and its Music',
      category: '传统音乐', region: '全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2003, glyph: '琴', art: 'strings', image: 'assets/images/guqin.jpg',
      motto: '高山流水，知音难觅',
      signature: [
        { k: '形制', v: '七弦十三徽' },
        { k: '美学', v: '声少韵多' },
        { k: '记谱', v: '减字谱' }
      ],
      c1: '#24352d', c2: '#1b2e35', accent: '#8fc9b3',
      unit: '中国艺术研究院音乐研究所',
      lede: '七弦之上，有山水，有知己，也有一整个安静下来的中国。',
      history: [
        '古琴是中国最古老的弹拨乐器之一，形制在汉代基本定型，七弦十三徽，音域宽广。琴乐与文人生活紧密相连，孔子、嵇康、苏轼等人都与琴有深厚渊源。',
        '2003 年，古琴艺术被联合国教科文组织列入人类口头和非物质遗产代表作名录，成为中国第二个入选的项目。它不只是一种乐器，更是一套关于修身、审美与自然观的文化实践。'
      ],
      craft: [
        '古琴演奏讲究“声少韵多”，左手吟、猱、绰、注，右手擘、托、抹、挑，在极少的音里制造丰富的余韵。同一首《流水》，不同琴家可以弹出截然不同的气象。',
        '琴曲谱式独特，以文字谱、减字谱记录指法与弦位，不直接固定节奏，给演奏者留下呼吸与再创造的空间。琴器制作也极为讲究，选材、斫腹、合琴、髹漆，往往历时数年。'
      ],
      steps: ['辨谱：识读减字谱，理解弦位、指法与句读。', '正音：调弦、按音，体会散音、按音、泛音三种音色。', '成曲：以气口与韵腔组织全曲，使技术服从意境。'],
      facts: [{ b: '7弦13徽', s: '基本形制' }, { b: '3000+', s: '年历史' }, { b: '2003', s: '列入人类非遗' }],
      lineage: [
        { name: '龚一', role: '国家级代表性传承人', note: '琴学造诣深厚，主张“琴乐当随时代”，积极推动古琴普及。' },
        { name: '李祥霆', role: '国家级代表性传承人', note: '兼擅演奏、创作与琴学研究，即兴演奏独具特色。' },
        { name: '吴钊', role: '国家级代表性传承人', note: '古琴史与琴曲打谱研究的重要学者。' }
      ]
    },
    {
      id: 'yunjin', no: 'ICH-006', title: '南京云锦织造技艺', en: 'Nanjing Yunjin Brocade',
      category: '传统技艺', region: '江苏 · 南京', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '锦', art: 'cloud', image: 'assets/images/yunjin.jpg',
      motto: '寸锦寸金，云霞入衣',
      signature: [
        { k: '工艺', v: '妆花' },
        { k: '织机', v: '大花楼' },
        { k: '速度', v: '日织五六厘米' }
      ],
      c1: '#43351f', c2: '#39231f', accent: '#c7a86a',
      unit: '南京云锦研究所',
      lede: '寸锦寸金，织机声里藏着金陵的旧梦。云锦把天上的云霞，织进了人间的衣冠。',
      history: [
        '南京云锦始于东晋，明清时期达到鼎盛。明代在南京设“内织染局”，清代设“江宁织造”，云锦成为皇家服饰与赏赐的重要织物，也通过海上丝路远播海外。',
        '云锦以“妆花”工艺最具代表性，配色浓烈、金彩交辉，有“中华一绝”之誉。2009 年，南京云锦织造技艺列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '云锦使用大花楼木织机，机上由“拽花工”与“织手”两人配合：一人于花楼提拉经线控制纹样，一人在下投梭织纬。复杂织物一天只能织出五六厘米。',
        '“妆花”以挖花盘织、逐花异色著称，同一纬向可配多种颜色，金线、银线、孔雀羽线交织，使织物在不同光线下呈现变幻的光泽。'
      ],
      steps: ['挑花结本：把纹样转化为可上机的花本。', '上机：经线穿综、分区，双人配合调试。', '妆花织造：逐花换色、盘织金线，完成织物。'],
      facts: [{ b: '5—6cm', s: '日织长度' }, { b: '大花楼', s: '木织机' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '周双喜', role: '国家级代表性传承人', note: '主持复制多项明清云锦文物，恢复传统妆花工艺。' },
        { name: '金文', role: '国家级代表性传承人', note: '致力于云锦图案研究与现代设计转化。' },
        { name: '郭俊', role: '省级代表性传承人', note: '专注织造技艺与青年织工的培养。' }
      ]
    },
    {
      id: 'dong', no: 'ICH-007', title: '侗族大歌', en: 'Dong Grand Song',
      category: '传统音乐', region: '贵州 · 黎平 / 广西 · 三江', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '歌', art: 'waves', image: 'assets/images/dong.jpg',
      motto: '饭养身，歌养心',
      signature: [
        { k: '声部', v: '多声部' },
        { k: '指挥', v: '无指挥' },
        { k: '伴奏', v: '无伴奏' }
      ],
      c1: '#1d3830', c2: '#23352b', accent: '#8fc9b3',
      unit: '黎平县非物质文化遗产保护中心',
      lede: '没有指挥，没有伴奏，一群人却能唱出一条河。侗族大歌，是把山野和月光装进人声的艺术。',
      history: [
        '侗族大歌主要流传于贵州黎平、从江、榕江及广西三江等侗族聚居区，宋代文献中已有相关记载。它是侗族社会重要的公共生活形式，节庆、待客、鼓楼集会都离不开歌。',
        '大歌以多声部、无指挥、无伴奏为特征，模拟蝉鸣、流水、鸟叫等自然声响。2009 年，侗族大歌列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '侗族大歌通常由高音、低音等多个声部组成，歌者依循“众低独高”的原则，在高音声部进入时形成自然叠置。歌词讲究押韵与对仗，内容涵盖自然、爱情、叙事与伦理。',
        '歌唱依赖长期的耳濡目染。孩子们在鼓楼、火塘边跟随歌师一句句学唱，声部之间的默契不靠谱面，而靠共同生活形成的听觉记忆。'
      ],
      steps: ['学歌：从模仿歌师的咬字、气息与音准开始。', '分声部：确定高音、低音与领唱角色。', '合歌：在鼓楼与节庆场合中练习声部咬合与现场应变。'],
      facts: [{ b: '多声部', s: '无指挥' }, { b: '无伴奏', s: '纯人声' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '吴品仙', role: '国家级代表性传承人', note: '长期在黎平传歌，培养多批侗族大歌歌队。' },
        { name: '潘萨银花', role: '国家级代表性传承人', note: '擅长高音声部与侗族琵琶歌，活跃于从江地区。' },
        { name: '歌师群体', role: '社区传承', note: '鼓楼与火塘边的口传心授，是大歌真正的传承现场。' }
      ]
    },
    {
      id: 'solar', no: 'ICH-008', title: '二十四节气', en: 'The Twenty-Four Solar Terms',
      category: '民俗', region: '全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第四批', year: 2016, glyph: '节', art: 'orbit', image: 'assets/images/solar.jpg',
      motto: '顺天应时，与自然同频',
      signature: [
        { k: '框架', v: '二十四节气' },
        { k: '物候', v: '七十二候' },
        { k: '依据', v: '太阳黄经' }
      ],
      c1: '#2b3823', c2: '#28352c', accent: '#9aa89f',
      unit: '中国农业博物馆',
      lede: '把太阳走过的路，分成二十四段。节气不是古老的日历，而是中国人仍在使用的自然语法。',
      history: [
        '二十四节气起源于黄河流域的农耕观察，先秦时期已具雏形，西汉《淮南子·天文训》完整记载了二十四节气的名称与顺序。它以太阳周年运动为基准，将一年划分为二十四个时段。',
        '节气指导农事、渔汛、养生与日常生活，并衍生出丰富的仪式、谚语与食俗。2016 年，二十四节气列入联合国教科文组织人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '每个节气对应特定的太阳黄经位置，约十五天一个节气。古人又以“七十二候”描述物候变化：立春东风解冻，惊蛰桃始华，霜降草木黄落。',
        '节气不是孤立的知识点，而是一套观察方法：看天、看地、看水、看生物。它把时间、气候、农事与身体经验编织在一起，至今仍影响着中国人的生活节奏。'
      ],
      steps: ['观象：以圭表测日影，确定冬至、夏至等关键节点。', '分节：将太阳黄经每十五度划分为一个节气。', '应物：以物候、农谚与习俗将节气落到日常实践。'],
      facts: [{ b: '24', s: '节气' }, { b: '72', s: '物候' }, { b: '2016', s: '列入人类非遗' }],
      lineage: [
        { name: '《淮南子》', role: '文献源头 · 西汉', note: '完整记载二十四节气名称与天文依据。' },
        { name: '中国农业博物馆', role: '保护单位', note: '承担节气文化的研究、展陈与公众教育。' },
        { name: '地方社区', role: '活态实践', note: '农事、饮食、节庆与养生习俗让节气持续生长。' }
      ]
    },
    {
      id: 'taiji', no: 'ICH-009', title: '太极拳', en: 'Taijiquan',
      category: '传统体育、游艺与杂技', region: '河南 · 温县 / 河北 · 永年', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2020, glyph: '拳', art: 'taiji', image: 'assets/images/taiji.jpg',
      motto: '以柔克刚，以静制动',
      signature: [
        { k: '技法', v: '掤捋挤按' },
        { k: '要领', v: '松沉圆活' },
        { k: '训练', v: '站桩 · 推手' }
      ],
      c1: '#25362a', c2: '#2c2f22', accent: '#9aa89f',
      unit: '温县非物质文化遗产保护中心',
      lede: '以柔克刚，以静制动。太极拳不是慢，而是把力量藏进看不见的地方。',
      history: [
        '太极拳形成于明末清初，河南温县陈家沟的陈王廷被尊为重要奠基者。其后逐渐衍生出陈、杨、武、吴、孙等流派，在健身、技击与修身层面各有侧重。',
        '2020 年，太极拳列入联合国教科文组织人类非物质文化遗产代表作名录。它已传播至全球多个国家和地区，成为跨文化交流中的一张中国身体名片。'
      ],
      craft: [
        '太极拳以掤、捋、挤、按、采、挒、肘、靠等技法为核心，讲究松沉、圆活、连贯。动作看似缓慢，实则要求全身协调、重心转换清晰。',
        '练习通常从站桩、基本功与套路入手，再进入推手与技击。呼吸、意念与动作三者相合，是太极拳区别于一般体操的关键。'
      ],
      steps: ['站桩：建立松沉与中正的身体基础。', '盘架：逐式学习套路，体会重心与劲路。', '推手：在双人接触中练习听劲、化劲与发劲。'],
      facts: [{ b: '5大流派', s: '陈杨武吴孙' }, { b: '2020', s: '列入人类非遗' }, { b: '松沉圆活', s: '核心要领' }],
      lineage: [
        { name: '陈正雷', role: '陈氏太极拳 · 国家级代表性传承人', note: '系统传授陈氏太极拳套路、推手与器械。' },
        { name: '陈小旺', role: '陈氏太极拳 · 国家级代表性传承人', note: '长期在海外传播太极拳，强调缠丝劲与基本功。' },
        { name: '杨振铎', role: '杨氏太极拳 · 代表性传承人', note: '杨氏太极拳的重要传播者，推动套路规范化。' }
      ]
    },
    {
      id: 'papercut', no: 'ICH-010', title: '中国剪纸', en: 'Chinese Paper Cutting',
      category: '传统美术', region: '全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '剪', art: 'paper', image: 'assets/images/papercut.jpg',
      motto: '一剪之巧夺神功',
      signature: [
        { k: '技法', v: '阳刻 · 阴刻' },
        { k: '刀味', v: '圆如秋月，尖如麦芒' },
        { k: '载体', v: '窗花' }
      ],
      c1: '#402a24', c2: '#3a2a1e', accent: '#d18a6a',
      unit: '各地非物质文化遗产保护中心',
      lede: '一把剪刀，一张红纸。窗花贴上时，年就真的到了。',
      history: [
        '剪纸是以纸为材料的镂空艺术，纸发明之后逐渐普及。南北朝时期已有剪纸实物出土，唐宋以后广泛应用于节庆、婚丧、祭祀与服饰纹样。',
        '中国剪纸地域风格多样：北方粗犷浑厚，南方秀丽细腻；题材涵盖花鸟、人物、戏曲故事与吉祥图案。2009 年，中国剪纸列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '剪纸分“阳刻”与“阴刻”：阳刻保留线条，阴刻保留块面。艺人往往不打草稿，胸有成竹地下剪，线条讲究“圆如秋月、尖如麦芒、方如青砖”。',
        '不同地区使用剪刀、刻刀或二者结合。染色剪纸、拼贴剪纸、撕纸等技法，使这一看似简单的材料拥有丰富的表现力。'
      ],
      steps: ['起稿：确定题材与构图，安排虚实关系。', '剪刻：先内后外、先细后粗，保持线条连贯。', '装裱：托纸、压平，使作品挺括并便于保存。'],
      facts: [{ b: '阴阳刻', s: '两大技法' }, { b: '窗花', s: '典型载体' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '高凤莲', role: '国家级代表性传承人', note: '陕北剪纸代表人物，作品气势雄浑、想象奔放。' },
        { name: '库淑兰', role: '国家级代表性传承人', note: '创造色彩绚烂的拼贴剪纸，被称为“剪花娘子”。' },
        { name: '伏兆娥', role: '国家级代表性传承人', note: '宁夏剪纸名家，擅长人物与民俗题材。' }
      ]
    },
    {
      id: 'gesar', no: 'ICH-011', title: '格萨尔史诗', en: 'Epic of King Gesar',
      category: '民间文学', region: '西藏 · 青海 · 四川 · 甘肃 · 云南', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '诗', art: 'epic', image: 'assets/images/gesar.jpg',
      motto: '马背上的史诗',
      signature: [
        { k: '规模', v: '百万诗行' },
        { k: '演述', v: '仲堪说唱' },
        { k: '传承', v: '神授艺人' }
      ],
      c1: '#29313b', c2: '#2c2a24', accent: '#8b9fc7',
      unit: '西藏自治区非物质文化遗产保护中心',
      lede: '没有写定的书，却有唱不完的史诗。格萨尔活在艺人的梦里、琴声里和马背上。',
      history: [
        '《格萨尔》是藏族英雄史诗，讲述岭国国王格萨尔降妖伏魔、造福百姓的故事。史诗结构宏大，包含大量神话、历史、宗教与民俗内容，被誉为“东方的荷马史诗”。',
        '史诗主要以说唱形式流传，分布在西藏、青海、四川、甘肃、云南等藏族聚居区，以及蒙古族、土族等民族中。2009 年，格萨尔史诗列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '说唱艺人通常以“仲堪”形式表演，手持牛角琴或柏木杖，边说边唱。不同艺人会依据传统框架即兴铺陈，形成各自独特的版本。',
        '史诗的传承高度依赖记忆与口头创作。一些艺人称自己在梦境或病愈后获得“神授”般的说唱能力，这种独特的传承现象也成为研究重点。'
      ],
      steps: ['学艺：跟随老艺人学习曲调、程式与故事框架。', '开篇：以固定程式交代人物、地点与缘起。', '演述：根据现场与听众反应即兴扩展，完成一场数小时的说唱。'],
      facts: [{ b: '100万+', s: '诗行规模' }, { b: '口头说唱', s: '传承方式' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '桑珠', role: '国家级代表性传承人', note: '能演唱数十部《格萨尔》，留下大量录音资料。' },
        { name: '玉梅', role: '国家级代表性传承人', note: '女性说唱艺人，以完整的叙事与唱腔著称。' },
        { name: '斯塔多吉', role: '年轻一代说唱艺人', note: '受过现代教育，仍坚持用传统方式演述史诗。' }
      ]
    },
    {
      id: 'acupuncture', no: 'ICH-012', title: '中医针灸', en: 'Acupuncture and Moxibustion',
      category: '传统医药', region: '全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2010, glyph: '针', art: 'needle', image: 'assets/images/acupuncture.jpg',
      motto: '一针见天地',
      signature: [
        { k: '理论', v: '经络腧穴' },
        { k: '方法', v: '辨证取穴' },
        { k: '规范', v: '361 经穴' }
      ],
      c1: '#342a34', c2: '#2c3330', accent: '#a87f9a',
      unit: '中国针灸学会',
      lede: '一根银针，一场对话。针灸用极细的触点，调动身体自己的秩序。',
      history: [
        '针灸起源于新石器时代的砭石疗法，先秦至汉代逐步形成理论体系。《黄帝内经》系统论述了经络、腧穴与针刺方法，奠定了针灸学的基础。',
        '针灸在历代不断发展，形成经络学说、腧穴学与多种针法灸法。2010 年，中医针灸列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '针灸以经络腧穴理论为核心，通过针刺或艾灸刺激特定部位，调节气血与脏腑功能。临床讲究辨证取穴、手法与时机，而非固定处方。',
        '针具从砭石、青铜针发展到今天的不锈钢毫针；灸法则以艾绒燃烧的温热刺激为主。针灸的疗效既依赖技术，也依赖医患之间的信任与细致观察。'
      ],
      steps: ['辨证：通过望闻问切确定证候与治疗思路。', '取穴：依据经络与腧穴理论选择主穴、配穴。', '施术：控制进针角度、深度与手法，观察得气与反应。'],
      facts: [{ b: '361', s: '标准经穴' }, { b: '2010', s: '列入人类非遗' }, { b: '经络', s: '理论核心' }],
      lineage: [
        { name: '程莘农', role: '国家级代表性传承人', note: '针灸学家，主持编撰针灸学教材，推动国际传播。' },
        { name: '石学敏', role: '国家级代表性传承人', note: '创立“醒脑开窍”针刺法，应用于中风治疗。' },
        { name: '张缙', role: '国家级代表性传承人', note: '针灸手法与经络研究的资深学者。' }
      ]
    },
    {
      id: 'nongak', no: 'ICH-013', title: '朝鲜族农乐舞', en: 'Korean Ethnic Nongak Dance',
      category: '传统舞蹈', region: '吉林 · 延边', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '舞', art: 'dance', image: 'assets/images/nongak.jpg',
      motto: '鼓点落下，稻田苏醒',
      signature: [
        { k: '绝技', v: '象帽舞' },
        { k: '乐器', v: '长鼓' },
        { k: '结构', v: '击鼓 · 走阵' }
      ],
      c1: '#3a2630', c2: '#2b342c', accent: '#c98a9a',
      unit: '延边朝鲜族自治州非物质文化遗产保护中心',
      lede: '鼓点落下，稻田苏醒。农乐舞把春耕秋收的力气，跳成了旋转的裙摆与飞旋的象帽。',
      history: [
        '农乐舞是朝鲜族在农耕祭祀与节庆中形成的综合性民间艺术，包含音乐、舞蹈、杂技与戏剧元素。它随朝鲜族移民传入中国东北，在延边地区扎根发展。',
        '2009 年，中国朝鲜族农乐舞列入人类非物质文化遗产代表作名录。它既是仪式，也是社区凝聚力的表达。'
      ],
      craft: [
        '农乐舞以长鼓、小鼓、锣、钲等打击乐为核心，舞者随节奏变换队形。最具代表性的“象帽舞”要求舞者甩动帽顶长带，在空中划出连续圆环。',
        '表演通常由持旗者、乐手与舞者共同完成，节奏由慢转快，情绪层层推进。动作既有农耕劳动的模拟，也有即兴竞技的成分。'
      ],
      steps: ['击鼓：掌握长鼓、小鼓的基本节奏型。', '走阵：随锣鼓变换队形，形成集体画面。', '象帽：以颈部和头部力量控制长带，完成高难度旋转。'],
      facts: [{ b: '象帽舞', s: '标志性技艺' }, { b: '长鼓', s: '核心乐器' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '金明春', role: '象帽舞 · 代表性传承人', note: '长期在延边传授象帽舞技艺。' },
        { name: '延边州保护中心', role: '保护单位', note: '组织农乐舞的田野调查、培训与展演。' },
        { name: '社区舞队', role: '活态传承', note: '节庆与校园活动让农乐舞持续进入公共生活。' }
      ]
    },
    {
      id: 'pingtan', no: 'ICH-014', title: '苏州评弹', en: 'Suzhou Pingtan',
      category: '曲艺', region: '江苏 · 苏州', level: '国家级', levelShort: '国家级',
      batch: '第一批', year: 2006, glyph: '弹', art: 'pluck', image: 'assets/images/pingtan.jpg',
      motto: '吴侬软语，说尽姑苏',
      signature: [
        { k: '四功', v: '说噱弹唱' },
        { k: '语言', v: '吴语' },
        { k: '乐器', v: '三弦 · 琵琶' }
      ],
      c1: '#3b3323', c2: '#24342e', accent: '#b7a06a',
      unit: '苏州市评弹团',
      lede: '一桌二椅，三弦琵琶。吴侬软语里，藏着江南最会讲故事的下午。',
      history: [
        '苏州评弹是苏州评话与苏州弹词的合称。评话只说不唱，弹词又说又唱，二者在明清时期逐渐成熟，以苏州为中心流传于江南地区。',
        '评弹书目分长篇、中篇与短篇，传统长篇如《三国》《水浒》《玉蜻蜓》等影响深远。2006 年，苏州评弹列入第一批国家级非物质文化遗产名录。'
      ],
      craft: [
        '评弹以吴语表演，讲究“说、噱、弹、唱”。演员自弹自唱，三弦与琵琶相互托衬，单人、双人或多人均可档。',
        '评话重“说功”，以一把折扇、一块醒木营造千军万马；弹词重“唱腔”，蒋调、俞调、丽调等流派各有韵味。书场里的即时反应，是评弹最鲜活的部分。'
      ],
      steps: ['学说：练吴语咬字、气口与叙述节奏。', '习曲：掌握三弦或琵琶伴奏与流派唱腔。', '登台：在书场中根据听众反应调整篇幅与包袱。'],
      facts: [{ b: '说噱弹唱', s: '四功' }, { b: '吴语', s: '表演语言' }, { b: '2006', s: '国家级非遗' }],
      lineage: [
        { name: '邢晏芝', role: '国家级代表性传承人', note: '邢派弹词代表，以《杨乃武》等长篇著称。' },
        { name: '盛小云', role: '国家级代表性传承人', note: '当代苏州弹词领军人物，积极推动评弹创新传播。' },
        { name: '金丽生', role: '国家级代表性传承人', note: '评话名家，擅说《七侠五义》等长篇。' }
      ]
    },
    {
      id: 'jingju', no: 'ICH-015', title: '京剧', en: 'Peking Opera',
      category: '传统戏剧', region: '北京 · 全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2010, glyph: '剧', art: 'stage', image: 'assets/images/jingju.jpg',
      c1: '#401c1c', c2: '#241a2e', accent: '#e06a4a',
      unit: '国家京剧院',
      lede: '四功五法，唱念做打。一张脸谱，便是一册人物档案；一场开锣，便是一段山河旧事。',
      history: [
        '清乾隆五十五年（1790），四大徽班陆续进京，与汉调、昆曲、秦腔等声腔交融，在道光年间形成以皮黄为主的京剧，随后风靡宫廷与市井。',
        '京剧以虚拟性、程式化的表演体系著称，两百余年名家辈出。2010 年，京剧列入联合国教科文组织人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '京剧唱腔以西皮、二黄为主体，配以京胡等“场面”乐器；表演分生、旦、净、丑四大行当，唱念做打各有程式。',
        '脸谱以色彩符号化人物性格，红忠、白奸、黑猛、蓝勇；服装、砌末高度写意，一张桌子可以是城楼，也可以是酒桌。'
      ],
      steps: ['吊嗓：每日喊嗓、念白、吊腔，打磨字音与气口。', '毯子功与把子功：练翻跌、开打与身段基础。', '走台对戏：与琴师、鼓师磨合，完成一出完整剧目。'],
      facts: [{ b: '生旦净丑', s: '四大行当' }, { b: '1790', s: '徽班进京' }, { b: '2010', s: '列入人类非遗' }],
      lineage: [
        { name: '梅兰芳', role: '梅派创始人', note: '将京剧艺术推向世界，创立“梅派”旦行表演体系。' },
        { name: '马连良', role: '马派老生', note: '潇洒飘逸的马派唱念，影响深远。' },
        { name: '于魁智', role: '当代老生名家', note: '国家京剧院一级演员，长期推动京剧普及。' }
      ],
      motto: '四功五法，唱念做打',
      signature: [
        { k: '声腔', v: '西皮二黄' },
        { k: '行当', v: '生旦净丑' },
        { k: '美学', v: '虚拟性 · 程式化' }
      ]
    },
    {
      id: 'duanwu', no: 'ICH-016', title: '端午节', en: 'Dragon Boat Festival',
      category: '民俗', region: '湖北秭归 · 全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '舟', art: 'waves', image: 'assets/images/duanwu.jpg',
      c1: '#3a2c18', c2: '#24321f', accent: '#d18a5a',
      unit: '文化和旅游部非物质文化遗产司（协调）',
      lede: '龙舟鼓点一响，汨罗江的水就活了过来。粽子、艾蒲、香囊，把五月的中国过成同一场节气。',
      history: [
        '端午节起源多元：有纪念屈原之说，也有龙图腾祭祀与夏令卫生防疫的传统。唐宋以后，赛龙舟、吃粽子、挂艾蒲逐渐定型。',
        '端午节习俗流传于中国大部分地区，并传播至朝鲜半岛、日本、越南等地。2009 年，端午节列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '赛龙舟是端午最壮阔的部分：祭龙头、点睛、竞渡、抢鸭子，鼓点指挥着桡手的统一节奏。',
        '包粽子讲究粽叶清香与捆扎手法，各地有咸甜之分；挂艾蒲、佩香囊、喝雄黄酒，则是古人的“夏令卫生节”。'
      ],
      steps: ['制粽：浸米、洗叶、包捆，用柴火慢煮数小时。', '龙舟点睛：祭拜后为龙头点睛开光，鼓手领桡。', '端午家祭：悬艾蒲、佩香囊，阖家食粽。'],
      facts: [{ b: '屈原', s: '文化记忆' }, { b: '龙舟竞渡', s: '标志习俗' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '屈原', role: '文化象征', note: '《楚辞》作者，端午纪念的核心文化符号。' },
        { name: '秭归传承群体', role: '活态传承', note: '屈原故里的端午祭祀与龙舟习俗延续至今。' },
        { name: '各地龙舟队', role: '社区实践', note: '龙舟竞渡已发展为全国性的体育与民俗活动。' }
      ],
      motto: '龙舟鼓点，千年不绝',
      signature: [
        { k: '标志习俗', v: '龙舟竞渡' },
        { k: '节令食物', v: '粽子 · 咸蛋' },
        { k: '卫生民俗', v: '艾蒲 · 香囊' }
      ]
    },
    {
      id: 'shufa', no: 'ICH-017', title: '中国书法', en: 'Chinese Calligraphy',
      category: '传统美术', region: '全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第二批', year: 2009, glyph: '墨', art: 'epic', image: 'assets/images/shufa.jpg',
      c1: '#242a24', c2: '#2a2f28', accent: '#a3b3a8',
      unit: '中国书法家协会',
      lede: '一管柔毫，五体兼备，把汉字写成山河。字如其人，是中国人最含蓄的自我介绍。',
      history: [
        '汉字书写自甲骨文、金文一路演变，至东汉出现篆、隶、楷、行、草五种基本书体。王羲之、颜真卿等书家的作品，成为中国美学的坐标。',
        '2009 年，中国书法列入联合国教科文组织人类非物质文化遗产代表作名录。它不仅是技艺，更是一套关于心性、修养与审美的文化实践。'
      ],
      craft: [
        '书法以笔法、字法、章法为三要：中锋用笔讲“力透纸背”，结字讲“计白当黑”，通篇章法讲“行气贯通”。',
        '文房四宝——笔、墨、纸、砚，与书写互相成就。临帖是学书的必经之路，从形似到神似，再到脱帖自运。'
      ],
      steps: ['临帖：对帖精临，先求形似，再求笔意。', '背临：默写范字，检验笔法与结字记忆。', '创作：将所学化为自己的章法与气息。'],
      facts: [{ b: '篆隶楷行草', s: '五大书体' }, { b: '文房四宝', s: '笔墨纸砚' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '王羲之', role: '书圣', note: '《兰亭序》被誉为“天下第一行书”。' },
        { name: '颜真卿', role: '楷书宗师', note: '颜体雄强宽博，树立楷书典范。' },
        { name: '启功', role: '当代书家', note: '启功体清雅俊逸，推动书法普及与研究。' }
      ],
      motto: '字如其人，笔下有山河',
      signature: [
        { k: '五体', v: '篆隶楷行草' },
        { k: '笔法核心', v: '中锋 · 提按' },
        { k: '书写载体', v: '文房四宝' }
      ]
    },
    {
      id: 'diaoban', no: 'ICH-018', title: '雕版印刷技艺', en: 'Chinese Block Printing',
      category: '传统技艺', region: '江苏扬州 · 全国', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '版', art: 'paper', image: 'assets/images/diaoban.jpg',
      c1: '#33291a', c2: '#1d3027', accent: '#c7a86a',
      unit: '扬州广陵古籍刻印社',
      lede: '一版一页，刷印之间，文明被复制了一千年。刀尖走过的每一划，都是知识渡河的船。',
      history: [
        '雕版印刷在唐代成熟，现存最早有明确纪年的印本是咸通九年（868）《金刚经》。宋元明清，雕版印刷承载了绝大多数书籍生产。',
        '扬州雕版印刷与金陵刻经处、德格印经院等至今仍有活态传承。2009 年，中国雕版印刷技艺列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '雕版印刷包含写样、上版、镌刻、刷印、装帧等工序：书手写样，刻工以刀代笔，在梨木、枣木版上刻出阳文。',
        '刷印时以棕帚蘸墨施于版面，覆纸后以擦子轻扫，一页告成。字体刀法各有流派，宋体、仿宋体都由此而来。'
      ],
      steps: ['写样：以蝇头小楷按版式书写底样。', '镌版：上版后逐字刻出阳文，刀法见功力。', '刷印装帧：上墨、覆纸、刷印，再线装成书。'],
      facts: [{ b: '868年', s: '金刚经纪年印本' }, { b: '梨木枣木', s: '常用版材' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '扬州广陵古籍刻印社', role: '保护单位', note: '延续写样、刻版、刷印、装帧的完整工序。' },
        { name: '马萌青', role: '金陵刻经处传承人', note: '金陵刻经处雕版印刷技艺的代表性传承人。' },
        { name: '德格印经院', role: '藏文雕版', note: '保存数十万块藏文经版，仍在使用传统刷印。' }
      ],
      motto: '一页千年',
      signature: [
        { k: '核心工序', v: '写样 · 镌版' },
        { k: '版材', v: '梨木 · 枣木' },
        { k: '印刷方式', v: '一版一页 · 手工刷印' }
      ]
    },
    {
      id: 'changdiao', no: 'ICH-019', title: '蒙古族长调民歌', en: 'Mongolian Urtiin Duu',
      category: '传统音乐', region: '内蒙古 · 新疆等地', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2008, glyph: '歌', art: 'waves', image: 'assets/images/changdiao.jpg',
      c1: '#20352b', c2: '#2b3322', accent: '#8fc9b3',
      unit: '内蒙古自治区非物质文化遗产保护中心',
      lede: '长到听见风从草尖上走过去。马背上的歌，不赶时间，只跟着天地的呼吸。',
      history: [
        '长调是蒙古族游牧生活的产物，节奏自由、气息悠长，常以马头琴相伴，在节庆、婚礼与那达慕上传唱。',
        '2005 年蒙古族长调民歌被宣布为人类口头和非物质遗产代表作，2008 年正式列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '“诺古拉”是长调最独特的装饰性颤音，像马群在远处起伏；歌者在长音中从容换气，把空间一寸寸撑开。',
        '长调没有固定节拍，旋律随歌词与情绪自由伸展。学唱长调，先要熟悉草原的声音：风声、马蹄、河流与羊群。'
      ],
      steps: ['听唱：跟随长辈与录音，熟悉旋律的起落与拖腔。', '学诺古拉：练习颤音、装饰音与自由换气。', '登台：在那达慕、婚礼等场合实践长调。'],
      facts: [{ b: '诺古拉', s: '装饰颤音' }, { b: '自由节拍', s: '核心特征' }, { b: '2008', s: '列入人类非遗' }],
      lineage: [
        { name: '哈扎布', role: '代表性歌者', note: '被尊为“长调歌王”，留下大量珍贵录音。' },
        { name: '宝音德力格尔', role: '代表性歌者', note: '以高远清亮的音色闻名。' },
        { name: '莫德格', role: '代表性歌者', note: '新疆卫拉特蒙古族长调的重要传承人。' }
      ],
      motto: '长到听见风从草尖上走过去',
      signature: [
        { k: '唱法核心', v: '诺古拉' },
        { k: '节拍', v: '自由节奏' },
        { k: '伴奏', v: '马头琴' }
      ]
    },
    {
      id: 'mazu', no: 'ICH-020', title: '妈祖信俗', en: 'Mazu Belief and Customs',
      category: '民俗', region: '福建莆田湄洲 · 沿海各地', level: '人类非遗代表作', levelShort: '人类非遗',
      batch: '第一批', year: 2009, glyph: '海', art: 'cloud', image: 'assets/images/mazu.jpg',
      c1: '#1d2b3a', c2: '#23332a', accent: '#7fa6c9',
      unit: '湄洲妈祖祖庙董事会',
      lede: '有海的地方，就有妈祖。一盏海上明灯，护佑千帆，也系住了全世界华人的乡愁。',
      history: [
        '妈祖原名林默，北宋福建莆田湄洲人，因救助海难被乡人奉祀，历代朝廷先后数十次加封，从“夫人”到“天妃”“天后”。',
        '妈祖信俗随航海与移民传播到世界各地，有海水处即有妈祖庙。2009 年，妈祖信俗列入人类非物质文化遗产代表作名录。'
      ],
      craft: [
        '妈祖祭典有完整仪轨：晨拜、进香、诵经、三献礼、祭乐与祭舞，庄严肃穆又充满海洋气息。',
        '妈祖诞辰与升天纪念日举行绕境巡安，信众抬驾、踩街、阵头相随；渔船出航前亦多到庙中祈求平安。'
      ],
      steps: ['湄洲祖庙祭祀：以传统三献礼祭拜妈祖。', '绕境巡安：妈祖金身出巡，护佑一方。', '诞辰庆典：庙会、祭乐与海祭并举。'],
      facts: [{ b: '天后', s: '历代封号' }, { b: '航海', s: '核心场域' }, { b: '2009', s: '列入人类非遗' }],
      lineage: [
        { name: '湄洲妈祖祖庙', role: '祖庭', note: '妈祖信俗的发源与核心庙宇。' },
        { name: '中华妈祖文化交流协会', role: '保护单位', note: '统筹妈祖文化的保护与交流。' },
        { name: '各地妈祖庙理事会', role: '社区传承', note: '沿海与海外宫庙维系着祭典与巡安传统。' }
      ],
      motto: '有海的地方，就有妈祖',
      signature: [
        { k: '核心仪轨', v: '三献礼祭典' },
        { k: '社区活动', v: '绕境巡安' },
        { k: '精神象征', v: '海上护佑' }
      ]
    }
  ];

  const projectIndex = new Map(projects.map(project => [project.id, project]));

  /* =======================================================
     2. Small utilities
     ======================================================= */

  const toastEl = $('#toast');
  let toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2800);
  }

  function formatNumber(value) {
    return Number(value).toLocaleString('en-US');
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  /* =======================================================
     3. Generated line-art for cards & modal
     ======================================================= */

  function artSvg(type, color) {
    const c = color || '#c7a86a';
    const common = `fill="none" stroke="${c}" stroke-width="1" vector-effect="non-scaling-stroke"`;
    let body = '';

    switch (type) {
      case 'stage': {
        body = `
          <path d="M200 0 90 220h220Z" ${common} opacity=".16"/>
          <rect x="106" y="42" width="188" height="154" ${common} opacity=".3"/>
          <path d="M126 62h148v114H126z" ${common} opacity=".18"/>
          <path d="M200 54v132M158 54v132M242 54v132" ${common} opacity=".18"/>
          <circle cx="200" cy="108" r="28" ${common} opacity=".48"/>
          <path d="M146 196c18-34 36-52 54-52s36 18 54 52" ${common} opacity=".38"/>`;
        break;
      }
      case 'weave': {
        body = `<g ${common} opacity=".28">`;
        for (let i = 0; i < 15; i++) body += `<path d="M${20 + i * 26} 0v220"/>`;
        for (let j = 0; j < 9; j++) body += `<path d="M0 ${12 + j * 25}h400" opacity="${j % 3 === 0 ? .65 : .28}"/>`;
        body += `</g><path d="M80 34h240v152H80z" ${common} opacity=".55"/><path d="M106 60h188v100H106z" ${common} opacity=".25"/>`;
        break;
      }
      case 'vase': {
        body = `
          <path d="M200 24c-18 0-28 12-28 34 0 16 4 28 10 38-18 18-32 48-32 84 0 26 10 40 36 40h28c26 0 36-14 36-40 0-36-14-66-32-84 6-10 10-22 10-38 0-22-10-34-28-34Z" ${common} opacity=".42"/>
          <ellipse cx="200" cy="24" rx="28" ry="8" ${common} opacity=".5"/>
          <ellipse cx="200" cy="220" rx="34" ry="10" ${common} opacity=".32"/>
          <path d="M130 140c46 22 94 22 140 0M132 172c44 18 92 18 136 0" ${common} opacity=".24"/>`;
        break;
      }
      case 'shadow': {
        body = `
          <circle cx="142" cy="52" r="56" ${common} opacity=".22"/>
          <path d="M142 78v122M142 104l-42 58M142 104l44 54M142 132l-28 68M142 132l30 68" ${common} opacity=".36" stroke-width="2"/>
          <circle cx="282" cy="44" r="34" ${common} opacity=".3"/>
          <path d="M282 64v136M282 88l-34 46M282 88l36 48M282 112l-24 88M282 112l26 88" ${common} opacity=".3" stroke-width="2"/>
          <path d="M0 198h400" ${common} opacity=".2"/>`;
        break;
      }
      case 'strings': {
        body = `<g ${common} opacity=".3">`;
        for (let i = 0; i < 9; i++) body += `<path d="M28 ${30 + i * 19}h344"/>`;
        body += `</g><g fill="${c}" opacity=".55"><circle cx="86" cy="49" r="2.4"/><circle cx="312" cy="87" r="2.4"/><circle cx="152" cy="125" r="2.4"/><circle cx="262" cy="163" r="2.4"/></g><path d="M72 20v180M328 20v180" ${common} opacity=".18"/>`;
        break;
      }
      case 'cloud': {
        body = `<g ${common} opacity=".32">`;
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 5; col++) {
            const x = 32 + col * 84 + (row % 2) * 40;
            const y = 48 + row * 62;
            body += `<path d="M${x} ${y}c0-14 12-24 25-22 4-12 16-19 28-15 8-8 22-8 30 0 14-2 25 8 25 21 0 14-12 24-26 23H${x + 2}c-14 0-24-8-24-20"/>`;
          }
        }
        body += `</g>`;
        break;
      }
      case 'waves': {
        body = `<g ${common} opacity=".36">`;
        for (let i = 0; i < 7; i++) {
          const y = 34 + i * 27;
          body += `<path d="M-20 ${y}c40-24 80 24 120 0s80 24 120 0 80 24 120 0 80 24 120 0" opacity="${i % 2 ? .55 : .9}"/>`;
        }
        body += `</g><circle cx="292" cy="88" r="38" ${common} opacity=".24"/>`;
        break;
      }
      case 'orbit': {
        body = `
          <circle cx="200" cy="110" r="58" ${common} opacity=".45"/>
          <ellipse cx="200" cy="110" rx="148" ry="76" ${common} opacity=".22" transform="rotate(-18 200 110)"/>
          <ellipse cx="200" cy="110" rx="118" ry="56" ${common} opacity=".18" transform="rotate(22 200 110)"/>
          <circle cx="300" cy="70" r="7" ${common} opacity=".6"/>
          <circle cx="94" cy="166" r="4" ${common} opacity=".5"/>
          <path d="M200 52v116M142 110h116" ${common} opacity=".18"/>`;
        break;
      }
      case 'taiji': {
        body = `
          <circle cx="200" cy="110" r="78" ${common} opacity=".4"/>
          <path d="M200 32a78 78 0 0 1 0 156 39 39 0 0 1 0-78 39 39 0 0 0 0-78Z" ${common} opacity=".3"/>
          <circle cx="200" cy="71" r="7" ${common} opacity=".55"/>
          <circle cx="200" cy="149" r="7" ${common} opacity=".55"/>
          <circle cx="200" cy="110" r="128" ${common} opacity=".12"/>`;
        break;
      }
      case 'paper': {
        body = `<g ${common} opacity=".34">`;
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 4; j++) {
            const x = 46 + i * 58;
            const y = 26 + j * 48;
            body += `<path d="m${x} ${y + 16} 18-16 18 16-18 16Z" opacity="${(i + j) % 2 ? .55 : .9}"/>`;
          }
        }
        body += `</g><path d="M0 206h400" ${common} opacity=".18"/>`;
        break;
      }
      case 'epic': {
        body = `<g ${common} opacity=".24">`;
        for (let i = 0; i < 8; i++) body += `<path d="M${54 + i * 40} 22v178" opacity="${i % 3 === 0 ? .8 : .45}"/>`;
        body += `</g><circle cx="200" cy="110" r="62" ${common} opacity=".4"/><circle cx="200" cy="110" r="88" ${common} opacity=".14"/><path d="M172 98h56v24h-56z" ${common} opacity=".34"/>`;
        break;
      }
      case 'needle': {
        body = `<g ${common} opacity=".26">`;
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 / 12) * i;
          body += `<path d="M200 110 ${200 + Math.cos(angle) * 170} ${110 + Math.sin(angle) * 94}"/>`;
        }
        body += `</g><path d="M260 36 150 196" ${common} opacity=".8" stroke-width="1.6"/><circle cx="260" cy="36" r="4" ${common} opacity=".7"/><circle cx="200" cy="110" r="46" ${common} opacity=".4"/>`;
        break;
      }
      case 'dance': {
        body = `<g ${common} opacity=".34">`;
        for (let i = 0; i < 8; i++) body += `<path d="M200 208C${80 + i * 24} 150 ${70 + i * 22} 64 200 20"/>`;
        body += `</g><circle cx="200" cy="84" r="20" ${common} opacity=".6"/><path d="M200 104c-28 30-40 62-40 96M200 104c28 30 40 62 40 96M158 136l-42 34M242 136l42 34" ${common} opacity=".44"/>`;
        break;
      }
      case 'pluck': {
        body = `<g ${common} opacity=".3">`;
        for (let i = 0; i < 7; i++) body += `<path d="M${72 + i * 43} 20v180" opacity="${i % 2 ? .7 : .4}"/>`;
        body += `</g><path d="M58 48h286v124H58z" ${common} opacity=".26"/><path d="m286 74 26 16-26 16Z" ${common} opacity=".5"/>`;
        break;
      }
      default: {
        body = `<circle cx="200" cy="110" r="70" ${common} opacity=".35"/><path d="M200 20v180M110 110h180" ${common} opacity=".2"/>`;
      }
    }

    return `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;
  }

  /* =======================================================
     4. Archive rendering & filtering
     ======================================================= */

  const projectGrid = $('#projectGrid');
  const archiveSearch = $('#archiveSearch');
  const clearSearch = $('#clearSearch');
  const filterPills = $('#filterPills');
  const archiveCount = $('#archiveCount');
  const expandArchive = $('#expandArchive');
  const archiveEmpty = $('#archiveEmpty');
  const resetArchive = $('#resetArchive');
  const savedFilter = $('#savedFilter');
  const savedCount = $('#savedCount');
  const randomArchive = $('#randomArchive');

  let activeCategory = '全部';
  let archiveQuery = '';
  let archiveExpanded = false;
  let savedOnly = false;
  let currentProject = null;
  const archiveLimit = 9;
  const BOOKMARK_KEY = 'yizhen-bookmarks';

  let bookmarks = new Set();
  try {
    const stored = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]');
    bookmarks = new Set(Array.isArray(stored) ? stored.filter(id => projectIndex.has(id)) : []);
  } catch {
    bookmarks = new Set();
  }

  function persistBookmarks() {
    try {
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks]));
    } catch {
      // local storage is an enhancement, not a requirement
    }
  }

  const bookmarkIcon = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 4.5h11v15l-5.5-3.6-5.5 3.6Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

  function updateBookmarkUI() {
    $$('[data-bookmark]').forEach(button => {
      const active = bookmarks.has(button.dataset.bookmark);
      button.setAttribute('aria-pressed', String(active));
      const card = button.closest('.project-card');
      card?.classList.toggle('is-bookmarked', active);
      button.setAttribute('aria-label', active
        ? `取消收藏：${projectIndex.get(button.dataset.bookmark)?.title || ''}`
        : `收藏档案：${projectIndex.get(button.dataset.bookmark)?.title || ''}`);
    });
    if (savedCount) savedCount.textContent = String(bookmarks.size);
    if (savedFilter) {
      savedFilter.classList.toggle('is-active', savedOnly);
      savedFilter.setAttribute('aria-pressed', String(savedOnly));
      savedFilter.setAttribute('aria-label', savedOnly ? '退出我的收藏' : `查看我的收藏，共 ${bookmarks.size} 份`);
    }
    const projectSave = $('#projectSave');
    if (projectSave && currentProject) {
      const active = bookmarks.has(currentProject.id);
      projectSave.setAttribute('aria-pressed', String(active));
      const label = projectSave.querySelector('span');
      if (label) label.textContent = active ? '已收藏' : '收藏';
    }
  }

  function toggleBookmark(id) {
    const project = projectIndex.get(id);
    if (!project) return;
    if (bookmarks.has(id)) {
      bookmarks.delete(id);
      toast(`已取消收藏：${project.title}`);
    } else {
      bookmarks.add(id);
      toast(`已收藏：${project.title}`);
    }
    persistBookmarks();
    updateBookmarkUI();
    if (savedOnly) applyArchiveFilter();
  }

  function projectCard(project, index) {
    const saved = bookmarks.has(project.id);
    return `
      <article class="project-card${saved ? ' is-bookmarked' : ''}" data-project-id="${project.id}" style="--i:${index}">
        <div class="card-art" style="--card-a:${project.c1};--card-b:${project.c2}">
          ${project.image ? `<img class="card-photo" src="${project.image}" alt="" loading="lazy" decoding="async" />` : artSvg(project.art, project.accent)}
          <span class="card-glyph" aria-hidden="true">${project.glyph}</span>
          <div class="card-top">
            <span class="card-no">${project.no}</span>
            <span class="card-level">${project.levelShort}</span>
          </div>
          <span class="card-vertical">${escapeHTML(project.category)}</span>
        </div>
        <button class="card-bookmark" type="button" data-bookmark="${project.id}" aria-pressed="${saved}" aria-label="${saved ? '取消收藏' : '收藏档案'}：${escapeHTML(project.title)}">
          ${bookmarkIcon}
        </button>
        <div class="card-body">
          <p class="card-kicker">${escapeHTML(project.en)}</p>
          <h3 class="card-title">${escapeHTML(project.title)}</h3>
          <p class="card-region">${escapeHTML(project.region)} · ${project.year}</p>
          <p class="card-desc">${escapeHTML(project.lede)}</p>
          <div class="card-foot">
            <span>${project.batch} · ${project.levelShort}</span>
            <span class="card-open">查阅档案 <i aria-hidden="true">→</i></span>
          </div>
        </div>
        <button class="card-hit" type="button" data-open-project="${project.id}" aria-label="查阅档案：${escapeHTML(project.title)}"></button>
      </article>`;
  }

  function renderProjects() {
    if (!projectGrid) return;
    projectGrid.innerHTML = projects.map(projectCard).join('') + `
      <a class="archive-cta" id="archiveCta" href="#community" hidden>
        <div>
          <p class="kicker">OPEN CALL / 档案征集</p>
          <h3>你的线索，<br>也许就是下一份档案。</h3>
          <p>民间技艺、濒危项目、老艺人的口述，都值得被认真记录。留下你知道的那一段。</p>
        </div>
        <span class="cta-arrow">提交一条线索 <i aria-hidden="true">↗</i></span>
      </a>`;
  }

  function matchingProjects() {
    const query = archiveQuery.trim().toLowerCase();
    return projects.filter(project => {
      if (savedOnly && !bookmarks.has(project.id)) return false;
      const categoryMatch = activeCategory === '全部' || project.category === activeCategory;
      if (!categoryMatch) return false;
      if (!query) return true;
      const haystack = `${project.title} ${project.en} ${project.region} ${project.category} ${project.lede} ${project.keywords || ''}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  function applyArchiveFilter() {
    if (!projectGrid) return;
    const list = matchingProjects();
    const ids = new Set(list.map(project => project.id));
    const visibleIds = new Set((archiveExpanded ? list : list.slice(0, archiveLimit)).map(project => project.id));
    const cards = $$('.project-card', projectGrid);

    cards.forEach(card => {
      const id = card.dataset.projectId;
      const visible = ids.has(id) && visibleIds.has(id);
      card.hidden = !visible;
    });

    if (archiveCount) archiveCount.textContent = String(list.length);
    const cta = $('#archiveCta');
    if (cta) {
      cta.hidden = !(archiveExpanded && list.length === projects.length && activeCategory === '全部' && !archiveQuery && !savedOnly);
    }
    const countLabel = document.querySelector('.archive-count span');
    if (countLabel) countLabel.textContent = savedOnly ? '份收藏档案' : '份示范档案';
    if (projectGrid) projectGrid.hidden = list.length === 0;
    if (archiveEmpty) {
      archiveEmpty.hidden = list.length > 0;
      const title = archiveEmpty.querySelector('h3');
      const copy = archiveEmpty.querySelector('p:not(.kicker)');
      if (title) title.textContent = savedOnly ? '收藏夹还是空的。' : '档案里暂时没有这一页。';
      if (copy) copy.textContent = savedOnly
        ? '在任意档案右上角点击书签，就能把它留在这里，稍后继续阅读。'
        : '换一个更宽泛的关键词，或回到全部门类看看。你也可以在「共创」中提交一条线索。';
    }
    if (expandArchive) {
      const hasMore = list.length > archiveLimit;
      expandArchive.hidden = !hasMore;
      expandArchive.classList.toggle('is-open', archiveExpanded);
      expandArchive.setAttribute('aria-expanded', String(archiveExpanded));
      expandArchive.innerHTML = archiveExpanded
        ? '收起档案 <span>↑</span>'
        : `展开全部 ${list.length} 份档案 <span>↓</span>`;
    }
  }

  renderProjects();

  if (archiveSearch) {
    archiveSearch.addEventListener('input', () => {
      archiveQuery = archiveSearch.value;
      archiveExpanded = false;
      if (clearSearch) clearSearch.hidden = !archiveQuery;
      applyArchiveFilter();
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      archiveSearch.value = '';
      archiveQuery = '';
      clearSearch.hidden = true;
      archiveExpanded = false;
      applyArchiveFilter();
      archiveSearch.focus();
    });
  }

  if (filterPills) {
    filterPills.addEventListener('click', event => {
      const button = event.target.closest('.filter-pill');
      if (!button) return;
      activeCategory = button.dataset.category;
      archiveExpanded = false;
      $$('.filter-pill', filterPills).forEach(pill => {
        const active = pill === button;
        pill.classList.toggle('is-active', active);
        pill.setAttribute('aria-pressed', String(active));
      });
      applyArchiveFilter();
    });
  }

  if (savedFilter) {
    savedFilter.addEventListener('click', () => {
      if (!savedOnly && bookmarks.size === 0) {
        toast('收藏夹还是空的 · 点击档案右上角的书签即可收藏');
        return;
      }
      savedOnly = !savedOnly;
      archiveExpanded = false;
      updateBookmarkUI();
      applyArchiveFilter();
      if (savedOnly) toast(`正在查看我的收藏 · ${bookmarks.size} 份`);
    });
  }

  if (expandArchive) {
    expandArchive.addEventListener('click', () => {
      archiveExpanded = !archiveExpanded;
      applyArchiveFilter();
    });
  }

  randomArchive?.addEventListener('click', () => {
    const pool = matchingProjects();
    if (!pool.length) {
      toast('当前筛选下没有可翻阅的档案');
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    openProject(pick.id);
  });

  resetArchive?.addEventListener('click', () => {
    activeCategory = '全部';
    archiveQuery = '';
    archiveExpanded = false;
    savedOnly = false;
    if (archiveSearch) archiveSearch.value = '';
    if (clearSearch) clearSearch.hidden = true;
    if (filterPills) {
      $$('.filter-pill', filterPills).forEach(pill => {
        const active = pill.dataset.category === '全部';
        pill.classList.toggle('is-active', active);
        pill.setAttribute('aria-pressed', String(active));
      });
    }
    updateBookmarkUI();
    applyArchiveFilter();
    archiveSearch?.focus();
  });

  if (projectGrid) {
    projectGrid.addEventListener('click', event => {
      const bookmark = event.target.closest('[data-bookmark]');
      if (bookmark) {
        event.preventDefault();
        event.stopPropagation();
        toggleBookmark(bookmark.dataset.bookmark);
        return;
      }
      const hit = event.target.closest('[data-open-project]');
      if (hit) openProject(hit.dataset.openProject);
    });
  }

  applyArchiveFilter();
  updateBookmarkUI();
  $$('.filter-pill', filterPills).forEach(pill => {
    pill.setAttribute('aria-pressed', String(pill.classList.contains('is-active')));
  });

  /* =======================================================
     5. Project modal
     ======================================================= */

  const projectOverlay = $('#projectOverlay');
  const projectSheet = $('.project-sheet', projectOverlay);
  let lastFocused = null;

  function metaItem(label, value) {
    return `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`;
  }

  function assetsFor(project, index) {
    const base = projects.indexOf(project);
    return [
      { n: 2 + (base % 4), label: '三维模型', meta: 'GLB / 8K TEXTURE' },
      { n: 10 + base * 2, label: '8K 影像', meta: 'PRORES / 12BIT' },
      { n: 6 + base * 3, label: '无损音频', meta: 'WAV / 96KHZ' },
      { n: 64 + base * 19, label: '图谱节点', meta: 'NEO4J / JSON' }
    ];
  }

  function renderProjectPanels(project) {
    const history = $('[data-panel="history"]', projectOverlay);
    const craft = $('[data-panel="craft"]', projectOverlay);
    const lineage = $('[data-panel="lineage"]', projectOverlay);
    const assets = $('[data-panel="assets"]', projectOverlay);
    const assetData = assetsFor(project);

    history.innerHTML = `
      <div class="panel-copy">${project.history.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join('')}</div>
      <div class="panel-facts">${project.facts.map(fact => `<div><b>${escapeHTML(fact.b)}</b><span>${escapeHTML(fact.s)}</span></div>`).join('')}</div>`;

    craft.innerHTML = `
      <div class="panel-copy">${project.craft.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join('')}</div>
      <ol class="steps">${project.steps.map((step, index) => `<li><b>${String(index + 1).padStart(2, '0')}</b><span>${escapeHTML(step)}</span></li>`).join('')}</ol>`;

    lineage.innerHTML = `
      <div class="lineage-track">${project.lineage.map(person => `
        <div class="person">
          <b>${escapeHTML(person.name)}</b>
          <span>${escapeHTML(person.role)}</span>
          <em>${escapeHTML(person.note)}</em>
        </div>`).join('')}
      </div>
      <p class="lineage-note">谱系信息以公开名录与研究资料为参考，正式上线前将由项目保护单位核校。</p>`;

    assets.innerHTML = `
      <div class="asset-grid">${assetData.map(asset => `
        <div class="asset-tile">
          <b>${asset.n}</b><span>${asset.label}</span><small>${asset.meta}</small>
        </div>`).join('')}
      </div>
      <p class="asset-note">数字资产包包含高保真影像、三维模型、无损音频、口述史文本与知识图谱数据。元数据遵循 Dublin Core 15 项元素，并扩展批次、传承人编码、地理坐标与资产哈希字段。此处计数为概念演示。</p>`;
  }

  function selectProjectTab(tabName) {
    $$('.project-tabs button', projectOverlay).forEach(button => {
      button.setAttribute('aria-selected', String(button.dataset.ptab === tabName));
    });
    $$('.project-panel', projectOverlay).forEach(panel => {
      panel.hidden = panel.dataset.panel !== tabName;
    });
  }

  function openProject(id, options = {}) {
    const project = projectIndex.get(id);
    if (!project || !projectOverlay) return;
    const wasOpen = !projectOverlay.hidden;
    const push = options.push !== false;
    currentProject = project;
    if (!wasOpen) lastFocused = document.activeElement;

    const hero = $('#projectHero');
    hero.style.background = `radial-gradient(120% 130% at 18% 12%, ${project.c1}, transparent 66%), linear-gradient(145deg, ${project.c2}, #08130f 76%)`;
    hero.innerHTML = `
      ${project.image ? `<img class="hero-photo" src="${project.image}" alt="" decoding="async" />` : artSvg(project.art, project.accent)}
      <span class="hero-glyph" style="color:${project.accent}" aria-hidden="true">${project.glyph}</span>
      <span class="hero-coord">${project.no} / ${escapeHTML(project.region)} / ${project.year}</span>
      <span class="hero-credit">ARCHIVE IMAGE · 出处见图像说明</span>`;

    $('#projectTags').innerHTML = `
      <span>${escapeHTML(project.category)}</span>
      <span>${escapeHTML(project.level)}</span>
      <span>${escapeHTML(project.batch)}</span>
      <span>${project.year}</span>`;

    $('#modalTitle').textContent = project.title;
    $('#projectEn').textContent = project.en;
    $('#projectLede').textContent = project.lede;

    $('#projectMeta').innerHTML = [
      metaItem('项目编号', project.no),
      metaItem('所属门类', project.category),
      metaItem('申报地区', project.region),
      metaItem('保护级别', project.level),
      metaItem('公布批次', project.batch),
      metaItem('列入年份', String(project.year)),
      metaItem('保护单位', project.unit),
      metaItem('档案状态', '已建档 · 持续更新')
    ].join('');

    projectSheet.style.setProperty('--proj-accent', project.accent || 'var(--jade)');
    $('#projectSignature').innerHTML = `
      <p class="sig-motto">“${escapeHTML(project.motto || '')}”</p>
      <div class="sig-grid">${(project.signature || []).map(item => `
        <div><b>${escapeHTML(item.k)}</b><span>${escapeHTML(item.v)}</span></div>`).join('')}
      </div>`;

    const projectPosition = projects.indexOf(project);
    const prevButton = $('#projectPrev');
    const nextButton = $('#projectNext');
    if (prevButton) prevButton.disabled = projectPosition <= 0;
    if (nextButton) nextButton.disabled = projectPosition >= projects.length - 1;
    const pagerCount = $('#projectPagerCount');
    if (pagerCount) pagerCount.textContent = `${String(projectPosition + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;

    renderProjectPanels(project);
    selectProjectTab('history');
    updateBookmarkUI();

    projectOverlay.hidden = false;
    document.body.classList.add('is-locked');
    if (push && location.hash !== `#archive/${project.id}`) {
      try {
        if (options.replace) history.replaceState({ project: project.id }, '', `#archive/${project.id}`);
        else history.pushState({ project: project.id }, '', `#archive/${project.id}`);
      } catch {
        // history is optional on some file:// contexts
      }
    }
    projectSheet.scrollTop = 0;
    if (options.focus !== false) {
      requestAnimationFrame(() => {
        $('.project-tabs button', projectOverlay)?.focus({ preventScroll: true });
      });
    }
  }

  function closeProject(options = {}) {
    if (!projectOverlay || projectOverlay.hidden) return;
    const restoreFocus = options.restoreFocus !== false;
    const updateHistory = options.updateHistory !== false;
    projectOverlay.hidden = true;
    currentProject = null;
    if (updateHistory && location.hash.startsWith('#archive/')) {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch {
        // ignore
      }
    }
    if (!$('#searchOverlay')?.hidden) return;
    document.body.classList.remove('is-locked');
    if (restoreFocus && lastFocused && typeof lastFocused.focus === 'function' && document.contains(lastFocused)) {
      lastFocused.focus({ preventScroll: true });
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        return ok;
      } catch {
        return false;
      }
    }
  }

  if (projectOverlay) {
    projectOverlay.addEventListener('click', event => {
      if (event.target.closest('[data-close-project]')) closeProject();
    });
    $$('.project-tabs button', projectOverlay).forEach(button => {
      button.addEventListener('click', () => selectProjectTab(button.dataset.ptab));
    });
    $('.project-tabs', projectOverlay)?.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const tabs = $$('.project-tabs button', projectOverlay);
      const current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      event.preventDefault();
      const next = event.key === 'ArrowRight'
        ? (current + 1) % tabs.length
        : (current - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
    $('#projectSave')?.addEventListener('click', () => {
      if (currentProject) toggleBookmark(currentProject.id);
    });
    $('#projectShare')?.addEventListener('click', async () => {
      if (!currentProject) return;
      const url = location.href;
      const copied = await copyText(url);
      toast(copied ? '档案链接已复制 · 可直接分享' : '复制失败，请从地址栏复制链接');
    });
    $('#projectPrev')?.addEventListener('click', () => {
      if (!currentProject) return;
      const index = projects.indexOf(currentProject);
      if (index > 0) openProject(projects[index - 1].id, { replace: true });
    });
    $('#projectNext')?.addEventListener('click', () => {
      if (!currentProject) return;
      const index = projects.indexOf(currentProject);
      if (index < projects.length - 1) openProject(projects[index + 1].id, { replace: true });
    });
  }

  function projectFromHash() {
    const match = location.hash.match(/^#archive\/([a-z0-9-]+)$/i);
    return match?.[1] || null;
  }

  window.addEventListener('popstate', () => {
    const id = projectFromHash();
    if (id && projectIndex.has(id)) openProject(id, { push: false, focus: false });
    else closeProject({ updateHistory: false, restoreFocus: false });
  });

  /* =======================================================
     6. Global search
     ======================================================= */

  const searchOverlay = $('#searchOverlay');
  const globalSearch = $('#globalSearch');
  const searchResults = $('#searchResults');
  const searchTip = $('#searchTip');

  function searchMatches(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects.slice(0, 5);
    return projects.filter(project => {
      const haystack = `${project.title} ${project.en} ${project.region} ${project.category} ${project.lede}`.toLowerCase();
      return haystack.includes(normalized);
    }).slice(0, 7);
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const results = searchMatches(query);
    if (!query.trim()) {
      searchTip.textContent = '推荐从这里开始：昆曲、缂丝、皮影戏、二十四节气';
    } else {
      searchTip.textContent = results.length ? `找到 ${results.length} 条相关档案` : '没有找到相关档案，试试更宽泛的关键词';
    }

    if (!results.length) {
      searchResults.innerHTML = '<p class="search-empty">档案库中暂无匹配项，可在「共创」中提交线索。</p>';
      return;
    }

    searchResults.innerHTML = results.map(project => `
      <button type="button" class="search-result" data-search-id="${project.id}">
        <span><b>${escapeHTML(project.title)}</b><span>${escapeHTML(project.category)} · ${escapeHTML(project.region)}</span></span>
        <em>${project.no}</em>
      </button>`).join('');
  }

  function openSearch() {
    if (!searchOverlay) return;
    if (projectOverlay && !projectOverlay.hidden) return;
    if (mobileNav?.classList.contains('is-open')) closeMobileNav();
    lastFocused = document.activeElement;
    searchOverlay.hidden = false;
    document.body.classList.add('is-locked');
    renderSearchResults('');
    requestAnimationFrame(() => globalSearch?.focus());
  }

  function closeSearch() {
    if (!searchOverlay || searchOverlay.hidden) return;
    searchOverlay.hidden = true;
    if (!projectOverlay?.hidden) return;
    document.body.classList.remove('is-locked');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus({ preventScroll: true });
  }

  $$('.search-trigger').forEach(button => button.addEventListener('click', openSearch));
  $$('[data-close-search]').forEach(element => element.addEventListener('click', closeSearch));

  if (globalSearch) {
    globalSearch.addEventListener('input', () => renderSearchResults(globalSearch.value));
    globalSearch.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        $('.search-result', searchResults)?.focus();
        return;
      }
      if (event.key !== 'Enter') return;
      const first = $('.search-result', searchResults);
      if (first) first.click();
    });
  }

  if (searchResults) {
    searchResults.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const buttons = $$('.search-result', searchResults);
      const current = buttons.indexOf(document.activeElement);
      if (!buttons.length) return;
      event.preventDefault();
      const next = event.key === 'ArrowDown'
        ? (current + 1) % buttons.length
        : (current - 1 + buttons.length) % buttons.length;
      buttons[next]?.focus();
    });
    searchResults.addEventListener('click', event => {
      const button = event.target.closest('[data-search-id]');
      if (!button) return;
      closeSearch();
      openProject(button.dataset.searchId);
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (projectOverlay && !projectOverlay.hidden) {
        closeProject();
        return;
      }
      const moduleIds = ['artifactOverlay', 'spectralOverlay', 'soundOverlay'];
      for (const id of moduleIds) {
        const overlay = document.getElementById(id);
        if (overlay && !overlay.hidden) {
          closeModuleById(id);
          return;
        }
      }
      if (searchOverlay && !searchOverlay.hidden) {
        closeSearch();
        return;
      }
      if (mobileNav?.classList.contains('is-open')) closeMobileNav();
    }

    if (event.key === 'Tab') {
      const activeOverlay = projectOverlay && !projectOverlay.hidden
        ? projectSheet
        : (searchOverlay && !searchOverlay.hidden ? $('.search-panel') : null);
      if (!activeOverlay) return;
      const focusable = $$('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', activeOverlay)
        .filter(element => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const tag = document.activeElement?.tagName;
    const typing = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable;
    if (!typing && (event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'))) {
      event.preventDefault();
      openSearch();
    }
  });

  /* =======================================================
     7. Header, navigation, reveal, counters
     ======================================================= */

  const siteHead = $('#siteHead');
  const scrollProgress = $('#scrollProgress');
  const toTop = $('#toTop');
  const menuBtn = $('#menuBtn');
  const mobileNav = $('#mobileNav');
  const railLinks = $$('.section-rail a');
  const railSections = railLinks
    .map(link => document.getElementById(link.dataset.rail))
    .filter(Boolean);
  const railCount = $('#railCount');

  function updateRail() {
    if (!railLinks.length) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    const marker = y + window.innerHeight * 0.36;
    let active = railSections[0];
    railSections.forEach(section => {
      if (section.getBoundingClientRect().top + y <= marker) active = section;
    });
    const index = Math.max(0, railSections.indexOf(active));
    railLinks.forEach(link => {
      const isActive = link.dataset.rail === active?.id;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    if (railCount) railCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(railSections.length).padStart(2, '0')}`;
  }

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    siteHead?.classList.toggle('is-solid', y > 24);
    if (scrollProgress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? clamp(y / max, 0, 1) : 0;
      scrollProgress.firstElementChild.style.width = `${ratio * 100}%`;
    }
    toTop?.classList.toggle('is-on', y > 700);
    updateRail();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  function closeMobileNav() {
    if (!mobileNav || !mobileNav.classList.contains('is-open')) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.inert = true;
    menuBtn?.setAttribute('aria-expanded', 'false');
    if (!projectOverlay?.hidden || !searchOverlay?.hidden) return;
    document.body.classList.remove('is-locked');
  }

  menuBtn?.addEventListener('click', () => {
    const open = !mobileNav.classList.contains('is-open');
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    mobileNav.inert = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  });

  $$('a[href^="#"]', mobileNav).forEach(link => link.addEventListener('click', closeMobileNav));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileNav();
    updateRail();
  }, { passive: true });

  // active nav
  const navLinks = $$('.main-nav a[data-nav]');
  const navSections = navLinks
    .map(link => document.getElementById(link.dataset.nav))
    .filter(Boolean);

  if ('IntersectionObserver' in window && navSections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.dataset.nav === entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -58% 0px', threshold: 0 });
    navSections.forEach(section => navObserver.observe(section));
  }

  // reveal
  const revealItems = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReduced.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-in'));
  }

  // counters
  const counters = $$('[data-count]');
  const countObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        });
      }, { threshold: 0.6 })
    : null;

  function animateCounter(element) {
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target)) return;
    if (prefersReduced.matches) {
      element.textContent = formatNumber(target);
      return;
    }
    const duration = 1300;
    const start = performance.now();
    const tick = now => {
      const progress = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatNumber(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  counters.forEach(counter => {
    if (countObserver) countObserver.observe(counter);
    else animateCounter(counter);
  });

  /* =======================================================
     8. Artifact viewer (procedural celadon vase)
     ======================================================= */

  class VaseViewer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.rot = -0.55;
      this.tilt = -0.08;
      this.zoom = 1;
      this.velocity = 0.0025;
      this.autoRotate = !prefersReduced.matches;
      this.dragging = false;
      this.lastX = 0;
      this.lastY = 0;
      this.moved = false;
      this.visible = true;
      this.width = 0;
      this.height = 0;
      this.dpr = 1;
      this.lastFrame = 0;
      this.time = 0;
      this.rafId = 0;
      this.disposed = false;
      this.onActivate = null;
      this.dust = Array.from({ length: 26 }, (_, index) => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.35,
        alpha: 0.08 + Math.random() * 0.22
      }));

      // Profile: y from foot (-0.5) to lip (+0.5), radius normalized.
      this.outerProfile = [
        [-0.500, 0.096], [-0.498, 0.148], [-0.490, 0.160], [-0.480, 0.146],
        [-0.464, 0.112], [-0.448, 0.118], [-0.418, 0.157], [-0.374, 0.203],
        [-0.324, 0.245], [-0.270, 0.278], [-0.214, 0.300], [-0.158, 0.311],
        [-0.100, 0.313], [-0.044, 0.302], [0.010, 0.282], [0.060, 0.252],
        [0.106, 0.215], [0.150, 0.177], [0.190, 0.146], [0.228, 0.122],
        [0.266, 0.106], [0.306, 0.097], [0.344, 0.093], [0.380, 0.096],
        [0.410, 0.106], [0.436, 0.123], [0.454, 0.144], [0.470, 0.169],
        [0.484, 0.194], [0.494, 0.207], [0.500, 0.194]
      ];
      this.innerProfile = [
        [0.498, 0.170, 'inner'], [0.486, 0.153, 'inner'],
        [0.468, 0.147, 'inner'], [0.446, 0.153, 'inner']
      ];
      this.rings = this.buildRings(72);

      this.bind();
      this.resize();

      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(canvas.parentElement);

      this.intersectionObserver = new IntersectionObserver(entries => {
        this.visible = entries[0]?.isIntersecting ?? true;
      }, { threshold: 0.02 });
      this.intersectionObserver.observe(canvas.parentElement);

      this.loop = this.loop.bind(this);
      this.rafId = requestAnimationFrame(this.loop);
    }

    dispose() {
      this.disposed = true;
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.resizeObserver?.disconnect();
      this.intersectionObserver?.disconnect();
    }

    buildRings(count) {
      const profile = this.outerProfile;
      const rings = [];
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const y = -0.5 + t;
        let segment = 0;
        while (segment < profile.length - 2 && y > profile[segment + 1][0]) segment += 1;
        const a = profile[segment];
        const b = profile[segment + 1];
        const span = b[0] - a[0] || 1;
        const local = clamp((y - a[0]) / span, 0, 1);
        const r = a[1] + (b[1] - a[1]) * local;
        const isGold = (y > -0.499 && y < -0.476) || (y > 0.424 && y < 0.462);
        rings.push([y, r, isGold ? 'gold' : 'glaze']);
      }
      return rings.concat(this.innerProfile);
    }

    bind() {
      const canvas = this.canvas;
      canvas.tabIndex = 0;
      canvas.setAttribute('aria-label', '三维青瓷玉壶春瓶，可拖动旋转；聚焦后使用左右方向键旋转、上下方向键调整俯仰、加减号缩放');

      canvas.addEventListener('keydown', event => {
        let handled = true;
        if (event.key === 'ArrowLeft') this.rot -= 0.14;
        else if (event.key === 'ArrowRight') this.rot += 0.14;
        else if (event.key === 'ArrowUp') this.tilt = clamp(this.tilt - 0.045, -0.32, 0.26);
        else if (event.key === 'ArrowDown') this.tilt = clamp(this.tilt + 0.045, -0.32, 0.26);
        else if (event.key === '+' || event.key === '=') this.zoom = clamp(this.zoom + 0.07, 0.78, 1.34);
        else if (event.key === '-' || event.key === '_') this.zoom = clamp(this.zoom - 0.07, 0.78, 1.34);
        else if (event.key === 'Enter' && !this.moved) this.onActivate?.();
        else handled = false;
        if (handled) {
          event.preventDefault();
          this.velocity = 0;
        }
      });

      canvas.addEventListener('click', () => {
        if (this.disposed) return;
        if (!this.moved) this.onActivate?.();
      });

      canvas.addEventListener('pointerdown', event => {
        this.dragging = true;
        this.moved = false;
        this.autoPausedByDrag = this.autoRotate;
        if (this.autoPausedByDrag) this.autoRotate = false;
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        this.velocity = 0;
        canvas.setPointerCapture?.(event.pointerId);
      });

      canvas.addEventListener('pointermove', event => {
        if (!this.dragging) return;
        const dx = event.clientX - this.lastX;
        const dy = event.clientY - this.lastY;
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        if (Math.abs(dx) + Math.abs(dy) > 1) this.moved = true;
        this.rot += dx * 0.0072;
        this.tilt = clamp(this.tilt + dy * 0.0035, -0.32, 0.26);
        this.velocity = clamp(dx * 0.0009, -0.02, 0.02);
        event.preventDefault();
      });

      const endDrag = event => {
        if (!this.dragging) return;
        this.dragging = false;
        if (this.autoPausedByDrag) {
          this.autoRotate = true;
          this.autoPausedByDrag = false;
        }
        if (Math.abs(this.velocity) < 0.001) this.velocity = 0.0025;
        if (canvas.hasPointerCapture?.(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      };
      canvas.addEventListener('pointerup', endDrag);
      canvas.addEventListener('pointercancel', endDrag);

      canvas.addEventListener('wheel', event => {
        event.preventDefault();
        this.zoom = clamp(this.zoom - event.deltaY * 0.0007, 0.78, 1.34);
      }, { passive: false });

      canvas.addEventListener('dblclick', () => {
        this.resetView();
        toast('视角已复位');
      });
    }

    setAuto(value) {
      this.autoRotate = Boolean(value);
      if (this.autoRotate) this.velocity = Math.max(this.velocity, 0.0025);
    }

    zoomBy(delta) {
      this.zoom = clamp(this.zoom + delta, 0.78, 1.34);
    }

    resetView() {
      this.rot = -0.55;
      this.tilt = -0.08;
      this.zoom = 1;
      this.velocity = 0.0025;
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      this.width = rect.width;
      this.height = rect.height;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(rect.width * this.dpr);
      this.canvas.height = Math.round(rect.height * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    projectPoint(x, y, z, cx, cy, scale) {
      const rot = this.rot;
      const tilt = this.tilt;
      const cosY = Math.cos(rot);
      const sinY = Math.sin(rot);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const perspective = 1 / Math.max(0.55, 1 - z2 * 0.32);

      return {
        sx: cx + x1 * scale * perspective,
        sy: cy - y1 * scale * perspective,
        x: x1,
        y: y1,
        z: z2,
        perspective
      };
    }

    drawGround(ctx, cx, cy, scale) {
      const radiusX = scale * 0.38;
      const radiusY = scale * 0.052;
      const gradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radiusX);
      gradient.addColorStop(0, 'rgba(0,0,0,.62)');
      gradient.addColorStop(0.55, 'rgba(0,0,0,.24)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, radiusY / radiusX);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, radiusX, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = 'rgba(143,201,179,.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radiusX * 0.92, radiusY * 0.92, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    render() {
      const ctx = this.ctx;
      const width = this.width;
      const height = this.height;
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width * 0.9, height * 0.8) * this.zoom;
      const cx = width / 2;
      const cy = height * 0.54 + Math.sin(this.time * 0.0009) * 2.2;

      // atmospheric glow
      const glow = ctx.createRadialGradient(cx, cy - height * 0.05, 8, cx, cy, width * 0.55);
      glow.addColorStop(0, 'rgba(143,201,179,.15)');
      glow.addColorStop(0.45, 'rgba(95,155,133,.06)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      this.drawGround(ctx, cx, cy + scale * 0.49, scale);

      const segments = width < 380 ? 56 : 84;
      const rings = this.rings;
      const projected = [];

      for (let i = 0; i < rings.length; i++) {
        const [y, r, tag] = rings[i];
        const ring = [];
        for (let j = 0; j <= segments; j++) {
          const theta = (Math.PI * 2 * j) / segments;
          ring.push(this.projectPoint(Math.sin(theta) * r, y, Math.cos(theta) * r, cx, cy, scale));
        }
        projected.push({ ring, tag, y });
      }

      const light = (() => {
        const vector = [-0.48, 0.58, 0.72];
        const length = Math.hypot(...vector);
        return vector.map(value => value / length);
      })();

      const faces = [];
      for (let i = 0; i < projected.length - 1; i++) {
        const upper = projected[i + 1];
        const lower = projected[i];
        for (let j = 0; j < segments; j++) {
          const p1 = lower.ring[j];
          const p2 = lower.ring[j + 1];
          const p3 = upper.ring[j + 1];
          const p4 = upper.ring[j];
          const ux = p3.x - p1.x;
          const uy = p3.y - p1.y;
          const uz = p3.z - p1.z;
          const vx = p4.x - p2.x;
          const vy = p4.y - p2.y;
          const vz = p4.z - p2.z;
          let nx = uy * vz - uz * vy;
          let ny = uz * vx - ux * vz;
          let nz = ux * vy - uy * vx;
          const nLength = Math.hypot(nx, ny, nz) || 1;
          nx /= nLength; ny /= nLength; nz /= nLength;
          if (nz < 0) { nx *= -1; ny *= -1; nz *= -1; }
          const diff = Math.max(0, nx * light[0] + ny * light[1] + nz * light[2]);
          const rim = Math.pow(1 - Math.min(1, Math.abs(nz)), 3) * 0.34;
          const halfX = light[0];
          const halfY = light[1];
          const halfZ = light[2] + 1;
          const halfLength = Math.hypot(halfX, halfY, halfZ) || 1;
          const spec = Math.pow(Math.max(0, (nx * halfX + ny * halfY + nz * halfZ) / halfLength), 26) * 0.52;
          const depth = (p1.z + p2.z + p3.z + p4.z) / 4;
          const tag = lower.tag === 'gold' || upper.tag === 'gold' ? 'gold' : (lower.tag === 'inner' ? 'inner' : 'glaze');
          faces.push({ p1, p2, p3, p4, depth, diff, rim, spec, tag, j, i });
        }
      }

      faces.sort((a, b) => a.depth - b.depth);

      for (const face of faces) {
        let base;
        if (face.tag === 'gold') base = [188, 158, 96];
        else if (face.tag === 'inner') base = [36, 59, 51];
        else base = [118, 169, 145];

        const glazeWave = 1 + Math.sin(face.j * 0.19) * 0.014;
        const luminance = 0.38 + face.diff * 0.72;
        const r = clamp(base[0] * luminance * glazeWave + 255 * face.spec + 44 * face.rim, 0, 255);
        const g = clamp(base[1] * luminance * glazeWave + 255 * face.spec + 68 * face.rim, 0, 255);
        const b = clamp(base[2] * luminance * glazeWave + 255 * face.spec + 58 * face.rim, 0, 255);

        ctx.beginPath();
        ctx.moveTo(face.p1.sx, face.p1.sy);
        ctx.lineTo(face.p2.sx, face.p2.sy);
        ctx.lineTo(face.p3.sx, face.p3.sy);
        ctx.lineTo(face.p4.sx, face.p4.sy);
        ctx.closePath();
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.fill();
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // lip highlight
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const lip = ctx.createLinearGradient(cx - scale * 0.22, 0, cx + scale * 0.22, 0);
      lip.addColorStop(0, 'rgba(236,229,213,0)');
      lip.addColorStop(0.5, 'rgba(236,229,213,.32)');
      lip.addColorStop(1, 'rgba(236,229,213,0)');
      ctx.strokeStyle = lip;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, cy - scale * 0.48, scale * 0.19, scale * 0.022, -0.04, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // floating dust
      for (const particle of this.dust) {
        const x = cx + (particle.x - 0.5) * width * 0.82 + Math.sin(this.time * 0.00035 * particle.speed + particle.phase) * 9;
        const y = cy - (particle.y - 0.5) * height * 0.78 + Math.cos(this.time * 0.00028 * particle.speed + particle.phase) * 7;
        ctx.fillStyle = `rgba(236,229,213,${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    loop(timestamp) {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(this.loop);
      if (!this.visible || document.hidden) return;

      const elapsed = this.lastFrame ? Math.min(timestamp - this.lastFrame, 50) : 22;
      // render at ~40fps to keep the page light
      if (elapsed < 22) return;
      this.lastFrame = timestamp;
      this.time += elapsed;

      if (!this.dragging && this.autoRotate && !prefersReduced.matches) {
        this.velocity += (0.0025 - this.velocity) * 0.015;
        this.rot += this.velocity * (elapsed / 16.67);
      }
      this.render();
    }
  }

  const artifactCanvas = $('#artifactCanvas');
  let artifactViewer = null;
  let overlayViewer = null;

  function bindArtifactControls(viewer, autoBtn, resetBtn, zoomInBtn, zoomOutBtn, quiet = false) {
    const syncAuto = () => {
      if (!autoBtn) return;
      autoBtn.setAttribute('aria-pressed', String(viewer.autoRotate));
      autoBtn.setAttribute('aria-label', viewer.autoRotate ? '暂停自动旋转' : '开启自动旋转');
      autoBtn.title = viewer.autoRotate ? '暂停自动旋转' : '开启自动旋转';
    };
    syncAuto();
    autoBtn?.addEventListener('click', () => {
      viewer.setAuto(!viewer.autoRotate);
      syncAuto();
      if (!quiet) toast(viewer.autoRotate ? '自动旋转已开启' : '自动旋转已暂停');
    });
    resetBtn?.addEventListener('click', () => {
      viewer.resetView();
      if (!quiet) toast('视角已复位');
    });
    zoomInBtn?.addEventListener('click', () => viewer.zoomBy(0.09));
    zoomOutBtn?.addEventListener('click', () => viewer.zoomBy(-0.09));
    return syncAuto;
  }

  if (artifactCanvas && artifactCanvas.getContext) {
    artifactViewer = new VaseViewer(artifactCanvas);
    bindArtifactControls(artifactViewer, $('#artifactAuto'), $('#artifactReset'), $('#artifactZoomIn'), $('#artifactZoomOut'));
    artifactViewer.onActivate = () => openModule('artifact');
  }

  /* =======================================================
     8b. Exhibit module overlays (360 / spectral / sound)
     ======================================================= */

  const artifactOverlay = $('#artifactOverlay');
  const spectralOverlay = $('#spectralOverlay');
  const soundOverlay = $('#soundOverlay');
  const overlayCanvas = $('#overlayArtifactCanvas');
  let lastModuleFocus = null;

  const moduleById = { artifactOverlay: 'artifact', spectralOverlay: 'spectral', soundOverlay: 'sound' };
  const overlayByName = { artifact: artifactOverlay, spectral: spectralOverlay, sound: soundOverlay };

  function anyOverlayOpen() {
    return [projectOverlay, searchOverlay, artifactOverlay, spectralOverlay, soundOverlay]
      .some(overlay => overlay && !overlay.hidden);
  }

  function syncBodyLock() {
    document.body.classList.toggle('is-locked', anyOverlayOpen() || mobileNav?.classList.contains('is-open'));
  }

  function openModule(name) {
    const overlay = overlayByName[name];
    if (!overlay || overlay.hidden === false) return;
    lastModuleFocus = document.activeElement;
    overlay.hidden = false;
    syncBodyLock();
    if (name === 'artifact') {
      if (!overlayViewer && overlayCanvas?.getContext) {
        overlayViewer = new VaseViewer(overlayCanvas);
        bindArtifactControls(overlayViewer, $('#overlayAuto'), $('#overlayReset'), $('#overlayZoomIn'), $('#overlayZoomOut'), true);
      }
      overlayViewer?.resetView();
    }
    if (name === 'sound') renderSoundMiniList();
    requestAnimationFrame(() => overlay.querySelector('.module-close')?.focus({ preventScroll: true }));
  }

  function closeModule(name, restoreFocus = true) {
    const overlay = overlayByName[name];
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    if (name === 'artifact' && overlayViewer) {
      overlayViewer.dispose();
      overlayViewer = null;
    }
    syncBodyLock();
    if (restoreFocus && lastModuleFocus && typeof lastModuleFocus.focus === 'function' && document.contains(lastModuleFocus)) {
      lastModuleFocus.focus({ preventScroll: true });
    }
  }

  function closeModuleById(id) {
    const name = moduleById[id];
    if (name) closeModule(name);
  }

  $$('[data-close-module]').forEach(element => {
    element.addEventListener('click', () => closeModuleById(element.dataset.closeModule));
  });

  $$('.exhibit-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.dataset.open) openModule(card.dataset.open);
    });
    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      if (card.dataset.open) openModule(card.dataset.open);
    });
  });

  /* --- spectral imaging --- */
  const spectralRange = $('#spectralRange');
  const spectralCompare = $('#spectralCompare');
  const spectralStage = $('.spectral-stage', spectralOverlay);

  function setSpectralPct(value) {
    const pct = clamp(Number(value), 0, 100);
    if (spectralRange) spectralRange.value = String(Math.round(pct));
    spectralCompare?.style.setProperty('--pct', `${pct}%`);
  }

  spectralRange?.addEventListener('input', () => setSpectralPct(spectralRange.value));
  if (spectralCompare) {
    const updateFromPointer = event => {
      const rect = spectralCompare.getBoundingClientRect();
      const pct = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      setSpectralPct(pct);
    };
    spectralCompare.addEventListener('pointerdown', event => {
      spectralCompare.setPointerCapture?.(event.pointerId);
      updateFromPointer(event);
      const move = moveEvent => updateFromPointer(moveEvent);
      const up = upEvent => {
        updateFromPointer(upEvent);
        spectralCompare.removeEventListener('pointermove', move);
        spectralCompare.removeEventListener('pointerup', up);
      };
      spectralCompare.addEventListener('pointermove', move);
      spectralCompare.addEventListener('pointerup', up);
    });
  }

  $$('.spec-bands button').forEach(button => {
    button.addEventListener('click', () => {
      $$('.spec-bands button').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      spectralStage?.setAttribute('data-band', button.dataset.band);
    });
  });

  /* --- sound mini panel --- */
  function renderSoundMiniList() {
    const list = $('#soundMiniList');
    if (!list) return;
    list.innerHTML = tracks.map((track, index) => `
      <button type="button" class="track-row" data-mini-track="${index}">
        <span class="track-no">${track.no}</span>
        <span class="track-main"><b>${escapeHTML(track.title)}</b><span>${escapeHTML(track.sub)}</span></span>
        <span class="track-side">
          <em>PLAY</em>
          <span class="track-play-ic" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M5 3.5 12 8l-7 4.5Z" fill="currentColor"/></svg></span>
        </span>
      </button>`).join('');
  }

  $('#soundMiniList')?.addEventListener('click', event => {
    const button = event.target.closest('[data-mini-track]');
    if (!button) return;
    const index = Number(button.dataset.miniTrack);
    closeModule('sound', false);
    const section = $('#sound');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.querySelector(`[data-track-index="${index}"]`)?.click(), 420);
  });

  /* =======================================================
     9. Theatre
     ======================================================= */

  const theatre = $('#theatre');
  const theatreScene = $('#theatreScene');
  const theatrePlay = $('#theatrePlay');
  const theatreFull = $('#theatreFull');
  const piyingVideo = $('#piyingVideo');

  if (theatreScene) {
    theatreScene.addEventListener('pointermove', event => {
      const rect = theatreScene.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      theatreScene.style.setProperty('--mx', clamp(x, -1, 1).toFixed(3));
      theatreScene.style.setProperty('--my', clamp(y, -1, 1).toFixed(3));
    });
    theatreScene.addEventListener('pointerleave', () => {
      theatreScene.style.setProperty('--mx', '0');
      theatreScene.style.setProperty('--my', '0');
    });
  }

  const showScenes = [
    {
      act: '第一折 · 武松打虎',
      lines: ['看那大虫，扑将上来——', '武松侧身闪过，举起哨棒。', '只一棒，正中虎头！']
    },
    {
      act: '第二折 · 三打白骨精',
      lines: ['妖精化作村姑，提篮前来。', '悟空火眼金睛，识破真身。', '一棒打去，妖风遁走！']
    },
    {
      act: '第三折 · 白蛇传',
      lines: ['断桥相会，伞下重逢。', '白娘子与许仙，情深如许。', '水漫金山，难断真情。']
    }
  ];

  const actElements = ['.act-a', '.act-b', '.act-c'].map(selector => $(selector, theatreScene));
  let showTimer = null;
  let showSceneIndex = 0;
  let showLineIndex = 0;

  function renderShowFrame() {
    const scene = showScenes[showSceneIndex];
    const subAct = $('#subAct');
    const subLine = $('#subLine');
    if (subAct) subAct.textContent = scene.act;
    if (subLine) subLine.textContent = scene.lines[showLineIndex];
    actElements.forEach((el, index) => el?.classList.toggle('is-on', index === showSceneIndex));
    $$('#theatreActs i').forEach((dot, index) => dot.classList.toggle('is-on', index === showSceneIndex));
  }

  function startShow() {
    stopShow();
    theatre.classList.add('is-playing');
    showSceneIndex = 0;
    showLineIndex = 0;
    renderShowFrame();
    showTimer = setInterval(() => {
      showLineIndex += 1;
      if (showLineIndex >= showScenes[showSceneIndex].lines.length) {
        showLineIndex = 0;
        showSceneIndex = (showSceneIndex + 1) % showScenes.length;
      }
      renderShowFrame();
    }, 2200);
  }

  function stopShow() {
    if (showTimer) clearInterval(showTimer);
    showTimer = null;
    theatre.classList.remove('is-playing');
  }

  function setVideoCaption() {
    const subAct = $('#subAct');
    const subLine = $('#subLine');
    if (subAct) subAct.textContent = '纪录片 · 皮影人生';
    if (subLine) subLine.textContent = '视频来源：中国非物质文化遗产网《四川非遗100 · 皮影人生》（片段循环）';
    $$('#theatreActs i').forEach(dot => dot.classList.remove('is-on'));
  }

  async function playTheatreVideo() {
    if (!piyingVideo || !piyingVideo.querySelector('source')) return false;
    try {
      stopShow();
      theatre.classList.remove('is-video');
      piyingVideo.currentTime = 0;
      await piyingVideo.play();
      theatre.classList.add('is-video');
      theatre.classList.add('is-playing');
      setVideoCaption();
      toast('幕布亮起：纪录片《皮影人生》');
      return true;
    } catch {
      return false;
    }
  }

  function pauseTheatreVideo() {
    piyingVideo?.pause();
    theatre.classList.remove('is-playing');
  }

  theatrePlay?.addEventListener('click', async () => {
    const playing = !theatre.classList.contains('is-playing');
    if (!playing) {
      if (theatre.classList.contains('is-video')) pauseTheatreVideo();
      else stopShow();
      theatre.classList.remove('is-video');
      toast('演出暂停 · 移动鼠标环绕戏台');
    } else {
      const videoStarted = await playTheatreVideo();
      if (!videoStarted) {
        startShow();
        toast('视频未就绪，已切换三折皮影小戏：《武松打虎》《三打白骨精》《白蛇传》');
      }
    }
    const nowPlaying = theatre.classList.contains('is-playing');
    theatrePlay.classList.toggle('is-playing', nowPlaying);
    theatrePlay.setAttribute('aria-pressed', String(nowPlaying));
    theatrePlay.setAttribute('aria-label', nowPlaying ? '暂停皮影戏' : '开演皮影戏');
  });

  piyingVideo?.addEventListener('error', () => {
    if (theatre.classList.contains('is-video')) {
      theatre.classList.remove('is-video', 'is-playing');
      startShow();
    }
  });

  theatreFull?.addEventListener('click', async () => {
    if (!theatre) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (theatre.requestFullscreen) {
        await theatre.requestFullscreen();
        toast('已进入全屏 · 按 ESC 退出');
      } else {
        toast('当前浏览器不支持全屏演示');
      }
    } catch {
      toast('当前环境暂不支持全屏演示');
    }
  });

  /* =======================================================
     10. Map
     ======================================================= */

  const mapSites = [
    {
      id: 'beijing', place: '北京', x: 744, y: 188, projectId: 'kunqu',
      note: '明清两代，昆曲由江南进入宫廷与士大夫雅集，在北京形成南北交融的演剧传统。'
    },
    {
      id: 'suzhou', place: '苏州', x: 858, y: 344, projectId: 'kesi',
      note: '“通经断纬”，一梭一纬间织出书画的层次。缂丝不作底衬，正反两面皆可观赏。'
    },
    {
      id: 'nanjing', place: '南京', x: 786, y: 300, projectId: 'yunjin',
      note: '江宁织造旧址所在。大花楼织机上一人提花、一人织纬，一天只能织出五六厘米。'
    },
    {
      id: 'longquan', place: '龙泉', x: 812, y: 410, projectId: 'celadon',
      note: '龙泉窑依山而建，还原焰中烧出粉青与梅子青。釉色如玉，是火与土共同完成的作品。'
    },
    {
      id: 'taian', place: '泰安', x: 730, y: 244, projectId: 'piying',
      note: '泰山脚下，皮影艺人一人可兼操纵、演唱与伴奏，人称“十不闲”。'
    },
    {
      id: 'weinan', place: '渭南', x: 556, y: 282, projectId: 'piying',
      note: '华县皮影雕刻细密，影人造型古朴，碗碗腔的唱腔在幕布后起伏。'
    },
    {
      id: 'liping', place: '黎平', x: 540, y: 430, projectId: 'dong',
      note: '侗寨鼓楼与火塘边，歌师一句句传歌。多声部在没有指挥的情况下自然咬合。'
    },
    {
      id: 'yanji', place: '延吉', x: 902, y: 154, projectId: 'nongak',
      note: '长鼓与锣声里，象帽的长带在空中划出圆环。农乐舞把春耕秋收的力气跳成了舞。'
    },
    {
      id: 'wenxian', place: '温县', x: 652, y: 280, projectId: 'taiji',
      note: '陈家沟是陈氏太极拳的重要发源地。松沉、圆活、连绵，力量藏在看不见的地方。'
    },
    {
      id: 'lhasa', place: '拉萨', x: 306, y: 348, projectId: 'gesar',
      note: '说唱艺人手持牛角琴，以程式化的开篇进入史诗。一部《格萨尔》可以唱上数日。'
    }
  ];

  const mapNodesGroup = $('#mapNodes');
  const mapTip = $('#mapTip');
  const mapCanvas = $('#mapCanvas');
  const mapCard = $('#mapCard');
  const mobileMapList = $('#mobileMapList');
  const eraFilter = $('#eraFilter');
  const mapLegend = $('#mapLegend');
  let activeSiteId = 'suzhou';
  let activeEra = 'all';
  let activeMapCategory = 'all';

  function siteProject(site) {
    return projectIndex.get(site.projectId);
  }

  function renderMapNodes() {
    if (!mapNodesGroup) return;
    mapNodesGroup.innerHTML = mapSites.map(site => {
      const project = siteProject(site);
      const color = categoryColors[project.category] || '#8fc9b3';
      return `
        <g class="map-node" tabindex="0" role="button" data-site-id="${site.id}" aria-label="${escapeHTML(site.place)}：${escapeHTML(project.title)}" style="--node:${color}">
          <circle class="node-halo" cx="${site.x}" cy="${site.y}" r="15" fill="${color}"/>
          <circle class="node-core" cx="${site.x}" cy="${site.y}" r="5" fill="${color}" stroke="#07110e" stroke-width="2"/>
          <text x="${site.x}" y="${site.y - 15}">${escapeHTML(site.place)}</text>
        </g>`;
    }).join('');
  }

  function renderMobileMapList() {
    if (!mobileMapList) return;
    mobileMapList.innerHTML = `<p class="mobile-map-label">PLACES / 地点索引 · ${mapSites.length} 处</p>` + mapSites.map(site => {
      const project = siteProject(site);
      const color = categoryColors[project.category] || '#8fc9b3';
      return `
        <button type="button" class="mobile-map-item" data-mobile-site="${site.id}" style="--dot:${color}">
          <span class="mobile-map-dot" aria-hidden="true"></span>
          <span class="mobile-map-main">
            <b>${escapeHTML(site.place)} · ${escapeHTML(project.title)}</b>
            <span>${escapeHTML(project.category)} · ${project.year}</span>
          </span>
          <span class="mobile-map-year">→</span>
        </button>`;
    }).join('');
  }

  function updateMapCard(site) {
    if (!mapCard) return;
    const project = siteProject(site);
    if (!project) return;
    mapCard.innerHTML = `
      <div class="map-card-top">
        <span class="map-card-cat">${escapeHTML(project.category)}</span>
        <span class="map-card-year">${project.year}</span>
      </div>
      <h4>${escapeHTML(project.title)}</h4>
      <p class="map-card-region">${escapeHTML(site.place)} · ${escapeHTML(project.region)}</p>
      <p class="map-card-note">${escapeHTML(site.note)}</p>
      <button class="text-btn" type="button" data-open-project="${project.id}">查阅完整档案 <span>→</span></button>`;

    $$('.map-node', mapNodesGroup).forEach(node => {
      node.classList.toggle('is-active', node.dataset.siteId === site.id);
    });
  }

  function selectSite(id) {
    const site = mapSites.find(item => item.id === id);
    if (!site) return;
    activeSiteId = id;
    updateMapCard(site);
  }

  function applyMapFilters() {
    let firstVisible = null;
    let activeVisible = false;
    $$('.map-node', mapNodesGroup).forEach(node => {
      const site = mapSites.find(item => item.id === node.dataset.siteId);
      const project = site ? siteProject(site) : null;
      if (!project) return;
      let eraVisible = true;
      if (activeEra === 'early') eraVisible = project.year <= 2009;
      else if (activeEra === 'mid') eraVisible = project.year >= 2010 && project.year <= 2016;
      else if (activeEra === 'late') eraVisible = project.year >= 2017;
      const categoryVisible = activeMapCategory === 'all' || project.category === activeMapCategory;
      const visible = eraVisible && categoryVisible;
      node.classList.toggle('is-dim', !visible);
      if (visible && !firstVisible) firstVisible = site;
      if (visible && node.dataset.siteId === activeSiteId) activeVisible = true;
    });

    $$('.mobile-map-item', mobileMapList).forEach(item => {
      const site = mapSites.find(entry => entry.id === item.dataset.mobileSite);
      const project = site ? siteProject(site) : null;
      if (!project) return;
      let eraVisible = true;
      if (activeEra === 'early') eraVisible = project.year <= 2009;
      else if (activeEra === 'mid') eraVisible = project.year >= 2010 && project.year <= 2016;
      else if (activeEra === 'late') eraVisible = project.year >= 2017;
      const categoryVisible = activeMapCategory === 'all' || project.category === activeMapCategory;
      item.hidden = !(eraVisible && categoryVisible);
    });

    if (!activeVisible && firstVisible) selectSite(firstVisible.id);
    else if (!firstVisible && mapCard) {
      activeSiteId = null;
      $$('.map-node', mapNodesGroup).forEach(node => node.classList.remove('is-active'));
      mapCard.innerHTML = `
        <div class="map-card-top"><span class="map-card-cat">NO MATCH</span><span class="map-card-year">0</span></div>
        <h4>此处暂无档案</h4>
        <p class="map-card-note">当前时间与门类组合下没有地点。试试切回「全部」，或放宽时间范围。</p>`;
    }
  }

  function applyEraFilter(era) {
    activeEra = era;
    applyMapFilters();
  }

  if (mapNodesGroup) {
    renderMapNodes();
    renderMobileMapList();
    selectSite(activeSiteId);

    mobileMapList?.addEventListener('click', event => {
      const button = event.target.closest('[data-mobile-site]');
      if (!button) return;
      const site = mapSites.find(item => item.id === button.dataset.mobileSite);
      if (!site) return;
      selectSite(site.id);
      openProject(site.projectId);
    });

    mapNodesGroup.addEventListener('click', event => {
      const node = event.target.closest('.map-node');
      if (node) selectSite(node.dataset.siteId);
    });

    mapNodesGroup.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const node = event.target.closest('.map-node');
      if (!node) return;
      event.preventDefault();
      selectSite(node.dataset.siteId);
    });

    mapNodesGroup.addEventListener('pointerover', event => {
      const node = event.target.closest('.map-node');
      if (!node || !mapTip || !mapCanvas) return;
      const site = mapSites.find(item => item.id === node.dataset.siteId);
      const project = site ? siteProject(site) : null;
      if (!project) return;
      const nodeRect = node.getBoundingClientRect();
      const canvasRect = mapCanvas.getBoundingClientRect();
      mapTip.textContent = `${site.place} · ${project.title}`;
      mapTip.style.left = `${nodeRect.left - canvasRect.left + nodeRect.width / 2}px`;
      mapTip.style.top = `${nodeRect.top - canvasRect.top + 4}px`;
      mapTip.hidden = false;
    });

    mapNodesGroup.addEventListener('pointerout', event => {
      if (mapTip && !event.relatedTarget?.closest?.('.map-node')) mapTip.hidden = true;
    });

    mapCard?.addEventListener('click', event => {
      const button = event.target.closest('[data-open-project]');
      if (button) openProject(button.dataset.openProject);
    });
  }

  eraFilter?.addEventListener('click', event => {
    const button = event.target.closest('button[data-era]');
    if (!button) return;
    $$('button', eraFilter).forEach(item => item.classList.toggle('is-active', item === button));
    applyEraFilter(button.dataset.era);
  });

  if (mapLegend) {
    $$('button', mapLegend).forEach(button => {
      button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    });
    mapLegend.addEventListener('click', event => {
      const button = event.target.closest('button[data-map-cat]');
      if (!button) return;
      activeMapCategory = button.dataset.mapCat;
      $$('button', mapLegend).forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      applyMapFilters();
      if (activeMapCategory !== 'all') toast(`地图已筛选：${button.textContent.trim()}`);
    });
  }

  /* =======================================================
     11. Knowledge graph
     ======================================================= */

  const graphTypes = {
    project: { label: '项目', en: 'PROJECT', color: '#d15a42' },
    person: { label: '传承人', en: 'INHERITOR', color: '#8fc9b3' },
    school: { label: '流派', en: 'SCHOOL', color: '#c7a86a' },
    play: { label: '剧目', en: 'PLAY', color: '#7fa6c9' },
    craft: { label: '技艺', en: 'CRAFT', color: '#b98f6a' },
    place: { label: '地域', en: 'PLACE', color: '#9aa89f' },
    material: { label: '材料', en: 'MATERIAL', color: '#a87f9a' }
  };

  const graphNodes = [
    { id: 'piying', label: '皮影戏', type: 'project', ix: 0, iy: 0, desc: '以兽皮或纸板雕刻人物剪影，借灯影投射于幕布，配以唱腔与操纵，演尽千古故事。' },
    { id: 'fan', label: '范正安', type: 'person', ix: -0.72, iy: -0.58, desc: '泰山皮影国家级代表性传承人，以一人完成操纵、演唱与伴奏的“十不闲”绝技闻名。' },
    { id: 'wang', label: '汪天稳', type: 'person', ix: -0.5, iy: 0.55, desc: '华县皮影雕刻名家，刀法细密，人物造型古朴，长期推动皮影雕刻的传承。' },
    { id: 'taishan', label: '泰山皮影', type: 'school', ix: -0.3, iy: -0.6, desc: '流传于山东泰安一带，以一人多角色的“十不闲”表演见长。' },
    { id: 'huaxian', label: '华县皮影', type: 'school', ix: -0.72, iy: 0.18, desc: '陕西渭南华州一带的皮影流派，雕刻细腻，常以碗碗腔伴奏。' },
    { id: 'tangshan', label: '唐山皮影', type: 'school', ix: 0.24, iy: -0.64, desc: '河北唐山一带的皮影流派，驴皮镂刻，造型俊俏，唱腔以掐嗓为特色。' },
    { id: 'wusong', label: '武松打虎', type: 'play', ix: -0.6, iy: -0.22, desc: '皮影戏常演剧目，以武打身段与紧凑锣鼓见长。' },
    { id: 'sunwukong', label: '三打白骨精', type: 'play', ix: 0.62, iy: -0.32, desc: '以孙悟空变化与打斗为核心，影人机关与火光效果丰富。' },
    { id: 'baishe', label: '白蛇传', type: 'play', ix: 0.72, iy: 0.18, desc: '皮影戏中的浪漫题材，水漫金山一段尤见影人与灯影的调度。' },
    { id: 'carving', label: '驴皮雕刻', type: 'craft', ix: 0.04, iy: 0.66, desc: '选皮、泡制、刮薄、描样、镂刻，影人的筋骨与神态都在刀口之间。' },
    { id: 'dyeing', label: '手工染色', type: 'craft', ix: 0.48, iy: 0.58, desc: '以矿物与植物颜料分层敷染，使影人在灯下通透而不失厚重。' },
    { id: 'manipulation', label: '竹签操纵', type: 'craft', ix: 0.78, iy: 0.4, desc: '三根竹签控制头、手、足，艺人以腕力与指法让影人行走、转身、开打。' },
    { id: 'donkey', label: '驴皮', type: 'material', ix: -0.28, iy: 0.76, desc: '传统影人常用材料，刮薄后半透明，耐反复雕刻与长期使用。' },
    { id: 'pigment', label: '矿物颜料', type: 'material', ix: 0.7, iy: 0.72, desc: '石青、石绿、朱砂等矿物色，色泽稳定，在灯光下呈现温润的透明感。' },
    { id: 'taian', label: '山东泰安', type: 'place', ix: -0.34, iy: -0.86, desc: '泰山脚下，泰山皮影的发源与流传地。' },
    { id: 'weinan', label: '陕西渭南', type: 'place', ix: -0.94, iy: 0.34, desc: '华县皮影的故乡，关中东部的重要文化区域。' },
    { id: 'tangshanplace', label: '河北唐山', type: 'place', ix: 0.42, iy: -0.88, desc: '唐山皮影的发源地，冀东民间艺术的重要代表。' }
  ];

  const graphEdges = [
    { source: 'piying', target: 'fan', label: '传承' },
    { source: 'piying', target: 'wang', label: '传承' },
    { source: 'fan', target: 'taishan', label: '代表' },
    { source: 'wang', target: 'huaxian', label: '代表' },
    { source: 'piying', target: 'taishan', label: '流派' },
    { source: 'piying', target: 'huaxian', label: '流派' },
    { source: 'piying', target: 'tangshan', label: '流派' },
    { source: 'taishan', target: 'wusong', label: '常演' },
    { source: 'huaxian', target: 'wusong', label: '常演' },
    { source: 'piying', target: 'sunwukong', label: '剧目' },
    { source: 'piying', target: 'baishe', label: '剧目' },
    { source: 'piying', target: 'carving', label: '技艺' },
    { source: 'piying', target: 'dyeing', label: '技艺' },
    { source: 'piying', target: 'manipulation', label: '技艺' },
    { source: 'carving', target: 'donkey', label: '材料' },
    { source: 'dyeing', target: 'pigment', label: '材料' },
    { source: 'taishan', target: 'taian', label: '流行于' },
    { source: 'huaxian', target: 'weinan', label: '流行于' },
    { source: 'tangshan', target: 'tangshanplace', label: '流行于' }
  ];

  const graphCanvas = $('#graphCanvas');
  const graphPanel = $('#graphPanel');
  const graphTitle = $('#graphTitle');
  const graphDesc = $('#graphDesc');
  const graphType = $('#graphType');
  const graphChips = $('#graphChips');
  const graphRelCount = $('#graphRelCount');
  const graphFilter = $('#graphFilter');
  let selectedGraphId = 'piying';
  let graphFilterType = 'all';
  let graphState = null;

  function graphNeighbors(id) {
    const results = [];
    graphEdges.forEach(edge => {
      if (edge.source === id) results.push({ id: edge.target, label: edge.label });
      else if (edge.target === id) results.push({ id: edge.source, label: edge.label });
    });
    return results;
  }

  function updateGraphPanel(id) {
    const node = graphNodes.find(item => item.id === id);
    if (!node || !graphPanel) return;
    selectedGraphId = id;
    const type = graphTypes[node.type];
    graphType.textContent = `${type.label} · ${type.en}`;
    graphTitle.textContent = node.label;
    graphDesc.textContent = node.desc;
    const neighbors = graphNeighbors(id);
    if (graphRelCount) graphRelCount.textContent = String(neighbors.length);
    if (graphChips) {
      graphChips.innerHTML = neighbors.map(relation => {
        const other = graphNodes.find(item => item.id === relation.id);
        if (!other) return '';
        return `<button type="button" data-graph-id="${other.id}">${escapeHTML(other.label)} <span style="opacity:.55">· ${escapeHTML(relation.label)}</span></button>`;
      }).join('');
    }
  }

  function initGraph() {
    if (!graphCanvas) return;
    const ctx = graphCanvas.getContext('2d');
    const state = {
      ctx,
      width: 0,
      height: 0,
      dpr: 1,
      nodes: [],
      hoveredId: null,
      draggingId: null,
      panning: false,
      panStart: null,
      view: { x: 0, y: 0, scale: 1 },
      pointerX: 0,
      pointerY: 0,
      dragMoved: false,
      time: 0,
      visible: true
    };
    graphState = state;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        state.visible = entries[0]?.isIntersecting ?? true;
      }, { threshold: 0.01 }).observe(graphCanvas);
    }

    const resize = () => {
      const rect = graphCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const previousWidth = state.width || rect.width;
      const previousHeight = state.height || rect.height;
      state.width = rect.width;
      state.height = rect.height;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      graphCanvas.width = Math.round(rect.width * state.dpr);
      graphCanvas.height = Math.round(rect.height * state.dpr);
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      const scaleX = rect.width / previousWidth;
      const scaleY = rect.height / previousHeight;
      state.nodes.forEach(node => {
        node.x *= scaleX;
        node.y *= scaleY;
      });
    };

    const isCompact = () => state.width < 700;
    const center = () => {
      if (isCompact()) return { x: state.width * 0.5, y: state.height * 0.48 };
      return { x: (state.width - 320) * 0.5, y: state.height * 0.48 };
    };

    state.nodes = graphNodes.map(node => ({ ...node, vx: 0, vy: 0, x: 0, y: 0 }));
    const initialCenter = { x: (graphCanvas.clientWidth - 320) * 0.5, y: graphCanvas.clientHeight * 0.48 };
    state.nodes.forEach(node => {
      node.x = initialCenter.x + node.ix * Math.min(graphCanvas.clientWidth * 0.36, 450);
      node.y = initialCenter.y + node.iy * Math.min(graphCanvas.clientHeight * 0.38, 235);
    });

    resize();

    const nodeById = id => state.nodes.find(node => node.id === id);

    const physics = () => {
      const c = center();
      const nodes = state.nodes;
      nodes.forEach(node => {
        node.fx = (c.x - node.x) * 0.0022;
        node.fy = (c.y - node.y) * 0.0022;
        if (node.id === 'piying') {
          node.fx += (c.x - node.x) * 0.003;
          node.fy += (c.y - node.y) * 0.003;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          let dist = Math.hypot(dx, dy) || 0.01;
          const minDist = 74;
          if (dist < minDist) {
            const force = (minDist - dist) * 0.034;
            dx /= dist; dy /= dist;
            a.fx -= dx * force;
            a.fy -= dy * force;
            b.fx += dx * force;
            b.fy += dy * force;
          }
          if (dist < 230) {
            const repel = 600 / (dist * dist);
            a.fx -= (dx / dist) * repel;
            a.fy -= (dy / dist) * repel;
            b.fx += (dx / dist) * repel;
            b.fy += (dy / dist) * repel;
          }
        }
      }

      graphEdges.forEach(edge => {
        const a = nodeById(edge.source);
        const b = nodeById(edge.target);
        if (!a || !b) return;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const spring = (dist - 128) * 0.006;
        const fx = (dx / dist) * spring;
        const fy = (dy / dist) * spring;
        a.fx += fx; a.fy += fy;
        b.fx -= fx; b.fy -= fy;
      });

      const maxX = isCompact() ? state.width - 34 : state.width - 346;
      nodes.forEach(node => {
        if (node.id === state.draggingId) {
          node.vx = 0; node.vy = 0;
          return;
        }
        node.vx = (node.vx + node.fx) * 0.84;
        node.vy = (node.vy + node.fy) * 0.84;
        const speed = Math.hypot(node.vx, node.vy);
        if (speed > 2.4) {
          node.vx = (node.vx / speed) * 2.4;
          node.vy = (node.vy / speed) * 2.4;
        }
        node.x += node.vx;
        node.y += node.vy;
        node.x = clamp(node.x, 34, maxX);
        node.y = clamp(node.y, 54, state.height - 34);
      });
    };

    const draw = () => {
      state.time += 1;
      physics();
      ctx.clearRect(0, 0, state.width, state.height);
      ctx.save();
      ctx.translate(state.view.x, state.view.y);
      ctx.scale(state.view.scale, state.view.scale);

      const highlightId = state.hoveredId || selectedGraphId;
      const connected = new Set([highlightId]);
      graphEdges.forEach(edge => {
        if (edge.source === highlightId) connected.add(edge.target);
        if (edge.target === highlightId) connected.add(edge.source);
      });

      graphEdges.forEach(edge => {
        const a = nodeById(edge.source);
        const b = nodeById(edge.target);
        if (!a || !b) return;
        const relevant = edge.source === highlightId || edge.target === highlightId;
        const filterPass = graphFilterType === 'all' || a.type === graphFilterType || b.type === graphFilterType;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = relevant
          ? 'rgba(199,168,106,.62)'
          : `rgba(143,201,179,${filterPass ? 0.16 : 0.05})`;
        ctx.lineWidth = relevant ? 1.2 : 0.8;
        ctx.stroke();

        if (relevant && (state.hoveredId || edge.source === selectedGraphId || edge.target === selectedGraphId)) {
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          ctx.font = '8px "Cascadia Code","Consolas",monospace';
          ctx.fillStyle = 'rgba(199,168,106,.7)';
          ctx.textAlign = 'center';
          ctx.fillText(edge.label, mx, my - 5);
        }
      });

      state.nodes.forEach(node => {
        const type = graphTypes[node.type];
        const isHighlighted = node.id === highlightId;
        const isConnected = connected.has(node.id);
        const filterPass = graphFilterType === 'all' || node.type === graphFilterType;
        const alpha = filterPass ? (isHighlighted || isConnected ? 1 : 0.64) : 0.14;
        const radius = node.type === 'project' ? 13 : (isHighlighted ? 9.5 : 7);

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 7, 0, Math.PI * 2);
        ctx.fillStyle = `${type.color}14`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = type.color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(6,16,12,.9)';
        ctx.stroke();

        if (isHighlighted) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 5 + Math.sin(state.time * 0.04) * 1.4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(236,229,213,.65)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.font = `${isHighlighted ? '600 12.5px' : '500 11px'} "Microsoft YaHei UI","PingFang SC",sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(5,13,10,.92)';
        ctx.strokeText(node.label, node.x, node.y + radius + 6);
        ctx.fillStyle = isHighlighted ? '#f2eadb' : 'rgba(222,215,198,.82)';
        ctx.fillText(node.label, node.x, node.y + radius + 6);
        ctx.globalAlpha = 1;
      });

      ctx.restore();
    };

    const loop = () => {
      if (state.visible && state.width && state.height) draw();
      requestAnimationFrame(loop);
    };

    const graphZoomLabel = $('#graphZoomLabel');
    const zoomRange = { min: 0.55, max: 2.2 };
    const updateZoomLabel = () => {
      if (graphZoomLabel) graphZoomLabel.textContent = `${Math.round(state.view.scale * 100)}%`;
    };
    const setZoom = (nextScale, anchor) => {
      const scale = clamp(nextScale, zoomRange.min, zoomRange.max);
      const point = anchor || { x: state.width / 2, y: state.height / 2 };
      const worldX = (point.x - state.view.x) / state.view.scale;
      const worldY = (point.y - state.view.y) / state.view.scale;
      state.view.scale = scale;
      state.view.x = point.x - worldX * scale;
      state.view.y = point.y - worldY * scale;
      updateZoomLabel();
    };
    const resetGraphView = () => {
      state.view = { x: 0, y: 0, scale: 1 };
      const c = center();
      state.nodes.forEach(node => {
        node.x = c.x + node.ix * Math.min(state.width * 0.36, 440);
        node.y = c.y + node.iy * Math.min(state.height * 0.38, 225);
        node.vx = 0;
        node.vy = 0;
      });
      updateZoomLabel();
    };

    const toWorld = (x, y) => ({
      x: (x - state.view.x) / state.view.scale,
      y: (y - state.view.y) / state.view.scale
    });

    const nodeAt = (screenX, screenY) => {
      const point = toWorld(screenX, screenY);
      const threshold = 22 / state.view.scale;
      for (let i = state.nodes.length - 1; i >= 0; i--) {
        const node = state.nodes[i];
        if (Math.hypot(node.x - point.x, node.y - point.y) < threshold) return node;
      }
      return null;
    };

    const pointFromEvent = event => {
      const rect = graphCanvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    graphCanvas.addEventListener('pointermove', event => {
      const point = pointFromEvent(event);
      state.pointerX = point.x;
      state.pointerY = point.y;
      if (state.draggingId) {
        const world = toWorld(point.x, point.y);
        const node = nodeById(state.draggingId);
        if (node) {
          node.x = clamp(world.x, 30, isCompact() ? state.width - 30 : state.width - 340);
          node.y = clamp(world.y, 46, state.height - 30);
          if (state.dragStart && Math.hypot(point.x - state.dragStart.x, point.y - state.dragStart.y) > 2) {
            state.dragMoved = true;
          }
        }
        return;
      }
      if (state.panning && state.panStart) {
        state.view.x = point.x - state.panStart.x;
        state.view.y = point.y - state.panStart.y;
        if (state.dragStart && Math.hypot(point.x - state.dragStart.x, point.y - state.dragStart.y) > 2) {
          state.dragMoved = true;
        }
        return;
      }
      const node = nodeAt(point.x, point.y);
      state.hoveredId = node ? node.id : null;
      graphCanvas.style.cursor = node ? 'pointer' : 'grab';
    });

    graphCanvas.addEventListener('pointerdown', event => {
      const point = pointFromEvent(event);
      const node = nodeAt(point.x, point.y);
      state.dragStart = point;
      state.dragMoved = false;
      if (node) {
        state.draggingId = node.id;
      } else {
        state.panning = true;
        state.panStart = { x: point.x - state.view.x, y: point.y - state.view.y };
      }
      graphCanvas.setPointerCapture?.(event.pointerId);
      graphCanvas.style.cursor = 'grabbing';
    });

    const endDrag = event => {
      if (state.draggingId && !state.dragMoved && !state.panning) updateGraphPanel(state.draggingId);
      state.draggingId = null;
      state.panning = false;
      state.panStart = null;
      state.dragStart = null;
      graphCanvas.style.cursor = 'grab';
      if (graphCanvas.hasPointerCapture?.(event.pointerId)) graphCanvas.releasePointerCapture(event.pointerId);
    };
    graphCanvas.addEventListener('pointerup', endDrag);
    graphCanvas.addEventListener('pointercancel', endDrag);
    graphCanvas.addEventListener('pointerleave', () => { state.hoveredId = null; });

    graphCanvas.addEventListener('click', event => {
      if (state.dragMoved) return;
      const point = pointFromEvent(event);
      const node = nodeAt(point.x, point.y);
      if (node) updateGraphPanel(node.id);
    });

    graphCanvas.addEventListener('wheel', event => {
      event.preventDefault();
      const point = pointFromEvent(event);
      const factor = event.deltaY < 0 ? 1.12 : 0.89;
      setZoom(state.view.scale * factor, point);
    }, { passive: false });

    graphCanvas.addEventListener('keydown', event => {
      let handled = true;
      if (event.key === '+' || event.key === '=') setZoom(state.view.scale * 1.18);
      else if (event.key === '-' || event.key === '_') setZoom(state.view.scale * 0.85);
      else if (event.key === '0') resetGraphView();
      else if (event.key === 'ArrowLeft') state.view.x += 28;
      else if (event.key === 'ArrowRight') state.view.x -= 28;
      else if (event.key === 'ArrowUp') state.view.y += 28;
      else if (event.key === 'ArrowDown') state.view.y -= 28;
      else handled = false;
      if (handled) event.preventDefault();
    });

    graphCanvas.addEventListener('dblclick', () => {
      resetGraphView();
      toast('图谱视角已复位');
    });

    $$('[data-graph-zoom]').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.graphZoom;
        if (action === 'in') setZoom(state.view.scale * 1.18);
        else if (action === 'out') setZoom(state.view.scale * 0.85);
        else {
          resetGraphView();
          toast('图谱视角已复位');
        }
      });
    });

    if (graphFilter) {
      $$('button', graphFilter).forEach(button => {
        button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
      });
      graphFilter.addEventListener('click', event => {
        const button = event.target.closest('button[data-type]');
        if (!button) return;
        graphFilterType = button.dataset.type;
        $$('button', graphFilter).forEach(item => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
      });
    }

    if (graphChips) {
      graphChips.addEventListener('click', event => {
        const button = event.target.closest('[data-graph-id]');
        if (button) updateGraphPanel(button.dataset.graphId);
      });
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(graphCanvas);
    updateGraphPanel('piying');
    updateZoomLabel();
    loop();
  }

  initGraph();

  /* =======================================================
     12. Sound museum
     ======================================================= */

  const tracks = [
    {
      id: 'kunqu', no: '01', title: '牡丹亭 · 游园', sub: '昆曲 · 江苏昆山',
      meta: '曲笛与水磨腔', base: 293.66, beat: 640, wave: 'triangle', label: '唱词 / 题解',
      pattern: [0, 2, 5, 7, 9, 12, 9, 7, 5, 2, 0, -3, 0, 2, 5, 7],
      original: '原来姹紫嫣红开遍，似这般都付与断井颓垣。良辰美景奈何天，赏心乐事谁家院。',
      translation: 'The garden blooms in crimson and purple, yet all is left to broken wells and crumbling walls. What can be done with such fine hours and fair scenes? In whose courtyard are such joys to be found?',
      note: '《牡丹亭·惊梦》【皂罗袍】。水磨腔以“冷板曲”著称，字头、字腹、字尾交代清楚，一唱三叹；曲笛的气口与演员的换气必须严丝合缝。'
    },
    {
      id: 'guqin', no: '02', title: '流水', sub: '古琴 · 中国',
      meta: '七弦十三徽', base: 196.00, beat: 900, wave: 'sine', label: '题解',
      pattern: [0, 7, 5, 3, 0, -5, -3, 0, 7, 12, 9, 7, 5, 3, 0, -5],
      original: '《流水》以泛音起笔，写山泉初出；继以滚拂，状江河奔涌；末段收于静水，余音如远山回响。',
      translation: 'Flowing Water begins with harmonics, like a spring emerging from stone. Rolling tremolos gather into a rushing river, before the music settles into still water and a resonance like distant mountains.',
      note: '琴曲以“声少韵多”为贵。右手取音，左手吟猱，音与音之间的空白同样是音乐；不同琴家的《流水》可以有完全不同的气象。'
    },
    {
      id: 'dong', no: '03', title: '蝉之歌', sub: '侗族大歌 · 贵州黎平',
      meta: '多声部 · 无指挥 · 无伴奏', base: 261.63, beat: 480, wave: 'triangle', label: '唱词（意译）',
      pattern: [0, 4, 7, 11, 9, 7, 4, 2, 0, 4, 9, 11, 14, 11, 9, 7],
      original: '蝉儿在枫树上歌唱，歌声落进稻田；姑娘们沿着河岸走来，银饰叮当，像月光落在水上。',
      translation: 'The cicada sings in the maple tree, its song falling into the rice fields. The young women walk along the river, silver ornaments ringing like moonlight on water.',
      note: '此处汉译为意境转写，用于呈现大歌“以自然入歌”的美学。真正的大歌以侗语演唱，高音声部进入的时机由歌队长期磨合形成。'
    },
    {
      id: 'longsong', no: '04', title: '辽阔的草原', sub: '蒙古族长调 · 内蒙古',
      meta: '诺古拉 · 自由节拍', base: 220.00, beat: 1020, wave: 'sine', label: '题解',
      pattern: [0, 5, 7, 12, 10, 7, 5, 3, 0, 7, 12, 17, 12, 7, 5, 0],
      original: '长调没有固定的尺子。一个音可以拖得很长，长到听见风从草尖上走过去；诺古拉装饰音像马群远远地起伏。',
      translation: 'The long song has no fixed ruler. A single note can stretch until you hear the wind pass over the grass; the nokhola ornaments rise and fall like horses in the distance.',
      note: '长调与草原生活紧密相连，节拍自由，气息悠长。听的时候可以留意：歌者如何在长音里换气，又如何用细小的装饰音把空间撑开。'
    },
    {
      id: 'pingtan', no: '05', title: '玉蜻蜓 · 选段', sub: '苏州评弹 · 江苏苏州',
      meta: '三弦与琵琶 · 吴语', base: 329.63, beat: 430, wave: 'triangle', label: '题解',
      pattern: [0, 2, 4, 7, 9, 7, 4, 2, 0, -3, 0, 4, 7, 9, 4, 2],
      original: '《玉蜻蜓》是苏州弹词传统长篇，以明代故事为骨，以吴侬软语为肉；一桌二椅，说噱弹唱，把人情世故慢慢说给你听。',
      translation: 'The Jade Dragonfly is a classic Suzhou tanci. A Ming-dynasty story is carried by the soft Wu dialect; with one table and two chairs, the performers weave narrative, humor, song and strings.',
      note: '评弹的“噱”是活的：同样的书，在不同书场、不同听众面前会长出不同的枝节。三弦与琵琶不是简单伴奏，而是与说唱相互托衬。'
    }
  ];

  const trackList = $('#trackList');
  const soundPlay = $('#soundPlay');
  const soundDisc = $('#soundDisc');
  const soundCanvas = $('#soundCanvas');
  const soundTitle = $('#soundTitle');
  const soundMeta = $('#soundMeta');
  const soundKicker = $('#soundKicker');
  const soundBar = $('#soundBar');
  const soundElapsed = $('#soundElapsed');
  const soundMute = $('#soundMute');
  const soundVolume = $('#soundVolume');
  const soundVolumeValue = $('#soundVolumeValue');
  const transcriptText = $('#transcriptText');
  const transcriptNote = $('#transcriptNote');

  const audioState = {
    ctx: null,
    master: null,
    analyser: null,
    delay: null,
    timer: null,
    progressTimer: null,
    playing: false,
    index: 0,
    step: 0,
    startedAt: 0,
    volume: 0.55,
    muted: false
  };

  try {
    const savedVolumeRaw = localStorage.getItem('yizhen-volume');
    const savedVolume = savedVolumeRaw === null ? NaN : Number(savedVolumeRaw);
    if (Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 100) {
      audioState.volume = savedVolume / 100;
    }
  } catch {
    // ignore storage errors
  }

  function effectiveVolume() {
    return audioState.muted ? 0 : audioState.volume * 0.24;
  }

  function syncVolumeUI() {
    if (soundVolume) soundVolume.value = String(Math.round(audioState.volume * 100));
    if (soundVolumeValue) soundVolumeValue.textContent = String(Math.round(audioState.volume * 100));
    if (soundMute) {
      soundMute.setAttribute('aria-pressed', String(audioState.muted));
      soundMute.setAttribute('aria-label', audioState.muted ? '取消静音' : '静音');
    }
    if (audioState.master && audioState.ctx) {
      audioState.master.gain.setTargetAtTime(effectiveVolume(), audioState.ctx.currentTime, 0.03);
    }
  }

  function persistVolume() {
    try {
      localStorage.setItem('yizhen-volume', String(Math.round(audioState.volume * 100)));
    } catch {
      // optional
    }
  }

  let visualizerCtx = null;
  let visualizerData = null;
  let visualizerSize = 0;
  let soundVisible = true;

  function renderTrackList() {
    if (!trackList) return;
    trackList.innerHTML = tracks.map((track, index) => `
      <button type="button" class="track-row" data-track-index="${index}" aria-pressed="false">
        <span class="track-no">${track.no}</span>
        <span class="track-main"><b>${escapeHTML(track.title)}</b><span>${escapeHTML(track.sub)}</span></span>
        <span class="track-side">
          <em>LOOP</em>
          <span class="track-play-ic" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none"><path d="M5 3.5 12 8l-7 4.5Z" fill="currentColor"/></svg>
          </span>
        </span>
      </button>`).join('');
  }

  function setTranscript(track) {
    if (!transcriptText || !transcriptNote) return;
    const activeTab = $('.transcript-tabs button[aria-selected="true"]')?.dataset.ttab || 'original';
    transcriptText.textContent = activeTab === 'translation'
      ? track.translation
      : activeTab === 'note'
        ? track.note
        : track.original;
    transcriptNote.textContent = track.note;
    const firstTab = $('.transcript-tabs button[data-ttab="original"]');
    if (firstTab) {
      $$('.transcript-tabs button').forEach(button => button.setAttribute('aria-selected', String(button === firstTab)));
    }
    const label = $('.transcript-tabs button[data-ttab="original"]');
    if (label) label.textContent = track.label || '唱词 / 题解';
  }

  function updateSoundUI(index, playing) {
    const track = tracks[index];
    if (!track) return;
    if (soundTitle) soundTitle.textContent = track.title;
    if (soundMeta) soundMeta.textContent = track.meta;
    if (soundKicker) soundKicker.textContent = `NOW PLAYING · ${track.no} / ${playing ? 'PLAYING' : 'PAUSED'}`;
    if (soundPlay) {
      soundPlay.classList.toggle('is-playing', playing);
      soundPlay.setAttribute('aria-pressed', String(playing));
    }
    soundDisc?.classList.toggle('is-playing', playing);
    $$('.track-row', trackList).forEach(row => {
      const active = Number(row.dataset.trackIndex) === index;
      row.classList.toggle('is-active', active);
      row.setAttribute('aria-pressed', String(active && playing));
    });
    setTranscript(track);
  }

  function startAudio(index) {
    const track = tracks[index];
    if (!track) return;
    stopAudio(false);

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      toast('当前浏览器不支持 Web Audio');
      return;
    }

    const ctx = new AudioContextClass();
    const master = ctx.createGain();
    master.gain.value = effectiveVolume();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2200;
    const delay = ctx.createDelay(0.8);
    delay.delayTime.value = 0.28;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    const wet = ctx.createGain();
    wet.gain.value = 0.25;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;

    master.connect(filter);
    filter.connect(analyser);
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(analyser);
    analyser.connect(ctx.destination);

    audioState.ctx = ctx;
    audioState.master = master;
    audioState.analyser = analyser;
    audioState.delay = delay;
    audioState.playing = true;
    audioState.index = index;
    audioState.step = 0;
    audioState.startedAt = performance.now();

    if (ctx.state === 'suspended') ctx.resume();

    const playNote = (frequency, time, duration, gain, type) => {
      if (!audioState.ctx) return;
      const oscillator = ctx.createOscillator();
      const envelope = ctx.createGain();
      oscillator.type = type || track.wave;
      oscillator.frequency.setValueAtTime(frequency, time);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.997, time + duration);
      envelope.gain.setValueAtTime(0.0001, time);
      envelope.gain.exponentialRampToValueAtTime(gain, time + 0.03);
      envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(time);
      oscillator.stop(time + duration + 0.05);
    };

    const step = () => {
      if (!audioState.ctx) return;
      const time = audioState.ctx.currentTime + 0.06;
      const stepIndex = audioState.step;
      const semitone = track.pattern[stepIndex % track.pattern.length];
      const frequency = track.base * Math.pow(2, semitone / 12);
      playNote(frequency, time, (track.beat / 1000) * 1.55, 0.16);
      if (stepIndex % 4 === 0) {
        playNote(track.base / 2, time, (track.beat / 1000) * 3.2, 0.09, 'sine');
      }
      if (track.id === 'dong' && stepIndex % 4 === 2) {
        playNote(frequency * 1.5, time + 0.04, (track.beat / 1000) * 1.3, 0.055, 'sine');
      }
      if (track.id === 'longsong' && stepIndex % 8 === 0) {
        playNote(frequency * 2, time + 0.12, (track.beat / 1000) * 2.8, 0.04, 'sine');
      }
      audioState.step += 1;
    };

    step();
    audioState.timer = setInterval(step, track.beat);
    audioState.progressTimer = setInterval(() => {
      const elapsed = ((performance.now() - audioState.startedAt) / 1000) % 32;
      if (soundBar) soundBar.style.width = `${(elapsed / 32) * 100}%`;
      if (soundElapsed) soundElapsed.textContent = formatDuration(elapsed);
    }, 200);

    updateSoundUI(index, true);
    drawVisualizer();
  }

  function stopAudio(updateUI = true) {
    if (audioState.timer) clearInterval(audioState.timer);
    if (audioState.progressTimer) clearInterval(audioState.progressTimer);
    audioState.timer = null;
    audioState.progressTimer = null;
    audioState.playing = false;
    if (audioState.ctx) {
      audioState.ctx.close().catch(() => {});
      audioState.ctx = null;
      audioState.master = null;
      audioState.analyser = null;
      audioState.delay = null;
    }
    if (soundBar) soundBar.style.width = '0%';
    if (soundElapsed) soundElapsed.textContent = '00:00';
    if (updateUI) updateSoundUI(audioState.index, false);
    if (visualizerCtx) drawVisualizer();
  }

  function formatDuration(seconds) {
    const total = Math.floor(seconds);
    return `00:${String(total).padStart(2, '0')}`;
  }

  function setupVisualizer() {
    if (!soundCanvas) return;
    visualizerCtx = soundCanvas.getContext('2d');
    const resize = () => {
      const rect = soundCanvas.getBoundingClientRect();
      if (!rect.width) return;
      visualizerSize = rect.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      soundCanvas.width = Math.round(rect.width * dpr);
      soundCanvas.height = Math.round(rect.height * dpr);
      visualizerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!audioState.playing) drawVisualizer();
    };
    new ResizeObserver(resize).observe(soundCanvas);
    resize();
  }

  function drawVisualizer() {
    if (!visualizerCtx || !visualizerSize) return;
    const ctx = visualizerCtx;
    const size = visualizerSize;
    const cx = size / 2;
    const cy = size / 2;
    const bars = 72;
    const radius = size * 0.34;
    ctx.clearRect(0, 0, size, size);

    let data = null;
    if (audioState.analyser) {
      if (!visualizerData || visualizerData.length !== audioState.analyser.frequencyBinCount) {
        visualizerData = new Uint8Array(audioState.analyser.frequencyBinCount);
      }
      audioState.analyser.getByteFrequencyData(visualizerData);
      data = visualizerData;
    }

    for (let i = 0; i < bars; i++) {
      const angle = (Math.PI * 2 * i) / bars - Math.PI / 2;
      let value = 0.08;
      if (data) {
        const bin = Math.floor((i / bars) * data.length * 0.72);
        value = 0.08 + (data[bin] / 255) * 0.9;
      } else {
        value = 0.1 + Math.abs(Math.sin(i * 0.55)) * 0.06;
      }
      const inner = radius + 6;
      const outer = radius + 6 + value * size * 0.12;
      const x1 = cx + Math.cos(angle) * inner;
      const y1 = cy + Math.sin(angle) * inner;
      const x2 = cx + Math.cos(angle) * outer;
      const y2 = cy + Math.sin(angle) * outer;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = i % 9 === 0 ? 'rgba(209,90,66,.7)' : 'rgba(143,201,179,.62)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    if (!data) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(143,201,179,.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function animateVisualizer() {
    if (audioState.playing && soundVisible) drawVisualizer();
    requestAnimationFrame(animateVisualizer);
  }

  if (soundCanvas && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      soundVisible = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0.01 }).observe(soundCanvas);
  }

  renderTrackList();
  setupVisualizer();
  updateSoundUI(0, false);
  syncVolumeUI();
  animateVisualizer();

  soundVolume?.addEventListener('input', () => {
    audioState.volume = clamp(Number(soundVolume.value) / 100, 0, 1);
    if (audioState.muted && audioState.volume > 0) audioState.muted = false;
    syncVolumeUI();
    persistVolume();
  });

  soundMute?.addEventListener('click', () => {
    audioState.muted = !audioState.muted;
    syncVolumeUI();
    toast(audioState.muted ? '已静音' : '已恢复声音');
  });

  if (trackList) {
    trackList.addEventListener('click', event => {
      const row = event.target.closest('[data-track-index]');
      if (!row) return;
      const index = Number(row.dataset.trackIndex);
      if (audioState.playing && audioState.index === index) {
        stopAudio(true);
        toast('已暂停 · 演示音频为实时合成');
      } else {
        startAudio(index);
        toast(`正在聆听：${tracks[index].title}`);
      }
    });
  }

  soundPlay?.addEventListener('click', () => {
    if (audioState.playing) {
      stopAudio(true);
      toast('已暂停 · 演示音频为实时合成');
    } else {
      startAudio(audioState.index);
      toast(`正在聆听：${tracks[audioState.index].title}`);
    }
  });

  $$('.transcript-tabs button').forEach(button => {
    button.addEventListener('click', () => {
      $$('.transcript-tabs button').forEach(item => item.setAttribute('aria-selected', String(item === button)));
      const track = tracks[audioState.index] || tracks[0];
      if (!transcriptText || !transcriptNote) return;
      if (button.dataset.ttab === 'translation') transcriptText.textContent = track.translation;
      else if (button.dataset.ttab === 'note') transcriptText.textContent = track.note;
      else transcriptText.textContent = track.original;
      transcriptNote.textContent = track.note;
    });
  });

  $('.transcript-tabs')?.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const tabs = $$('.transcript-tabs button');
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    event.preventDefault();
    const next = event.key === 'ArrowRight'
      ? (current + 1) % tabs.length
      : (current - 1 + tabs.length) % tabs.length;
    tabs[next].focus();
    tabs[next].click();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioState.playing) stopAudio(true);
  });

  /* =======================================================
     13. Community form
     ======================================================= */

  const clueForm = $('#clueForm');
  const formSuccess = $('#formSuccess');
  const formAgain = $('#formAgain');
  const formSuccessText = $('#formSuccessText');
  const draftStatus = $('#draftStatus');
  const messageCount = $('#messageCount');
  const DRAFT_KEY = 'yizhen-draft';
  let draftTimer = null;

  function errorFor(key) {
    return document.querySelector(`[data-error-for="${key}"]`);
  }

  function setFieldError(key, message) {
    const error = errorFor(key);
    if (error) error.textContent = message || '';
    const input = key === 'name' ? $('#clueName') : key === 'contact' ? $('#clueContact') : key === 'message' ? $('#clueMessage') : key === 'consent' ? $('#clueConsent') : null;
    if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function clearErrors() {
    ['name', 'contact', 'message', 'consent'].forEach(key => setFieldError(key, ''));
  }

  function validContact(value) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phone = /^[+\d][\d\s()-]{5,}$/;
    return email.test(value) || phone.test(value);
  }

  function updateMessageCount() {
    const message = $('#clueMessage');
    if (messageCount && message) messageCount.textContent = String(message.value.length);
  }

  function saveDraft() {
    if (!clueForm) return;
    const draft = {
      type: $('input[name="type"]:checked', clueForm)?.value || '线索',
      name: $('#clueName')?.value || '',
      contact: $('#clueContact')?.value || '',
      message: $('#clueMessage')?.value || '',
      consent: Boolean($('#clueConsent')?.checked),
      savedAt: Date.now()
    };
    try {
      if (draft.name || draft.contact || draft.message) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      else localStorage.removeItem(DRAFT_KEY);
    } catch {
      // optional
    }
    if (draftStatus) {
      draftStatus.hidden = false;
      draftStatus.textContent = '草稿已自动保存到本机';
    }
  }

  function scheduleDraftSave() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 380);
  }

  function restoreDraft() {
    if (!clueForm) return;
    let draft = null;
    try {
      draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    } catch {
      draft = null;
    }
    if (!draft || (!draft.name && !draft.contact && !draft.message)) return;
    const name = $('#clueName');
    const contact = $('#clueContact');
    const message = $('#clueMessage');
    const consent = $('#clueConsent');
    if (name) name.value = draft.name || '';
    if (contact) contact.value = draft.contact || '';
    if (message) message.value = draft.message || '';
    if (consent) consent.checked = Boolean(draft.consent);
    const type = $(`input[name="type"][value="${draft.type || '线索'}"]`, clueForm);
    if (type) type.checked = true;
    updateMessageCount();
    if (draftStatus) {
      draftStatus.hidden = false;
      draftStatus.textContent = '已恢复上次未提交的草稿';
    }
  }

  if (clueForm) {
    restoreDraft();

    ['input', 'change'].forEach(eventName => {
      clueForm.addEventListener(eventName, event => {
        const target = event.target;
        if (target.id === 'clueName') setFieldError('name', '');
        if (target.id === 'clueContact') setFieldError('contact', '');
        if (target.id === 'clueMessage') {
          setFieldError('message', '');
          updateMessageCount();
        }
        if (target.id === 'clueConsent') setFieldError('consent', '');
        scheduleDraftSave();
      });
    });

    clueForm.addEventListener('submit', event => {
      event.preventDefault();
      clearErrors();
      const name = $('#clueName');
      const contact = $('#clueContact');
      const message = $('#clueMessage');
      const consent = $('#clueConsent');
      let firstInvalid = null;
      let valid = true;

      if (!name.value.trim()) {
        setFieldError('name', '请留下您的称呼');
        firstInvalid = firstInvalid || name;
        valid = false;
      } else if (name.value.trim().length < 2) {
        setFieldError('name', '至少写下 2 个字符');
        firstInvalid = firstInvalid || name;
        valid = false;
      }

      if (!contact.value.trim()) {
        setFieldError('contact', '请留下手机或邮箱');
        firstInvalid = firstInvalid || contact;
        valid = false;
      } else if (!validContact(contact.value.trim())) {
        setFieldError('contact', '这个联系方式看起来不太完整');
        firstInvalid = firstInvalid || contact;
        valid = false;
      }

      if (!message.value.trim()) {
        setFieldError('message', '请写下想告诉我们的内容');
        firstInvalid = firstInvalid || message;
        valid = false;
      } else if (message.value.trim().length < 8) {
        setFieldError('message', '再多写一点吧，至少 8 个字');
        firstInvalid = firstInvalid || message;
        valid = false;
      }

      if (!consent.checked) {
        setFieldError('consent', '请先同意信息使用说明');
        firstInvalid = firstInvalid || consent;
        valid = false;
      }

      if (!valid) {
        firstInvalid?.focus();
        toast('请检查标红的字段');
        return;
      }

      clearTimeout(draftTimer);
      draftTimer = null;
      const type = $('input[name="type"]:checked', clueForm)?.value || '线索';
      const typeLabels = { 线索: '非遗线索', 研学: '研学预约', 合作: '合作共建' };
      const record = {
        type,
        name: name.value.trim(),
        contact: contact.value.trim(),
        message: message.value.trim(),
        createdAt: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('yizhen-clues') || '[]');
        existing.unshift(record);
        localStorage.setItem('yizhen-clues', JSON.stringify(existing.slice(0, 30)));
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // local storage is optional; the demo still succeeds
      }

      clueForm.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
      if (formSuccessText) {
        formSuccessText.textContent = `已收到「${typeLabels[type] || type}」。感谢 ${record.name} 的讲述，正式版本中档案组会在 7 个工作日内完成初步核校并与你联系。`;
      }
      if (draftStatus) draftStatus.hidden = true;
      toast('已收入案头 · 感谢你的讲述');
    });
  }

  formAgain?.addEventListener('click', () => {
    clearTimeout(draftTimer);
    draftTimer = null;
    clueForm?.reset();
    clearErrors();
    updateMessageCount();
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
    if (draftStatus) draftStatus.hidden = true;
    if (clueForm) clueForm.hidden = false;
    if (formSuccess) formSuccess.hidden = true;
    $('#clueName')?.focus();
  });

  /* =======================================================
     14. Loader
     ======================================================= */

  const initialProjectId = projectFromHash();
  if (initialProjectId && projectIndex.has(initialProjectId)) {
    setTimeout(() => openProject(initialProjectId, { push: false }), 260);
  }

  const loader = $('#loader');
  function hideLoader() {
    if (!loader || loader.classList.contains('is-done')) return;
    setTimeout(() => {
      loader.classList.add('is-done');
      loader.setAttribute('aria-hidden', 'true');
    }, 420);
  }

  if (document.readyState === 'complete') hideLoader();
  else window.addEventListener('load', hideLoader);

  // Defensive fallback: never leave the page behind the loader.
  setTimeout(hideLoader, 2600);

})();
