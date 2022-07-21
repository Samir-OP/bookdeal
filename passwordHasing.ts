import bcrypt from "bcrypt";

const saltRounds: number = 20;

const hash = await bcrypt.hash("123", saltRounds);

console.log(hash);
