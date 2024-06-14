import axios from "./axios";
export async function getUserData(){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.get("/userData", { // Pass email as a query parameter
            headers: {
                'Authorization': `Bearer ${token1}` // Include Authorization header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error.message)
        return false;    
    }
}
export async function getUserDataDocteur(data){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.post("/docteurData",{
            email:data.docteurEmail
        }, { // Pass email as a query parameter
            headers: {
                'Authorization': `Bearer ${token1}` // Include Authorization header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error.message)
        return false;    
    }
}
export async function getDocteurFreeTime(data) {
    const token1 = localStorage.getItem("accessToken");
    try {
        const response = await axios.post("/seeDocteurFreeTime",{
            docteurEmail:data.email
        }, {
            headers: {
                'Authorization': `Bearer ${token1}`
            }
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error fetching doctor's free time:", error);
    }
}
export async function makeAppointement(data){
    const token1 = localStorage.getItem("accessToken");
    try {
        const response = await axios.post("/addAppointement",{
            DATE:data.scheduleDate,
            docteurEmail:data.docteurEmail

        }, {
            headers: {
                'Authorization': `Bearer ${token1}`
            }
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error when make appointement:", error);
    }

}
export async function listDocteurs(){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.get("/all", { 
            headers: {
                'Authorization': `Bearer ${token1}` 
            }
        });
        return result.data;
    } catch (error) {
        console.log(error.message)
        return false;    
    }
}
export async function getDataDocteur(){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.get("/docteurData",{ // Pass email as a query parameter
            headers: {
                'Authorization': `Bearer ${token1}` // Include Authorization header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error.message)
        return false;    
    }
}
export async function getUserDataForDocteur(email){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.post("/userData",{
            email:email
        }, { // Pass email as a query parameter
            headers: {
                'Authorization': `Bearer ${token1}` // Include Authorization header
            }
        });
        return result.data;
    } catch (error) {
        console.log(error.message)
        return false;    
    }
}
