export const isSeller = () => {
    const userRole = localStorage.getItem("userRole");
  
    return userRole === "seller";
  };