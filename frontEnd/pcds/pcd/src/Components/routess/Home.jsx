import Navbar from "../Navbar/Navbar"
import Hero from "../Hero/Hero";
import images from "../assets/low-angle-woman-posing-with-beautiful-flowers_23-2150725305.avif"
import Documentation from "../Documentation/Documentation";
import Trip from "../Trip/Trip";
import Footer from "../Footer/Footer";
function Home () {
  return(
    <>
        <Navbar />
        <Hero cName="hero" 
        heroImg={images} 
        title="Rejoignez-nous:Soutenez l'innovation en santé mentale" 
        text="démarrer cette expérience !"
        buttonText="Sign Up"
        url="/signup"
        btnClass="show"
        />
        <Documentation/>

        <Trip/>
        <Footer />
    </>
    
  )
}
export default Home ;