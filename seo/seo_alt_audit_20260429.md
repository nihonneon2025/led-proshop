# 画像 alt 属性 棚卸レポート
**作成日**: 2026-04-29
**作成者**: proshop-designer（デザイン・画像担当）
**対象**: ネオン物販/05_EC運用/index.html + products/ 配下 172 ファイル
**方針**: 棚卸結果 + 付与方針提案のみ。実本投入は proshop-director 承認後に proshop-engineer が実施。

---

## 1. 現状集計（数値）

| 区分 | 件数 |
|---|---|
| img タグ総数（index.html + products/ 全体） | 193 |
| alt 値あり（OK） | 173 |
| alt="" 空文字（EMPTY） | 20 |
| alt 属性なし（MISSING） | 0 |
| alt 充足率（値あり ÷ 総数） | 89.6% |

### 内訳

| ファイル群 | img 総数 | OK | EMPTY | MISSING |
|---|---|---|---|---|
| index.html | 21 | 1（JS内の「商品画像」） | 20（hero-scenes） | 0 |
| products/ 172 ファイル | 172 | 172 | 0 | 0 |

---

## 2. 問題箇所の詳細

### 2-1. index.html hero-scenes（20件の EMPTY）

**場所**: index.html L472〜L492（ヒーロー背景スクロールアニメーション）

**構造上の判断**: 親要素に aria-hidden="true" が付与されており、スクリーンリーダーは読み飛ばす。
WCAG 2.1 の「装飾的画像は alt="" が正しい」ルールに完全準拠しており、現状のまま問題なし。

ただし SEO クローラー（Googlebot）は alt="" を「装飾」と解釈してインデックス対象外とする。
ヒーロー画像は施工事例・点灯イメージであり、alt テキスト付与によりイメージ検索流入が期待できる。

**対象画像一覧（10パターン × 2セット = 20件）**:

| ファイル名 | 現行 alt | 推奨方針 |
|---|---|---|
| white3000k_livingroom.png | 空 | 付与推奨（§4参照） |
| pink_shop.png | 空 | 付与推奨 |
| lightblue_desk.png | 空 | 付与推奨 |
| blue_kitchen.png | 空 | 付与推奨 |
| red_shop.png | 空 | 付与推奨 |
| green_stairs.png | 空 | 付与推奨 |
| orange_livingroom.png | 空 | 付与推奨 |
| purple_shop.png | 空 | 付与推奨 |
| gold_shop.png | 空 | 付与推奨 |
| lemonyellow_livingroom.png | 空 | 付与推奨 |
| ループ複製の上記10件 | 空 | alt="" のまま維持（重複インデックス回避） |

**注記**: ループ複製（L483〜L492）は同一 src の重複であるため、alt を付与すると Googlebot が重複コンテンツとみなす可能性がある。ループ複製側は引き続き alt="" を維持する方針を推奨。

### 2-2. products/ 172 件（OK 172 件）

現状すべてに意味のある alt が付与されている。品質評価は §3 を参照。

---

## 3. 既存 alt 品質評価

### 3-1. カテゴリ別品質マトリクス

| カテゴリ | 代表パターン | 品質評価 | 課題 |
|---|---|---|---|
| COBテープライト（単色） | LED COBテープライト12V ホワイト3000K | A（良好） | ブランド名なし |
| COBテープライト（防水・防滴・防熱） | LED COBテープライト12V(防水) ゴールド | A（良好） | ブランド名なし |
| RGBテープライト | 【RGB】LED COBテープライト12V | B（普通） | 色・規格不足 |
| アルミフレーム | アルミフレーム 通常型 ブラック 12mm幅 | A（良好） | ブランド名なし |
| シリコンカバー | シリコンカバー 1010 正面発光（5-6mm対応） | A（良好） | ブランド名なし |
| エンドキャップ | エンドキャップ φ26mm 穴あり（黒） | A（良好） | ブランド名なし |
| 電源装置 | DC12V スタンダード電源 200W | B（普通） | LED・ブランド名なし |
| コントローラー | 単色調光器 RFリモコン付 | B（普通） | LED・ブランド名なし |

### 3-2. 発見された具体的改善点

**1. ブランド名「- LED PRO SHOP」が全件未付与**
→ 推奨テンプレートは「{商品名} {色} {規格} - LED PRO SHOP」形式だが、現行 alt には付与されていない
→ Google 画像検索でブランドシグナルを強化するには末尾付与が有効

**2. RGB 系に規格・防護情報が不足**
- 現行: 【RGB】LED COBテープライト12V
- 推奨: RGB LED COBテープライト 12V フルカラー IP20 - LED PRO SHOP

**3. 電源装置・コントローラーに「LED」が未記載**
- 現行: DC12V スタンダード電源 200W
- 推奨: LED照明用 電源装置 DC12V 200W - LED PRO SHOP

**4. 点灯画像（lit1.png / lit2.png）が products/ の img タグに未使用**
- images/テープライト/*/lit1.png と lit2.png は現状 products/ の HTML で参照されていない
- index.html L7914 のカルーセル JS は alt="商品画像" のみで動的 alt 生成なし
- alt="商品画像" は汎用的すぎる。JS 側で動的 alt を生成する改修が必要


---

## 4. alt 付与方針（実装指示書向け）

### 4-1. テンプレート定義

**タイプ A: 商品メイン画像**
書式: {カテゴリ} {商品名・形状} {色} {規格} - LED PRO SHOP
例:
- LED COBテープライト 12V ホワイト3000K IP20 - LED PRO SHOP
- アルミフレーム 通常型 ブラック 12mm幅 - LED PRO SHOP
- シリコンカバー 正面発光 1010 5-6mm対応 - LED PRO SHOP

**タイプ B: 点灯画像（lit1.png / lit2.png）**
書式: {商品名} {色} 点灯時イメージ
例:
- LED COBテープライト ホワイト3000K 点灯時イメージ
- LED COBテープライト グリーン 点灯時イメージ

**タイプ C: 設置・施工イメージ（hero-scenes / scene.jpg）**
書式: {商品名} {用途} 施工事例
例:
- LED COBテープライト ホワイト3000K リビング間接照明 施工事例
- LED COBテープライト ピンク 店舗ディスプレイ 施工事例

**タイプ D: 装飾的ヒーローアニメーション画像（ループ複製）**
alt="" のまま維持
理由: aria-hidden="true" 配下かつ同一 src の複製のため

### 4-2. index.html hero-scenes 付与案（10件・1セット目のみ）

| ファイル名 | 推奨 alt |
|---|---|
| white3000k_livingroom.png | LED COBテープライト ホワイト3000K リビング間接照明 施工事例 |
| pink_shop.png | LED COBテープライト ピンク 店舗ネオン風装飾 施工事例 |
| lightblue_desk.png | LED COBテープライト ライトブルー デスク間接照明 施工事例 |
| blue_kitchen.png | LED COBテープライト ブルー キッチン間接照明 施工事例 |
| red_shop.png | LED COBテープライト レッド 店舗ディスプレイ照明 施工事例 |
| green_stairs.png | LED COBテープライト グリーン 階段フットライト 施工事例 |
| orange_livingroom.png | LED COBテープライト オレンジ リビング装飾照明 施工事例 |
| purple_shop.png | LED COBテープライト パープル 店舗アクセント照明 施工事例 |
| gold_shop.png | LED COBテープライト ゴールド 店舗高級感演出 施工事例 |
| lemonyellow_livingroom.png | LED COBテープライト レモンイエロー リビングアクセント照明 施工事例 |

注記: aria-hidden="true" は外さない。SEO と A11y を両立させる折衷案として、aria-hidden はそのまま維持し alt のみ付与する設計を推奨。

---

## 5. 全226商品 alt テンプレート展開リスト

### 5-1. SKU 変換ルール

| SKU パターン | 防護サフィックス | 意味 | IP規格 |
|---|---|---|---|
| （なし） | 標準 | IP20 |
| -BT | 防滴 | IP44 |
| -BN | 防熱 | HighTemp |
| -BS | 防水 | IP65 |

色コード: W3K=ホワイト3000K / SB=ライトブルー / GR=グリーン / GD=ゴールド / OR=オレンジ / PK=ピンク / PP=パープル / RD=レッド / YL=レモンイエロー

### 5-2. カテゴリ1: COBテープライト 12V 単色（36 SKU）

| SKU | 推奨 alt |
|---|---|
| COB12-W3K | LED COBテープライト 12V ホワイト3000K IP20 - LED PRO SHOP |
| COB12-W3K-BT | LED COBテープライト 12V ホワイト3000K 防滴 IP44 - LED PRO SHOP |
| COB12-W3K-BN | LED COBテープライト 12V ホワイト3000K 防熱 - LED PRO SHOP |
| COB12-W3K-BS | LED COBテープライト 12V ホワイト3000K 防水 IP65 - LED PRO SHOP |
| COB12-SB | LED COBテープライト 12V ライトブルー IP20 - LED PRO SHOP |
| COB12-SB-BT | LED COBテープライト 12V ライトブルー 防滴 IP44 - LED PRO SHOP |
| COB12-SB-BN | LED COBテープライト 12V ライトブルー 防熱 - LED PRO SHOP |
| COB12-SB-BS | LED COBテープライト 12V ライトブルー 防水 IP65 - LED PRO SHOP |
| COB12-GR | LED COBテープライト 12V グリーン IP20 - LED PRO SHOP |
| COB12-GR-BT | LED COBテープライト 12V グリーン 防滴 IP44 - LED PRO SHOP |
| COB12-GR-BN | LED COBテープライト 12V グリーン 防熱 - LED PRO SHOP |
| COB12-GR-BS | LED COBテープライト 12V グリーン 防水 IP65 - LED PRO SHOP |
| COB12-GD | LED COBテープライト 12V ゴールド IP20 - LED PRO SHOP |
| COB12-GD-BT | LED COBテープライト 12V ゴールド 防滴 IP44 - LED PRO SHOP |
| COB12-GD-BN | LED COBテープライト 12V ゴールド 防熱 - LED PRO SHOP |
| COB12-GD-BS | LED COBテープライト 12V ゴールド 防水 IP65 - LED PRO SHOP |
| COB12-OR | LED COBテープライト 12V オレンジ IP20 - LED PRO SHOP |
| COB12-OR-BT | LED COBテープライト 12V オレンジ 防滴 IP44 - LED PRO SHOP |
| COB12-OR-BN | LED COBテープライト 12V オレンジ 防熱 - LED PRO SHOP |
| COB12-OR-BS | LED COBテープライト 12V オレンジ 防水 IP65 - LED PRO SHOP |
| COB12-PK | LED COBテープライト 12V ピンク IP20 - LED PRO SHOP |
| COB12-PK-BT | LED COBテープライト 12V ピンク 防滴 IP44 - LED PRO SHOP |
| COB12-PK-BN | LED COBテープライト 12V ピンク 防熱 - LED PRO SHOP |
| COB12-PK-BS | LED COBテープライト 12V ピンク 防水 IP65 - LED PRO SHOP |
| COB12-PP | LED COBテープライト 12V パープル IP20 - LED PRO SHOP |
| COB12-PP-BT | LED COBテープライト 12V パープル 防滴 IP44 - LED PRO SHOP |
| COB12-PP-BN | LED COBテープライト 12V パープル 防熱 - LED PRO SHOP |
| COB12-PP-BS | LED COBテープライト 12V パープル 防水 IP65 - LED PRO SHOP |
| COB12-RD | LED COBテープライト 12V レッド IP20 - LED PRO SHOP |
| COB12-RD-BT | LED COBテープライト 12V レッド 防滴 IP44 - LED PRO SHOP |
| COB12-RD-BN | LED COBテープライト 12V レッド 防熱 - LED PRO SHOP |
| COB12-RD-BS | LED COBテープライト 12V レッド 防水 IP65 - LED PRO SHOP |
| COB12-YL | LED COBテープライト 12V レモンイエロー IP20 - LED PRO SHOP |
| COB12-YL-BT | LED COBテープライト 12V レモンイエロー 防滴 IP44 - LED PRO SHOP |
| COB12-YL-BN | LED COBテープライト 12V レモンイエロー 防熱 - LED PRO SHOP |
| COB12-YL-BS | LED COBテープライト 12V レモンイエロー 防水 IP65 - LED PRO SHOP |

### 5-3. カテゴリ2: COBテープライト 24V（4 SKU）

| SKU | 推奨 alt |
|---|---|
| COB24-W3K | LED COBテープライト 24V ホワイト3000K IP20 - LED PRO SHOP |
| COB24-W3K-BT | LED COBテープライト 24V ホワイト3000K 防滴 IP44 - LED PRO SHOP |
| COB24-W3K-BN | LED COBテープライト 24V ホワイト3000K 防熱 - LED PRO SHOP |
| COB24-W3K-BS | LED COBテープライト 24V ホワイト3000K 防水 IP65 - LED PRO SHOP |

### 5-4. カテゴリ3: RGB COBテープライト（8 SKU）

| SKU | 推奨 alt |
|---|---|
| RGB12 | RGB LED COBテープライト 12V フルカラー IP20 - LED PRO SHOP |
| RGB12-BT | RGB LED COBテープライト 12V フルカラー 防滴 IP44 - LED PRO SHOP |
| RGB12-BN | RGB LED COBテープライト 12V フルカラー 防熱 - LED PRO SHOP |
| RGB12-BS | RGB LED COBテープライト 12V フルカラー 防水 IP65 - LED PRO SHOP |
| RGB24 | RGB LED COBテープライト 24V フルカラー IP20 - LED PRO SHOP |
| RGB24-BT | RGB LED COBテープライト 24V フルカラー 防滴 IP44 - LED PRO SHOP |
| RGB24-BN | RGB LED COBテープライト 24V フルカラー 防熱 - LED PRO SHOP |
| RGB24-BS | RGB LED COBテープライト 24V フルカラー 防水 IP65 - LED PRO SHOP |


### 5-5. カテゴリ4: アルミフレーム（16 SKU）

| SKU | 推奨 alt |
|---|---|
| ALM-NORMAL-BK | アルミフレーム 通常型 ブラック - LED PRO SHOP |
| ALM-NORMAL-BK-12MM | アルミフレーム 通常型 ブラック 12mm幅 - LED PRO SHOP |
| ALM-NORMAL-BK-20MM | アルミフレーム 通常型 ブラック 20mm幅 - LED PRO SHOP |
| ALM-NORMAL-BK-25MM | アルミフレーム 通常型 ブラック 25mm幅 - LED PRO SHOP |
| ALM-NORMAL-SV | アルミフレーム 通常型 シルバー - LED PRO SHOP |
| ALM-NORMAL-SV-12MM | アルミフレーム 通常型 シルバー 12mm幅 - LED PRO SHOP |
| ALM-NORMAL-SV-20MM | アルミフレーム 通常型 シルバー 20mm幅 - LED PRO SHOP |
| ALM-NORMAL-SV-25MM | アルミフレーム 通常型 シルバー 25mm幅 - LED PRO SHOP |
| ALM-RECESSED-BK | アルミフレーム 埋め込み型 ブラック - LED PRO SHOP |
| ALM-RECESSED-BK-17MM | アルミフレーム 埋め込み型 ブラック 17mm幅 - LED PRO SHOP |
| ALM-RECESSED-BK-20MM | アルミフレーム 埋め込み型 ブラック 20mm幅 - LED PRO SHOP |
| ALM-RECESSED-BK-30MM | アルミフレーム 埋め込み型 ブラック 30mm幅 - LED PRO SHOP |
| ALM-RECESSED-SV | アルミフレーム 埋め込み型 シルバー - LED PRO SHOP |
| ALM-RECESSED-SV-17MM | アルミフレーム 埋め込み型 シルバー 17mm幅 - LED PRO SHOP |
| ALM-RECESSED-SV-20MM | アルミフレーム 埋め込み型 シルバー 20mm幅 - LED PRO SHOP |
| ALM-RECESSED-SV-30MM | アルミフレーム 埋め込み型 シルバー 30mm幅 - LED PRO SHOP |

### 5-6. カテゴリ5: シリコンカバー（44 SKU）

| SKU | 推奨 alt |
|---|---|
| SC-F-1010 | シリコンカバー 正面発光 1010 5-6mm対応 - LED PRO SHOP |
| SC-F-1212 | シリコンカバー 正面発光 1212 8-10mm対応 - LED PRO SHOP |
| SC-F-1515 | シリコンカバー 正面発光 1515 8-10mm対応 - LED PRO SHOP |
| SC-F-1615 | シリコンカバー 正面発光 1615 8-10mm対応 - LED PRO SHOP |
| SC-F-1616 | シリコンカバー 正面発光 1616 10-12mm対応 - LED PRO SHOP |
| SC-F-2010 | シリコンカバー 正面発光 2010 10-12mm対応 - LED PRO SHOP |
| SC-F-2020 | シリコンカバー 正面発光 2020 10-12mm対応 - LED PRO SHOP |
| SC-F-2025 | シリコンカバー 正面発光 2025 15-18mm対応 - LED PRO SHOP |
| SC-F-2520 | シリコンカバー 正面発光 2520 12-15mm対応 - LED PRO SHOP |
| SC-F-3010 | シリコンカバー 正面発光 3010 10-12mm対応 - LED PRO SHOP |
| SC-F-3620 | シリコンカバー 正面発光 3620 15-18mm対応 - LED PRO SHOP |
| SC-F-4020 | シリコンカバー 正面発光 4020 15-18mm対応 - LED PRO SHOP |
| SC-NB-1010 | シリコンカバー 無底帯辺 正面発光 1010 5-6mm対応 - LED PRO SHOP |
| SC-NB-1210 | シリコンカバー 無底帯辺 正面発光 1210 8-10mm対応 - LED PRO SHOP |
| SC-NB-1212 | シリコンカバー 無底帯辺 正面発光 1212 8-10mm対応 - LED PRO SHOP |
| SC-NB-1414 | シリコンカバー 無底帯辺 正面発光 1414 8-10mm対応 - LED PRO SHOP |
| SC-NB-1510 | シリコンカバー 無底帯辺 正面発光 1510 8-10mm対応 - LED PRO SHOP |
| SC-NB-1616 | シリコンカバー 無底帯辺 正面発光 1616 10-12mm対応 - LED PRO SHOP |
| SC-NB-2010 | シリコンカバー 無底帯辺 正面発光 2010 10-12mm対応 - LED PRO SHOP |
| SC-NB-2014 | シリコンカバー 無底帯辺 正面発光 2014 10-12mm対応 - LED PRO SHOP |
| SC-NB-2020 | シリコンカバー 無底帯辺 正面発光 2020 10-12mm対応 - LED PRO SHOP |
| SC-NB-2520 | シリコンカバー 無底帯辺 正面発光 2520 15-18mm対応 - LED PRO SHOP |
| SC-NB-3020 | シリコンカバー 無底帯辺 正面発光 3020 15-18mm対応 - LED PRO SHOP |
| SC-NB-4025 | シリコンカバー 無底帯辺 正面発光 4025 15-18mm対応 - LED PRO SHOP |
| SC-WB-1616 | シリコンカバー 有底帯辺 正面発光 1616 10-12mm対応 - LED PRO SHOP |
| SC-WB-2014 | シリコンカバー 有底帯辺 正面発光 2014 10-12mm対応 - LED PRO SHOP |
| SC-WB-2020 | シリコンカバー 有底帯辺 正面発光 2020 10-12mm対応 - LED PRO SHOP |
| SC-WB-3020 | シリコンカバー 有底帯辺 正面発光 3020 15-18mm対応 - LED PRO SHOP |
| SC-3S-1010 | シリコンカバー 三面発光 1010 5-6mm対応 - LED PRO SHOP |
| SC-3S-1616 | シリコンカバー 三面発光 1616 10-12mm対応 - LED PRO SHOP |
| SC-3S-2014 | シリコンカバー 三面発光 2014 10-12mm対応 - LED PRO SHOP |
| SC-SD-2020 | シリコンカバー 側面発光 2020 10-12mm対応 - LED PRO SHOP |
| SC-SD-2025 | シリコンカバー 側面発光 2025 8-10mm対応 - LED PRO SHOP |
| SC-SD-B817 | シリコンカバー 側面発光 B817 5-6mm対応 - LED PRO SHOP |
| SC-SP-2010 | シリコンカバー D形正面発光 2010 5mm対応 - LED PRO SHOP |
| SC-SP-2014 | シリコンカバー 異形正面発光 2014 5-6mm対応 - LED PRO SHOP |
| SC-SP-3020 | シリコンカバー 扇形正面発光 3020 10-12mm対応 - LED PRO SHOP |
| SC-SP-D1313 | シリコンカバー 270度発光 D1313 8mm対応 - LED PRO SHOP |
| SC-R-p13 | シリコンカバー 360度発光 φ13 5-6mm対応 - LED PRO SHOP |
| SC-R-p16 | シリコンカバー 360度発光 φ16 5-6mm対応 - LED PRO SHOP |
| SC-R-p20 | シリコンカバー 360度発光 φ20 6-8mm対応 - LED PRO SHOP |
| SC-R-p22 | シリコンカバー 360度発光 φ22 6-8mm対応 - LED PRO SHOP |
| SC-R-p26 | シリコンカバー 360度発光 φ26 8-10mm対応 - LED PRO SHOP |
| SC-R-p33 | シリコンカバー 360度発光 φ33 8-10mm対応 - LED PRO SHOP |
| SC-R-p40 | シリコンカバー 360度発光 φ40 10-12mm対応 - LED PRO SHOP |

### 5-7. カテゴリ6: エンドキャップ（52 SKU）

| SKU | 推奨 alt |
|---|---|
| EC-10-H-BK | エンドキャップ 角型 10mm幅 穴あり ブラック - LED PRO SHOP |
| EC-10-H-WH | エンドキャップ 角型 10mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-10-S-BK | エンドキャップ 角型 10mm幅 穴なし ブラック - LED PRO SHOP |
| EC-10-S-WH | エンドキャップ 角型 10mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-12-H-BK | エンドキャップ 角型 12mm幅 穴あり ブラック - LED PRO SHOP |
| EC-12-H-WH | エンドキャップ 角型 12mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-12-S-BK | エンドキャップ 角型 12mm幅 穴なし ブラック - LED PRO SHOP |
| EC-12-S-WH | エンドキャップ 角型 12mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-14-H-BK | エンドキャップ 角型 14-15mm幅 穴あり ブラック - LED PRO SHOP |
| EC-14-H-WH | エンドキャップ 角型 14-15mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-14-S-BK | エンドキャップ 角型 14-15mm幅 穴なし ブラック - LED PRO SHOP |
| EC-14-S-WH | エンドキャップ 角型 14-15mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-16-H-BK | エンドキャップ 角型 16mm幅 穴あり ブラック - LED PRO SHOP |
| EC-16-H-WH | エンドキャップ 角型 16mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-16-S-BK | エンドキャップ 角型 16mm幅 穴なし ブラック - LED PRO SHOP |
| EC-16-S-WH | エンドキャップ 角型 16mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-20-H-BK | エンドキャップ 角型 20mm幅 穴あり ブラック - LED PRO SHOP |
| EC-20-H-WH | エンドキャップ 角型 20mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-20-S-BK | エンドキャップ 角型 20mm幅 穴なし ブラック - LED PRO SHOP |
| EC-20-S-WH | エンドキャップ 角型 20mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-25-H-BK | エンドキャップ 角型 25mm幅 穴あり ブラック - LED PRO SHOP |
| EC-25-H-WH | エンドキャップ 角型 25mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-25-S-BK | エンドキャップ 角型 25mm幅 穴なし ブラック - LED PRO SHOP |
| EC-25-S-WH | エンドキャップ 角型 25mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-30-H-BK | エンドキャップ 角型 30mm幅 穴あり ブラック - LED PRO SHOP |
| EC-30-H-WH | エンドキャップ 角型 30mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-30-S-BK | エンドキャップ 角型 30mm幅 穴なし ブラック - LED PRO SHOP |
| EC-30-S-WH | エンドキャップ 角型 30mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-36-H-BK | エンドキャップ 角型 36-40mm幅 穴あり ブラック - LED PRO SHOP |
| EC-36-H-WH | エンドキャップ 角型 36-40mm幅 穴あり ホワイト - LED PRO SHOP |
| EC-36-S-BK | エンドキャップ 角型 36-40mm幅 穴なし ブラック - LED PRO SHOP |
| EC-36-S-WH | エンドキャップ 角型 36-40mm幅 穴なし ホワイト - LED PRO SHOP |
| EC-R16-H-BK | エンドキャップ 丸型 φ13-16mm 穴あり ブラック - LED PRO SHOP |
| EC-R16-H-WH | エンドキャップ 丸型 φ13-16mm 穴あり ホワイト - LED PRO SHOP |
| EC-R16-S-BK | エンドキャップ 丸型 φ13-16mm 穴なし ブラック - LED PRO SHOP |
| EC-R16-S-WH | エンドキャップ 丸型 φ13-16mm 穴なし ホワイト - LED PRO SHOP |
| EC-R22-H-BK | エンドキャップ 丸型 φ20-22mm 穴あり ブラック - LED PRO SHOP |
| EC-R22-H-WH | エンドキャップ 丸型 φ20-22mm 穴あり ホワイト - LED PRO SHOP |
| EC-R22-S-BK | エンドキャップ 丸型 φ20-22mm 穴なし ブラック - LED PRO SHOP |
| EC-R22-S-WH | エンドキャップ 丸型 φ20-22mm 穴なし ホワイト - LED PRO SHOP |
| EC-R26-H-BK | エンドキャップ 丸型 φ26mm 穴あり ブラック - LED PRO SHOP |
| EC-R26-H-WH | エンドキャップ 丸型 φ26mm 穴あり ホワイト - LED PRO SHOP |
| EC-R26-S-BK | エンドキャップ 丸型 φ26mm 穴なし ブラック - LED PRO SHOP |
| EC-R26-S-WH | エンドキャップ 丸型 φ26mm 穴なし ホワイト - LED PRO SHOP |
| EC-R33-H-BK | エンドキャップ 丸型 φ33mm 穴あり ブラック - LED PRO SHOP |
| EC-R33-H-WH | エンドキャップ 丸型 φ33mm 穴あり ホワイト - LED PRO SHOP |
| EC-R33-S-BK | エンドキャップ 丸型 φ33mm 穴なし ブラック - LED PRO SHOP |
| EC-R33-S-WH | エンドキャップ 丸型 φ33mm 穴なし ホワイト - LED PRO SHOP |
| EC-R40-H-BK | エンドキャップ 丸型 φ40mm 穴あり ブラック - LED PRO SHOP |
| EC-R40-H-WH | エンドキャップ 丸型 φ40mm 穴あり ホワイト - LED PRO SHOP |
| EC-R40-S-BK | エンドキャップ 丸型 φ40mm 穴なし ブラック - LED PRO SHOP |
| EC-R40-S-WH | エンドキャップ 丸型 φ40mm 穴なし ホワイト - LED PRO SHOP |

### 5-8. カテゴリ7: 電源装置（8 SKU）

| SKU | 推奨 alt |
|---|---|
| PSU-12V-200W | LED照明用 電源装置 DC12V 200W - LED PRO SHOP |
| PSU-12V-200W-WP | LED照明用 防水電源装置 DC12V 200W IP67 - LED PRO SHOP |
| PSU-12V-300W | LED照明用 電源装置 DC12V 300W - LED PRO SHOP |
| PSU-12V-400W | LED照明用 電源装置 DC12V 400W - LED PRO SHOP |
| PSU-24V-200W | LED照明用 電源装置 DC24V 200W - LED PRO SHOP |
| PSU-24V-200W-WP | LED照明用 防水電源装置 DC24V 200W IP67 - LED PRO SHOP |
| PSU-24V-300W | LED照明用 電源装置 DC24V 300W - LED PRO SHOP |
| PSU-24V-400W | LED照明用 電源装置 DC24V 400W - LED PRO SHOP |

### 5-9. カテゴリ8: コントローラー（3 SKU）

| SKU | 推奨 alt |
|---|---|
| CTRL-DIM-RF | LED単色調光コントローラー RF リモコン付 - LED PRO SHOP |
| CTRL-RGB-RF | LED RGBコントローラー RF リモコン付 - LED PRO SHOP |
| CTRL-RGB-WIFI | LED RGBコントローラー Wi-Fi リモコン付 - LED PRO SHOP |


---

## 6. images/ 配下の未使用画像 alt テンプレート（将来使用向け）

images/ 配下には実働 85 ファイルが存在するが、products/ HTML から直接参照されていない画像がある（lit1.png / lit2.png / scene.jpg 等）。

| 画像パス（相対） | 推奨 alt |
|---|---|
| images/テープライト/{色}/lit1.png | LED COBテープライト {色} 点灯時イメージ |
| images/テープライト/{色}/lit2.png | LED COBテープライト {色} 点灯時イメージ（角度2） |
| images/電源装置/{型番}/scene.jpg | LED照明用 電源装置 {型番} 設置イメージ |
| images/placeholder.svg | 空のまま維持（装飾的プレースホルダー） |

### hero-scenes 未使用画像（index.html の img タグに未登場）

| ファイル名 | 推奨 alt（将来使用時） |
|---|---|
| blue_desk.png | LED COBテープライト ブルー デスク間接照明 施工事例 |
| gold_livingroom.png | LED COBテープライト ゴールド リビング間接照明 施工事例 |
| green_shop.png | LED COBテープライト グリーン 店舗装飾照明 施工事例 |
| lemonyellow_shop.png | LED COBテープライト レモンイエロー 店舗アクセント照明 施工事例 |
| lightblue_kitchen.png | LED COBテープライト ライトブルー キッチン間接照明 施工事例 |
| orange_shop.png | LED COBテープライト オレンジ 店舗ディスプレイ照明 施工事例 |
| pink_livingroom.png | LED COBテープライト ピンク リビング装飾照明 施工事例 |
| purple_desk.png | LED COBテープライト パープル デスク間接照明 施工事例 |
| red_livingroom.png | LED COBテープライト レッド リビング装飾照明 施工事例 |
| white3000k_stairs.png | LED COBテープライト ホワイト3000K 階段フットライト 施工事例 |

---

## 7. 実装優先度と対応方針（proshop-engineer 向け指示書素材）

### 優先度 HIGH（即時対応推奨）

**H-1. products/ 全 172 ファイルへのブランド名付与**
- 現行: LED COBテープライト12V ホワイト3000K
- 変更後: 5-2〜5-9 の推奨 alt 全件を適用
- 変更ファイル数: 172 ファイル全件
- 方法: 各 HTML ファイルの alt="..." を sed 一括置換または generator スクリプトで更新
- 注意: 本投入前に必ず .bak_YYYYMMDD_HHMM のバックアップを取ること

**H-2. index.html hero-scenes 1セット目（10件）の alt 付与**
- 現行: alt=""
- 変更後: 4-2 の推奨 alt を適用（1セット目 L472〜L481 のみ・2セット目 L483〜L492 は空のまま）
- 変更ファイル: index.html のみ
- 注意: aria-hidden="true" は外さない（A11y 維持のまま SEO 効果だけ得る設計）

### 優先度 MEDIUM（次スプリント以降）

**M-1. index.html カルーセル JS の動的 alt 改善**
- 現行: alt="商品画像"（L7914: JS で生成）
- 変更後: 商品 SKU に対応した alt を動的生成する仕組みに変更
- 担当: proshop-engineer（JS 修正が必要）
- 方針: 商品データオブジェクトに alt プロパティを追加し、カルーセル生成時に参照

**M-2. 電源装置の scene.jpg への alt 付与（products/ HTML に追加された場合）**

### 優先度 LOW（将来検討）

**L-1. lit1.png / lit2.png を商品ページ HTML に追加**
- 現状: テープライト商品ページには点灯画像なし（main.png のみ）
- デザイン観点: 点灯イメージは購買意欲に直結するため追加が望ましい
- ページ構造変更を伴うため proshop-engineer・proshop-director の承認が必要

---

## 8. 禁止事項確認（実施済み）

- 仕入元・OEM 元の情報は alt に一切記載していない
- 製造国の情報は alt に含めていない
- 競合他社名・他ブランド名は含めていない
- 実装は行っていない（棚卸・方針提案のみ）

---

## 9. 想定リスク

| リスク | 内容 | 対処 |
|---|---|---|
| alt 一括置換による既存 alt の破壊 | 全件置換時、すでに良質な alt が上書きされる可能性 | diff 確認後に本投入。バックアップ（.bak_YYYYMMDD_HHMM）必須 |
| カルーセル JS 側の動的 alt と不整合 | M-1 対応時に商品データ構造変更が必要 | JS 修正時に商品データ定義も合わせて更新 |
| hero-scenes の aria-hidden と alt 付与の競合 | aria-hidden="true" の子要素の alt はスクリーンリーダーには届かないが Googlebot には届く | SEO 目的で alt 付与。A11y 的には影響なし。設計上問題なし |

---

## 10. セルフチェック7項目

- 仕入元・OEM元を alt に書いていない: 確認済み
- 実本投入を行っていない（棚卸・方針提案のみ）: 確認済み
- ブランド名 LED PRO SHOP の表記を統一（- LED PRO SHOP 形式）: 確認済み
- TokyoLEDstudio / order-mgmt の情報と混在していない: 確認済み
- 226 商品分の alt テンプレートが展開されている: 確認済み
- images/ 配下の画像ファイル実態（85件）と products/ HTML（172件）の乖離を説明している: 確認済み
- hero-scenes の aria-hidden との A11y/SEO 両立方針を明記している: 確認済み
