import bcrypt from "bcryptjs";



const hashPassword=async(password)=>{
  const saltRounds=10;
  const salt=await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password,salt);
}

const comparePassword=async(password,hashPassword)=>{
return await bcrypt.compare(password,hashPassword);

}