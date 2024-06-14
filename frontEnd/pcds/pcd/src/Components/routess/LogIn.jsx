import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer";
import LogInForm from "../LogIn/LogInForm";

function LogIn () {
    const styles = {
        marginTop: '200px',
        marginBottom: '100px',
        // Ajoutez d'autres styles selon vos besoins
      };
    return(
      <>
        
      <Navbar/>
        <div style={styles}>  
        <LogInForm/>
        </div>

        <Footer/>
      
      </>
    )
  }
  export default LogIn ;