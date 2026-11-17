# Japanese (`ja-jp`) guide

Read this before translating or editing any Japanese copy. It adapts the brand voice in `AGENTS.md` to Japanese and keeps terms consistent across pages.

## Who we are writing for

Safety and health managers (安全衛生担当者), site managers (現場監督, 所長), plant managers, and IT teams at Japanese general contractors, manufacturers, logistics operators and infrastructure owners. Many buy through system integrators or partners. They read carefully, expect precise claims, and look for reference customers. Obayashi (大林組) is on the customer logo wall.

## Tone

- Use です/ます throughout. Address the reader's company as 貴社 (the written form). Do not use 御社, which is spoken.
- Keep sentences short and concrete, like the English. One idea per sentence.
- Lead with the reader's problem or result, then the feature.
- Prefer established Japanese safety vocabulary over katakana loanwords when both exist (ヒヤリハット, 不安全行動, 立入禁止エリア). Keep a loanword when it is the term buyers use (ダッシュボード, アラート, オンプレミス).
- Do not translate negative contrasts such as "not after the accident report" literally. State the positive outcome (まだ手を打てるうちに通知します).
- No em dashes. Use 、。： and full-width parentheses （）.
- CTA labels are actions: デモを申し込む, すべてのユースケースを見る, お問い合わせ.
- Mark a link to an English-only page with （英語） when the visitor would not expect English, such as the announcement bar.

## Typography and formatting

- Half-width digits and Latin letters: 2週間, 400件, ISO/IEC 27001, RTSP.
- No space between Japanese and Latin text: Ailyticsは, AI映像解析.
- Ranges use 〜: 85〜99%. Keep the English figure exactly; never round or restate a claim.
- Metric units keep the English spacing used in the product: 1.8 m, 3.4 m. Durations are Japanese: 30秒, 5分, 2時間15分.
- Camera labels keep the `Cam 01` form; translate the location after the dot (Cam 03 · 第2工場).
- Template placeholders such as `{metres}` and `{seconds}` must stay exactly as written.
- Line breaks: the site sets `word-break: auto-phrase` for Japanese. Do not insert manual breaks or spaces to control wrapping.

## Glossary

| English                        | Japanese                          | Notes                                          |
| ------------------------------ | --------------------------------- | ---------------------------------------------- |
| AI video analytics             | AI映像解析                        | Primary category term                          |
| video monitoring               | 映像監視                          |                                                |
| CCTV, existing cameras         | 監視カメラ, お手持ちのカメラ      | Prefer お手持ちのカメラ in benefit copy        |
| PPE                            | 保護具（PPE）                     | Spell out on first use per page, then 保護具   |
| hard hat / vest / gloves       | ヘルメット / 安全ベスト / 手袋    |                                                |
| exclusion zone, no-access zone | 立入禁止エリア                    |                                                |
| restricted area                | 立入禁止エリア                    |                                                |
| near miss                      | ヒヤリハット                      |                                                |
| unsafe behaviour               | 不安全行動                        | Common Japanese framing for detection products |
| struck-by risk                 | 重機との接触リスク                |                                                |
| machinery proximity            | 重機への接近                      |                                                |
| excavator                      | 油圧ショベル                      | ショベル in short tags                         |
| piling rig                     | 杭打ち機                          |                                                |
| suspended load                 | 吊り荷                            |                                                |
| drop zone                      | 落下想定範囲                      |                                                |
| lifting supervisor             | 揚重作業の責任者                  |                                                |
| open edge                      | 開口部・端部                      |                                                |
| fall                           | 墜落                              | 墜落・転落 for fall-from-height topics         |
| grace period                   | 猶予時間                          |                                                |
| alert cooldown                 | 再通知の間隔                      |                                                |
| false alert                    | 誤報                              |                                                |
| site supervisor                | 現場監督                          |                                                |
| EHS team / manager             | 安全衛生担当者 / 安全衛生の管理者 | Avoid the bare acronym EHS                     |
| compliance report              | コンプライアンスレポート          |                                                |
| non-compliance (as a metric)   | 安全ルール違反                    | 不適合 for a single finding in the product UI  |
| rectification                  | 是正措置                          |                                                |
| vision language model          | 視覚言語モデル（VLM）             |                                                |
| video management system        | 映像管理システム（VMS）           |                                                |
| edge / on-premise / cloud      | エッジ / オンプレミス / クラウド  |                                                |
| use case                       | ユースケース                      |                                                |
| request a demo                 | デモを申し込む                    |                                                |
| construction / manufacturing   | 建設業 / 製造業                   | Industry names                                 |
| logistics and warehousing      | 物流・倉庫                        |                                                |
| contractor safety              | 協力会社の安全                    |                                                |

## Keyword map

Choose the primary keyword before writing each page, per the on-page SEO rules in `AGENTS.md`. Japanese search titles show about 30 full-width characters, including ` | Ailytics`, so aim for 20 to 28 characters before the suffix. Descriptions show about 80 to 120 full-width characters.

| Page                                           | Primary keyword       | Supporting terms                                  |
| ---------------------------------------------- | --------------------- | ------------------------------------------------- |
| `/ja-jp` (homepage)                            | AI映像解析            | 建設現場 安全管理, 不安全行動 検知, 監視カメラ AI |
| `/ja-jp/use-cases/ppe-detection`               | 保護具 着用 検知      | ヘルメット 未着用 AI, 安全帯                      |
| `/ja-jp/use-cases/pedestrian-detection-system` | 重機 接近 検知        | 人 検知 カメラ, 接触事故 防止                     |
| `/ja-jp/use-cases/suspended-load-safety`       | 吊り荷 立入 検知      | クレーン 吊り荷 下, 揚重 安全                     |
| `/ja-jp/use-cases/open-edge-detection`         | 開口部 墜落 防止      | 端部 接近 検知                                    |
| `/ja-jp/industries/construction`               | 建設現場 AIカメラ     | 労働安全衛生法, ヒヤリハット                      |
| `/ja-jp/industries/manufacturing`              | 工場 安全管理 AI      | フォークリフト 接近 検知                          |
| `/ja-jp/contact`                               | Ailytics お問い合わせ | デモ 申し込み                                     |

These terms come from Japanese vendor and contractor pages, not search-volume data. Validate them with a Japanese keyword tool before writing tier 1 pages.

## Open questions for the client

- Safie sells a co-branded "Ailytics(SF)" product in Japan. Confirm whether Japanese pages should mention it, link to Safie, or route leads differently.
- Who reviews translations? Every page stays `machine` in `src/config/translations.json` until a native speaker signs it off with `pnpm i18n --stamp <id> --reviewed`.
- Which team answers Japanese contact requests, and in which language?
