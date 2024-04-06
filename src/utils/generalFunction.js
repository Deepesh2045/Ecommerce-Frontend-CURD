const getAvatarName = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
 return  `${firstName} ${lastName}`
};
export default getAvatarName;
