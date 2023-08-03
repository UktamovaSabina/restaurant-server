import jwt from "jsonwebtoken";

const SECRET = 'hello';

export default {
  sign: (payload: any) => jwt.sign(payload, SECRET),
  verify: (token: any) => jwt.verify(token, SECRET),
};