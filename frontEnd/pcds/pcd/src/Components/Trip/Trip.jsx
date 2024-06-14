import "./Trip.css"
import TripData from "./TripData";
import trip1 from "../assets/gettyimages-1466789902-640x640.jpg"
import trip2 from "../assets/gettyimages-1752533608-640x640.jpg"
import trip3 from "../assets/low-angle-woman-posing-with-beautiful-flowers_23-2150725305.avif"
function Trip(){
    return(
        <div className="trip">
            <h1>Processus</h1>
            <p>Rejoignez-nous:Soutenez l'innovation en santé mentale</p>
            <div className="tripcard">
                <TripData 
                    image={trip1}
                    heading="Génération de fichier"
                    text="les medecins peuvent téléverser des fichiers de maniére sécurisé sur la platforme"
                />
                <TripData 
                    image={trip2}
                    heading="Cryptage et stockage"
                    text="Les fichiers sont ensuite cryptés et stockés de maniére centralisé sur IPFS"
                />
                <TripData 
                    image={trip3}
                    heading="Accés controlé"
                    text="les utilisateurs autorisés peuvent accéder aux fichiers en toute confidentialité grace aux smart contrat"
                />
            </div>
        </div>
    )
}
export default Trip;