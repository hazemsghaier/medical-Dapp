import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer";
import SignUpForm from "../ForgotPassword/ForgotPassword";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

function Forgotpass () {
    const styles = {
        marginTop: '200px',
        marginBottom: '100px',
        // Ajoutez d'autres styles selon vos besoins
      };
    return(
      <>
        
      <Navbar/>
        <div style={styles}>  
        <ForgotPassword/>
        </div>

        <Footer/>
      
      </>
    )
  }
  export default Forgotpass ;