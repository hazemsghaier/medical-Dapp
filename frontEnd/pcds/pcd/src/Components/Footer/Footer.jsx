import "./Footer.css"
const Footer = () => {
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>MindVesta</h1>
                    <p>Rejoigner-nous : soutenez l'innovation en santé mentale !</p>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-whatsapp-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>
                </div>
            </div>
            <div className="bottom">
                <div>
                    <h4>Accueil</h4>
                    <a href="/">Services</a>
                    <a href="/">About Us</a>
                    <a href="/">Contact</a>
                    <a href="/">Help</a>
                </div>
                <div>
                    <h4>MindVesta</h4>
                    <a href="/">FAQ</a>
                    <a href="/">Partenaires</a>
                    <a href="/">Sponsors</a>
                    <a href="/">Lieu</a>
                </div>
                <div>
                    <h4>Blog</h4>
                    <a href="/">Histoire</a>
                    <a href="/">Carriére</a>
                    <a href="/">Blog</a>
                    <a href="/">Politique de confidentialité</a>
                </div>
                <div>
                    <h4>Site</h4>
                    <a href="/">Support</a>
                    <a href="/">mise a jour</a>
                    <a href="/">Plan de site</a>
                    <a href="/">Mentions légales</a>
                </div>
            </div>

        </div>
    );
}
export default Footer ;