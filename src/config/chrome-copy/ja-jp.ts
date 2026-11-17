import type { ChromeCopy } from "./en";

/** Japanese shared copy. Follow docs/localisation/ja-jp.md. */
export const jaJp: ChromeCopy = {
  skipLink: "本文へスキップ",
  homeLabel: "Ailytics ホーム",
  primaryNavLabel: "メインナビゲーション",
  footerNavLabel: "フッターナビゲーション",
  mobileNav: {
    open: "メニューを開く",
    close: "メニューを閉じる",
    dialog: "サイトナビゲーション",
    nav: "モバイルナビゲーション",
  },
  showGroup: "{label}を表示",
  primaryAction: "デモを申し込む",
  nav: {
    groups: {
      Company: { label: "会社情報" },
      "Use cases": {
        label: "ユースケース",
        footer: "すべてのユースケースを見る",
      },
      Industries: { label: "業界別", footer: "すべての業界を見る" },
    },
    links: {
      "/about-us": { label: "会社概要", description: "Ailyticsのチーム" },
      "/partnerships": {
        label: "パートナー募集",
        description: "販売・連携・共同開発のパートナー",
      },
      "/careers": { label: "採用情報", description: "Ailyticsで働く" },
      "/blog?category=news": {
        label: "ニュース",
        description: "資金調達、受賞、お知らせ",
      },
      "/use-cases/ppe-detection": {
        label: "保護具（PPE）検知",
        description: "ヘルメット、安全ベスト、手袋の未着用",
      },
      "/use-cases/pedestrian-detection-system": {
        label: "歩行者検知",
        description: "稼働中の重機に近づきすぎた作業員",
      },
      "/use-cases/suspended-load-safety": {
        label: "吊り荷の安全管理",
        description: "クレーンの吊り荷の下に入った作業員",
      },
      "/use-cases/open-edge-detection": {
        label: "開口部・端部の検知",
        description: "手すりのない端部に近づく作業員",
      },
      "/industries/construction": {
        label: "建設業",
        description: "重機、開口部、保護具の未着用",
      },
      "/industries/manufacturing": {
        label: "製造業",
        description: "工場内のフォークリフト、保護具、荷役作業",
      },
      "/industries/logistics-and-warehousing": {
        label: "物流・倉庫",
        description: "フォークリフトのヒヤリハットと作業姿勢のリスク",
      },
      "/industries/oil-and-gas": {
        label: "石油・ガス",
        description: "煙・火災、保護具、立入禁止エリア",
      },
      "/industries/maritime": {
        label: "海事・港湾",
        description: "岸壁、車両、吊り荷",
      },
      "/industries/airports": {
        label: "空港",
        description: "車両、立入禁止エリア、放置物",
      },
      "/industries/data-centers": {
        label: "データセンター",
        description: "立入禁止エリア、不審な滞留、煙",
      },
      "/blog": { label: "ブログ" },
    },
  },
  description:
    "Ailyticsは、お手持ちの監視カメラにAI映像解析を追加し、建設現場、工場、港湾、ヤードの安全・セキュリティ・生産性のリスクを検知します。",
  footerGroups: {
    company: "会社情報",
    product: "製品",
    contact: "お問い合わせ",
  },
  footerLinks: {
    aboutUs: "会社概要",
    partnerships: "パートナー募集",
    careers: "採用情報",
    news: "ニュース",
    useCases: "ユースケース",
    industries: "業界別",
    projects: "導入プロジェクト",
    blog: "ブログ",
    demo: "デモを申し込む",
    privacy: "プライバシーポリシー",
    eula: "利用許諾契約（EULA）",
  },
  rightsReserved: "All rights reserved.",
  socialLabel: "{profile}のAilytics",
  languageLabel: "言語",
  announcement: {
    short: "Ailytics、シリーズAで740万米ドルを調達",
    medium: "Ailytics、Tin Men Capital主導のシリーズAで740万米ドルを調達",
    long: "Ailytics、Tin Men Capital主導のシリーズAで募集額を上回る740万米ドルを調達。アジア太平洋、米国、湾岸地域へ事業を拡大します",
    ctaShort: "詳しく見る",
    ctaLong: "発表を読む（英語）",
  },
  proof: {
    title: "世界400件以上のプロジェクトで導入",
    customersLabel: "導入企業",
    stats: [
      { value: "60–80%", label: "安全ルール違反を削減" },
      {
        value: "50+",
        label: "設定できる安全・セキュリティ・生産性のユースケース",
      },
      { value: "2週間以内", label: "お手持ちのカメラで運用を開始" },
    ],
  },
  notFound: {
    title: "ページが見つかりません",
    heading: "お探しのページが見つかりませんでした",
    body: "リンクが古いか、ページが移動した可能性があります。トップページに戻るか、ユースケースや業界別のページをご覧ください。",
    action: "トップページに戻る",
  },
  error: {
    heading: "ページの表示中にエラーが発生しました",
    body: "もう一度お試しください。問題が続く場合は、トップページに戻るか、担当チームまでお問い合わせください。",
    action: "もう一度試す",
  },
};
