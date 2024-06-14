import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import images from "../assets/low-angle-woman-posing-with-beautiful-flowers_23-2150725305.avif";
import Footer from "../Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";
function About () {
    return(
      <>
        <Navbar />
        <Hero 
        cName="hero-mid" 
        heroImg={images} 
        title="About" 
        btnClass="hide"
        />
        <AboutUs />
        <Footer/>
      </>
    )
  }
  export default About ;