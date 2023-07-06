import users from "./MockAPI";

export const LoginAPI = ({ email, password }) => {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  console.log('users', users);
  console.log('userrrr', user);
  if (user) return true;
  return false;
};

export const RegisterAPI = ({ fullName, email, password }) => {
  const newUser = {
    fullName,
    email,
    password,
  };
  users.push(newUser);
};
