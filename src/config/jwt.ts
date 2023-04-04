export default {
    secret: process.env.JWT_SECRET || 'mysecret',
    options: {
      expiresIn: '1d',
    },
  };
  