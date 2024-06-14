import Navbar from "../Navbar/Navbar"
import img from "../assets/gettyimages-1466789902-640x640.jpg"
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import ContactForm from "../ContactForm/ContactForm";


function Contact () {
    return(
      <>
        <Navbar/>
        <Hero 
          cName="hero-mid"
          heroImg={img}
          title="Contact"
          btnClass="hide"
        />
        <ContactForm/>
        <Footer/>
        
      </>
    )
  }
  export default Contact ;