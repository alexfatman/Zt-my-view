// Vercel Serverless Function (CommonJS)
const axios = require('axios');

module.exports = async (req, res) => {
  const NETWORK_ID = process.env.ZEROTIER_NETWORK_ID || '48d6023c462aca41';
  const API_TOKEN = process.env.ZEROTIER_API_TOKEN;

  if (!API_TOKEN) {
    return res.status(500).json({ error: 'ZEROTIER_API_TOKEN is not set in environment variables' });
  }

  try {
    const response = await axios.get(
      `https://my.zerotier.com/api/network/${NETWORK_ID}/member`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        timeout: 10000
      }
    );

    const members = response.data.map(m => {
      const internalIps = m.config?.ipAssignments || [];
      const externalIp = m.physicalAddress ? m.physicalAddress.split('/')[0] : null;

      let lastSeen = '—';
      if (m.lastSeen) {
        const date = new Date(m.lastSeen);
        lastSeen = date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      }

      return {
        name: m.name || null,
        internalIp: internalIps[0] || null,
        externalIp: externalIp || null,
        lastSeen
      };
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(members);
  } catch (error) {
    console.error('ZeroTier API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch network members' });
  }
};
