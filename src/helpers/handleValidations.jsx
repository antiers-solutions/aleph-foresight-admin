let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const handleValidations = (name, value) => {
  let newErr = {};
  switch (name) {
    case "email":
      if (value === "") {
        newErr[name] = "Enter valid email";
        break;
      } else if (!emailRegex.test(value)) {
        newErr[name] = "Invalid Email";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    case "password":
      if (value === "") {
        newErr[name] = "Enter password";
        break;
      } else if (!passwordRegex.test(value)) {
        newErr[name] = "Weak Password";
        break;
      } else {
        newErr[name] = "";
        break;
      }
    default:
      break;
  }
  return newErr;
};
