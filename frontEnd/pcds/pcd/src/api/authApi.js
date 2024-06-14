import axios1 from "./axios";
export async function login(data){
    console.log(data)
    try {
        const result= await axios1.post("/login",data);
        localStorage.setItem("refreshToken",result.data.refreshToken);
        localStorage.setItem("accessToken", result.data.accessToken);
        return true;
    } catch (error) {
        console.log(error.message)
        return false;    
    }
}
export async function signUp(data){
    try {
        console.log(data)
        const result= await axios1.post("/signUp",data);
        localStorage.setItem("refreshToken",result.data.refreshToken);
        localStorage.setItem("accessToken", result.data.accessToken);
        return true;

        
    } catch (error) {
        return false; 
        
    }

}
export async function logout(){
    try {
        const token1=localStorage.getItem("accessToken")
        const token2=localStorage.getItem("refreshToken")

       const result= await axios1.post("http://localhost:4200/logout",null, {
            headers: {
                'Authorization': `Bearer ${token1}  ${token2}`
            }
        });
        localStorage.removeItem('refreshToken');
        localStorage.removeItem("accessToken")
        return true;
    } catch (error) {
        console.log(error);
        return false
        
    }
  
}
