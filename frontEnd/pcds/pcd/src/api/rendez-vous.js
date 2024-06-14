import axios from "./axios";
export async function seeDocteurFreeTime(data){
    try {
    const token1=localStorage.getItem("accessToken")
    const result=await  axios.post("/seeDocteurFreeTime",{
        docteurEmail:data
    },{
        headers: {
            'Authorization': `Bearer ${token1}`
        }
    })

    return result.data;
} catch (error) {
    console.log(error);
    return false;
} 
}
export async function getAppointements(){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.get("/MyAppointement", { 
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
export async function getAppointementDocteur(){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.get("/MyAppointementDocteur", { 
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
export async function clientRemoveAppointement(email,date){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.post("/refuser",{
            email:email,
            DATE:date
        }, { 
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
export async function addFreeTime(DATE){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.post("/addFreeTime",{
            DATE:DATE
        }, { 
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
export async function accepteDemande(userEmail,id){
    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.post("/confirmeAppointement",{
            userEmail,
            id
        }, { 
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
export async function docteurRemoveAppointement(email,date){

    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.post("/refuser",{
            email,
            DATE:date
        }, { 
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
export async function docteurRemoveFreeTime(date){

    try {
        const token1=localStorage.getItem("accessToken")
        const result = await axios.delete("/DocteurRemoveFreeTime",{
            DATE:date
        }, { 
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