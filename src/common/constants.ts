export const BCRYPT_SALT = 10;
export const JWT_SECRET = 'CRAFT_WAYS_SECRET';
export const mailConfig = {
  transport: {
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false,
    auth: {
      user: '53b393e1cfdac98b1d8975f55a3aa1c8',
      pass: 'cb8492e2fe780ffd0fcf779a510037ff',
    },
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
};

export const myEmail = 'alikashmar8@gmail.com';
