const parseEnvTime = timeStr => {
  const value = parseInt(timeStr);
  if (timeStr.endsWith('d')) return value * 24 * 60 * 60 * 1000;
  if (timeStr.endsWith('h')) return value * 60 * 60 * 1000;
  if (timeStr.endsWith('m')) return value * 60 * 1000;
  return value * 1000;
};

const DEFAULT_ACCESS_EXPIRY = 15 * 60 * 1000;         // 15 minutes
const DEFAULT_REFRESH_EXPIRY = 15 * 24 * 60 * 60 * 1000;

export const getCookieOptions = (type = 'access') => {
 const expiryEnv =
    type === 'access'
      ? process.env.ACCESS_TOKEN_EXPIRY
      : process.env.REFRESH_TOKEN_EXPIRY;

  const maxAge =
    parseEnvTime(expiryEnv) ||
    (type === 'access' ? DEFAULT_ACCESS_EXPIRY : DEFAULT_REFRESH_EXPIRY);


  return {
    httpOnly: true,                      
    secure: true,                
    sameSite: 'none' ,
    path: '/',                            
    maxAge,
  };
};
