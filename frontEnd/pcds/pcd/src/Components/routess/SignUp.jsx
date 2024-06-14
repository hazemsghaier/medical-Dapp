import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer";
import SignUpForm from "../SignUp/SignUpForm";

function SignUp () {
    const styles = {
        marginTop: '200px',
        marginBottom: '100px',
        marginRight:'450px'
        // Ajoutez d'autres styles selon vos besoins
      };
    return(
      <>
        
      <Navbar/>
        <div style={styles}>  
        <SignUpForm/>
        </div>

        <Footer/>
      
      </>
    )
  }
  export default SignUp ;