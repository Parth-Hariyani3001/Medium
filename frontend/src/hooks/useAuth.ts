export const useAuth = () => {
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  return {
    isLoggedIn,
  };
};
