const clearLocalStorage = () => {
  localStorage.removeItem("quadbiteUserInfo");
  localStorage.removeItem("quadbiteCheckout");
  localStorage.removeItem("quadbiteChatbot");
};

export default clearLocalStorage;
