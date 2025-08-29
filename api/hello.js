// /api/hello.js
module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    node: process.version,
    hasKey: !!process.env.GROQ_API_KEY,
    envs: process.env.VERCEL_ENV || 'unknown'
  });
};
