

export const checkValidData = (name,email,password)=>{
     const isNameValid = /^[a-zA-Z\s]+$/.test(name);
     const isEmailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email); 
const isPasswordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{6,}$/.test(password);
      
      if(!isNameValid){
        return "Invalid Name";
      }
      if(!isEmailValid){
        return "Invalid Email";
      }
      if(!isPasswordValid){
        return "Password must contain at least 6 characters, including uppercase, lowercase letters, and numbers.";
      }


      return null; 
};