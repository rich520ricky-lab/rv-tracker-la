# LA RV Tracker - 設計理念

## 設計方向：Modern Dashboard with Real-Time Data

### 核心理念
建立一個**專業、實用的 RV 車源追蹤儀表板**，讓用戶能快速掌握洛杉磯地區 Winnebago Solis 59P 的最新車源、價格與貸款資訊。設計強調**資訊清晰、數據視覺化、易於比較**。

### 設計特色

**Design Movement:** Modern Data Visualization + Minimalist Utility
- 靈感來自金融科技儀表板（如 Stripe、Plaid）和房地產平台（Zillow、Redfin）
- 強調數據可讀性與快速掃描

**Core Principles:**
1. **Information Hierarchy:** 最重要的車源卡片置於頂部，支持按價格、距離、經銷商篩選
2. **Scannable Layout:** 使用卡片網格，每張卡片展示關鍵信息（車型、價格、經銷商、距離）
3. **Real-time Freshness:** 顯示最後更新時間，讓用戶知道數據有多新鮮
4. **Comparison-Friendly:** 支持並排比較多輛車，快速決策

**Color Philosophy:**
- **Primary:** 深藍色 (`oklch(0.4 0.15 250)`) - 信任、專業、穩定
- **Accent:** 橙色 (`oklch(0.65 0.2 30)`) - 行動呼籲、價格亮點
- **Background:** 淺灰色 (`oklch(0.98 0.001 0)`) - 清爽、易讀
- **Success:** 綠色 - 貸款利率、優惠標籤

**Layout Paradigm:**
- **Header:** 固定導航 + 搜尋/篩選條件
- **Main Content:** 卡片網格（響應式：手機 1 列、平板 2 列、桌面 3 列）
- **Sidebar (Desktop):** 篩選面板（價格範圍、經銷商、距離）
- **Footer:** 最後更新時間、數據來源、貸款計算器連結

**Signature Elements:**
1. **Price Badge:** 大型、醒目的價格標籤，顯示 MSRP vs Sale Price 的節省額
2. **Dealer Badge:** 顏色編碼的經銷商標籤（La Mesa = 藍、Mike Thompson = 橙、Conejo = 綠）
3. **Freshness Indicator:** "Updated 2 hours ago" 的小型時間戳，增加信任感

**Interaction Philosophy:**
- 點擊卡片展開詳細信息（配置、聯絡方式、外部連結）
- 篩選條件即時更新（無需按鈕）
- 收藏功能（LocalStorage）保存感興趣的車源

**Animation:**
- 卡片進入時輕微上升 + 淡入（150ms ease-out）
- 懸停時卡片提升、陰影加深（100ms ease-out）
- 篩選結果更新時，新卡片從下方滑入

**Typography System:**
- **Display:** Poppins Bold (24px) - 頁面標題
- **Heading:** Poppins SemiBold (18px) - 卡片標題
- **Body:** Inter Regular (14px) - 正文
- **Label:** Inter Medium (12px) - 標籤、元數據

**Brand Essence:**
*"Your personal RV marketplace dashboard—always know what's available, never miss a deal."*
- Personality: Trustworthy, Data-Driven, Helpful

**Brand Voice:**
- Headlines: "Find Your Perfect Solis 59P in LA"
- CTAs: "View Details", "Compare Prices", "Get Financing"
- Avoid: Generic filler like "Welcome to our tracker"

**Wordmark & Logo:**
- Simple geometric mark: 一個簡化的 RV 側影 + 地圖針
- Color: 深藍色 + 橙色雙色
- Never use brand name in default font

**Signature Brand Color:**
- Deep Blue: `oklch(0.4 0.15 250)` - 專業感與信任

---

## 信息架構

### 主要頁面
1. **Dashboard (首頁):** 車源卡片網格 + 篩選面板
2. **Vehicle Details:** 單輛車的詳細信息（點擊卡片進入）
3. **Financing Guide:** 貸款利率表、計算器、推薦機構
4. **Dealers:** 經銷商列表與聯絡方式
5. **About:** 數據更新頻率、來源說明

### 數據模型
```typescript
interface RVListing {
  id: string;
  year: number;
  model: string;
  trim: string;
  price: number;
  msrp: number;
  dealer: string;
  location: string;
  distance: number; // 距離洛杉磯市中心（英里）
  features: string[];
  url: string;
  lastUpdated: Date;
  source: 'rvtrader' | 'dealer-website' | 'autotrader';
}

interface FinancingOption {
  lender: string;
  rate: number;
  term: number; // 月數
  minCredit: number;
  url: string;
}
```

---

## 技術實現

### Frontend (React + TailwindCSS)
- 使用 Recharts 展示價格趨勢圖
- 使用 Tanstack Table 實現高級篩選與排序
- LocalStorage 保存用戶篩選偏好與收藏清單

### Data Pipeline
- **爬蟲腳本** (Node.js): 定期爬取 RVTrader、經銷商官網
- **GitHub Actions:** 每天 9 AM 執行爬蟲，更新 JSON 數據文件
- **靜態生成:** 從 JSON 生成靜態 HTML（GitHub Pages 友好）

### 部署
- **GitHub Pages:** 靜態託管
- **GitHub Actions:** 自動化爬蟲 + 部署流程
- **CDN:** 使用 jsDelivr 或 Unpkg 加速資源

---

## 下一步
1. 生成 Logo 與 Hero 背景圖
2. 構建 React 組件
3. 集成數據爬蟲
4. 配置 GitHub Actions 自動更新
