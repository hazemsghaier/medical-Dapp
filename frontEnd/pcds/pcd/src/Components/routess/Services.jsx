import Navbar from "../Navbar/Navbar"
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import img from "../assets/gettyimages-1752533608-640x640.jpg"
import Trip from "../Trip/Trip";
function Services () {
    return(
      <>
         <Navbar/>
         <Hero
           cName="hero-mid"
           heroImg={img}
           title="services"
           btnClass="hide"
         />
         <Trip/>
         <Footer/>
      </>
    )
  }
  export default Services ;