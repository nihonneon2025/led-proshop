/* 流入経路トラッキング（初回接点をセッション内で保持・上書きしない） */
/* referrer / UTM / ランディングページ / 初回接点時刻 を捕捉し checkoutForm 送信時に相乗り */
(function captureTrafficSource() {
  try {
    var KEY = 'neon_traffic_source';
    if (sessionStorage.getItem(KEY)) return; // 初回のみ記録
    var p = new URLSearchParams(window.location.search);
    var data = {
      landing_referrer: document.referrer || '',
      landing_page: window.location.href || '',
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
      landing_at: new Date().toISOString()
    };
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {}
})();
