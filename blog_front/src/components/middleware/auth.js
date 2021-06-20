// LOGOUT
import axios from "axios";
import { API_BASE_URL } from "../../config";
export const logout = () => {

  
 
  // call logout api
  axios
    .get(API_BASE_URL + "/api/logout", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token"),
                  Accept : "application/json",
     },
    })
    .then((response) => {
      localStorage.clear();
     
      console.log(response);
      window.location.href='/login'; // redirect to homepage
    })
    .catch((err) => {
    
      alert(err);
    });

 
};

// LOGIN STATUS
export const isLogin = () => {
  if (localStorage.getItem("token")) return true;
  return false;
};
