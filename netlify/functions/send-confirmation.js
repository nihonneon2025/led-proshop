// Netlify Function: 購入者への注文確認メール送信
// Netlifyの組み込みメール機能を使用（追加パッケージ不要）
//
// 【セットアップ手順】
// 1. Netlify管理画面 > Site settings > Environment variables で以下を設定:
//    - ADMIN_EMAIL = led.chumon@gmail.com
//    - SHOP_NAME = LED専門プロショップ
//
// 2. Netlify管理画面 > Forms > Form notifications で:
//    - 「Add notification」 > 「Email notification」
//    - Email to notify: led.chumon@gmail.com
//    - Form: order
//    これで注文が入るたびに led.chumon@gmail.com に通知が届く
//
// 3. 購入者への自動確認メールはこのFunctionが担当
//    ただし、外部メール送信にはSendGrid/Mailgun等のAPIキーが必要
//    無料プランの場合は管理者が手動で確認メールを送る運用も可

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { to, name, subject, body, orderId, orderData, total } = data;

    // ============================================================
    // オプション1: SendGrid を使う場合（推奨）
    // 環境変数 SENDGRID_API_KEY を設定してください
    // ============================================================
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'led.chumon@gmail.com';

    if (SENDGRID_API_KEY) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + SENDGRID_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to, name: name }] }],
          from: { email: ADMIN_EMAIL, name: 'LED専門プロショップ' },
          subject: subject,
          content: [{ type: 'text/plain', value: body }]
        })
      });

      if (response.ok || response.status === 202) {
        return { statusCode: 200, body: JSON.stringify({ success: true, method: 'sendgrid' }) };
      } else {
        const errText = await response.text();
        console.log('SendGrid error:', errText);
        return { statusCode: 200, body: JSON.stringify({ success: false, error: 'sendgrid_error', fallback: 'admin_manual' }) };
      }
    }

    // ============================================================
    // オプション2: SendGridなし → 管理者に通知（Netlify Forms経由）
    // 購入者への確認メールは管理者が手動送信
    // ============================================================
    console.log('No SENDGRID_API_KEY set. Order ' + orderId + ' for ' + to + '. Admin will send confirmation manually.');
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        method: 'manual',
        message: 'Admin will send confirmation email manually via Netlify Forms notification'
      })
    };

  } catch (err) {
    console.log('Error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
