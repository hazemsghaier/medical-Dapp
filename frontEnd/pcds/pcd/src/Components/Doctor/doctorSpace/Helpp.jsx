import ContactForm from '../../ContactForm/ContactForm'
import NavbarDoctor from '../NavbarDoctor/NavbarDoctor'
import Footer from '../../Footer/Footer'

const Help = () => {
    const styles ={marginTop:"150px", marginBottom:'50px',marginLeft:'200px',marginRight:'200px'}
  return (
    <div>
      <NavbarDoctor/>
      <p style={styles}>

Bienvenue dans notre section d'aide ! Chez Mohbi, notre priorité est votre bien-être et votre satisfaction. Nous comprenons que vous puissiez avoir des questions ou des préoccupations concernant nos services ou votre santé en général. C'est pourquoi nous avons créé cette section pour vous fournir des réponses et des conseils utiles.

Si vous avez des questions sur nos services, telles que la planification des rendez-vous, les options de traitement disponibles ou les assurances acceptées, vous êtes au bon endroit. Nous avons rassemblé ici des réponses aux questions fréquemment posées pour vous aider à obtenir les informations dont vous avez besoin rapidement et facilement.

De plus, nous comprenons que votre santé est importante et que vous pourriez avoir des questions ou des préoccupations spécifiques sur certains aspects de votre bien-être. Dans notre section d'aide, vous trouverez également des articles et des ressources informatives sur divers sujets de santé, des conseils de prévention aux informations sur les conditions médicales courantes.

Nous sommes là pour vous accompagner à chaque étape de votre parcours de santé. Si vous ne trouvez pas ce que vous cherchez dans notre section d'aide, n'hésitez pas à nous contacter directement. Notre équipe dévouée est là pour répondre à toutes vos questions et vous fournir le soutien dont vous avez besoin.

Nous vous remercions de faire confiance à Mohbi pour vos besoins de santé et nous sommes impatients de vous aider à rester en bonne santé et heureux.

      </p>
      <ContactForm />
      <Footer/>
    </div>
  )
}

export default Help