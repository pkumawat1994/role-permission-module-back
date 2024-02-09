import bcrypt from "bcrypt";
export const hashGenerate = async (password) => bcrypt.hash(password, 10);

export const hashCompare = async (password, hashPassword) => {
  console.log(password,"password")
  console.log(hashPassword,"hashPassword")

  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (err) {
    console.log("hash error", err);
  }
};
