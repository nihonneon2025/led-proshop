// Netlify Function: お問い合わせ自動返信メール
//
// 【セットアップ手順】
// Netlify管理画面 > Site settings > Environment variables で以下を設定:
//   - SENDGRID_API_KEY = sg_xxxxx（SendGridのAPIキー）
//   - SUPPORT_EMAIL = led.proshop.support@gmail.com
//   - SHOP_NAME = LED専門プロショップ
//
// SendGrid側で led.proshop.support@gmail.com を「Sender Identity」として認証済みにすること

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { to, name, company, message } = data;

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'led.proshop.support@gmail.com';
    const SHOP_NAME = process.env.SHOP_NAME || 'LED専門プロショップ';

    if (!to || !name) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    // 自動返信メール本文
    const companyLine = company ? '会社名: ' + company + '\n' : '';
    const bodyText = name + ' 様\n\n'
      + 'この度はお問い合わせいただき、誠にありがとうございます。\n'
      + '以下の内容でお問い合わせを受け付けいたしました。\n\n'
      + '━━━━━━━━━━━━━━━━━━━━\n'
      + companyLine
      + 'お名前: ' + name + '\n'
      + 'メール: ' + to + '\n\n'
      + '【お問い合わせ内容】\n'
      + message + '\n'
      + '━━━━━━━━━━━━━━━━━━━━\n\n'
      + '担当者より翌営業日以内にご返信いたします。\n'
      + 'しばらくお待ちくださいませ。\n\n'
      + '---\n'
      + SHOP_NAME + '（日本ネオン株式会社）\n'
      + 'Email: ' + SUPPORT_EMAIL + '\n';

    const subject = '【' + SHOP_NAME + '】お問い合わせを受け付けました';

    if (SENDGRID_API_KEY) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + SENDGRID_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to, name: name }] }],
          from: { email: SUPPORT_EMAIL, name: SHOP_NAME },
          subject: subject,
          content: [{ type: 'text/plain', value: bodyText }]
        })
      });

      if (response.ok || response.status === 202) {
        return { statusCode: 200, body: JSON.stringify({ success: true, method: 'sendgrid' }) };
      } else {
        const errText = await response.text();
        console.log('SendGrid error:', errText);
        return { statusCode: 200, body: JSON.stringify({ success: false, error: 'sendgrid_error' }) };
      }
    }

    // SendGridなし → ログ出力のみ（管理者が手動対応）
    console.log('No SENDGRID_API_KEY. Contact inquiry from ' + to + '. Admin will reply manually.');
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        method: 'manual',
        message: 'Admin will reply manually via Netlify Forms notification'
      })
    };

  } catch (err) {
    console.log('Error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
