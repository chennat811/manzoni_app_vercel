import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <style jsx>{`
        :root {
          --fg: #1f6252;
          --text: #1a1a1a;
          --muted: #5f6b6b;
          --bg: #ffffff;
        }
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Helvetica, Arial, sans-serif;
          background: var(--bg);
          color: var(--text);
        }
        header {
          background: var(--fg);
          color: #fff;
          padding: 24px 16px;
        }
        header .container,
        main .container,
        footer .container {
          max-width: 840px;
          margin: 0 auto;
          padding: 0 16px;
        }
        h1 {
          margin: 0;
          font-size: 28px;
        }
        main {
          padding: 32px 0 64px;
        }
        h2 {
          color: var(--fg);
          margin-top: 32px;
        }
        p,
        li {
          line-height: 1.7;
        }
        .muted {
          color: var(--muted);
          font-size: 14px;
        }
        footer {
          border-top: 1px solid #eee;
          padding: 24px 0;
          background: #fafafa;
        }
        a {
          color: var(--fg);
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 24px;
        }
      `}</style>

      <header>
        <div className="container">
          <h1>隱私權政策</h1>
          <p className="muted">更新日期：2025-09-18</p>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="card">
            <p>
              歡迎使用 Forkcast（以下簡稱「本服務」）。我們非常重視您的隱私與資料安全。
              本政策說明我們如何蒐集、使用、保護與分享您的個人資料。
            </p>

            <h2>1. 我們蒐集的資料</h2>
            <ul>
              <li>帳戶資料：電子郵件、名稱（若提供）。</li>
              <li>
                使用資料：您上傳的餐點照片、由 AI
                生成的分析結果與紀錄（例如卡路里與營養素）。
              </li>
              <li>
                裝置資訊與診斷：應用程式版本、裝置型號、崩潰與錯誤記錄（若啟用）。
              </li>
            </ul>

            <h2>2. 資料的使用目的</h2>
            <ul>
              <li>提供核心功能：例如餐點分析、歷史紀錄檢視與個人化目標。</li>
              <li>改善服務品質：除錯、效能監控與功能優化。</li>
              <li>安全性與防濫用：登入驗證與異常使用偵測。</li>
            </ul>

            <h2>3. 第三方服務</h2>
            <p>本服務使用第三方供應商以提供功能：</p>
            <ul>
              <li>Supabase：帳號管理、資料庫與 Edge Functions。</li>
              <li>
                OpenAI：影像與文字分析（僅在您請求分析時傳送必要資料）。
              </li>
              <li>
                Expo（EAS）：建置與更新發佈（可能收集裝置與版本資訊）。
              </li>
            </ul>

            <h2>4. 資料保留與刪除</h2>
            <ul>
              <li>
                您可於應用程式內隨時刪除帳號，相關個人資料將依流程刪除或匿名化。
              </li>
              <li>
                法律或合約要求時，我們可能保留必要紀錄於合理期間。
              </li>
            </ul>

            <h2>5. 資料安全</h2>
            <p>
              我們採取合理且合適的技術與組織措施保護您的資料，但無法保證 100% 的安全。
            </p>

            <h2>6. 兒童隱私</h2>
            <p>
              本服務不針對未滿 13
              歲之兒童設計。如您為家長/監護人，並發覺未成年子女提供資料，請與我們聯繫以採取後續處置。
            </p>

            <h2>7. 您的權利</h2>
            <ul>
              <li>存取、更正與刪除您的資料。</li>
              <li>撤回同意（若適用）。</li>
              <li>提出異議與要求限制處理（在適用法規允許的範圍內）。</li>
            </ul>

            <h2>8. 跨境傳輸</h2>
            <p>
              您的資料可能被處理與儲存於您所屬司法管轄區之外的地區。我們將遵循相關法規採取適當保護措施。
            </p>

            <h2>9. 政策更新</h2>
            <p>
              我們可能不時更新本政策。重大更新時，我們會於應用內或網站上提供通知。
            </p>

            <h2>10. 聯絡我們</h2>
            <p>
              若您對本政策有任何疑問或要求，請寄信至：
              <a href="mailto:support@manzoni-nutrition.com">
                support@manzoni-nutrition.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p className="muted">© 2025 Forkcast. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default PrivacyPolicy;
