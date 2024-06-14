import axios from "./axios";
export async function changeEmail(data){
    try {
        const token=localStorage.getItem("accessToken")
        console.log(token)
        const result = await axios.put("/changeEmail", data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
    localStorage.setItem("refreshToken",result.data.refreshToken);
    localStorage.setItem("accessToken", result.data.accessTocken);
    return true;
    } catch (error) {
        console.log(false);
        return true;
        
    }
    
}
export async function changePassword(data){
    try {
        const token=localStorage.getItem("accessToken")
        const result = await axios.put("/changerPassword", data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
        localStorage.setItem("refreshToken",result.data.refreshToken);
        localStorage.setItem("accessToken", result.data.accessTocken);
        return true;
    } catch (error) {
        console.log(error)
        return false;
        
    }
   
}
export async function changeProfileImage(data) {
    try {
        const token = localStorage.getItem("accessToken");
        const result = await axios.put(
            "/addProfileImage",
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return true;
    } catch (error) {
        console.error("Error changing profile image:", error);
        return false;
    }
}
