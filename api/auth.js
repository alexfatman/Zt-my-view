// api/auth.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const VALID_USER = process.env.APP_USERNAME;
  const VALID_PASS = process.env.APP_PASSWORD;

  if (!VALID_USER || !VALID_PASS) {
    console.error('APP_USERNAME or APP_PASSWORD not set in environment');
    return res.status(500).json({ error: 'Auth not configured' });
  }

  if (username === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
}
