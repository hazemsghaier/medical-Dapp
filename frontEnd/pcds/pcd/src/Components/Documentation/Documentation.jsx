import img from "../assets/low-angle-woman-posing-with-beautiful-flowers_23-2150725305.avif"
import img1 from "../assets/gettyimages-1466789902-640x640.jpg"
import img2 from "../assets/gettyimages-1752533608-640x640.jpg"
import img3 from "../assets/confident-smiling-adult-man-showing-ok-signs-looking-pleased_1258-38774.avif"
import DocumentationData from "../DocumentationData"
import "./Documentation.css"
const Documentation = () => {
    return (
       <div className="documentation">
         <h1>L'importance de Santé mentale </h1>
         <p></p>
         <DocumentationData
            className="first-documentation"
            heading="bien-etre"
            text="La santé mentale est une composante essentielle du bien-être général et de la qualité de vie de chaque individu. Elle influence la manière dont nous pensons, ressentons et agissons face aux défis de la vie quotidienne. Une bonne santé mentale permet de mieux gérer le stress, de maintenir des relations saines, de travailler de manière productive et de contribuer positivement à la communauté. Les troubles de santé mentale, tels que la dépression, l'anxiété et les troubles bipolaires, peuvent avoir des impacts dévastateurs non seulement sur les individus concernés mais aussi sur leurs familles, amis et collègues. Ils peuvent affecter la capacité à mener une vie équilibrée et à réaliser pleinement son potentiel"
            img={img}
            img1={img1}
         />
         <DocumentationData
            className="first-documentation-reverse"
            heading="potentiel"
            text="la santé mentale est cruciale pour le développement socio-économique d'une société. Les problèmes de santé mentale non traités peuvent entraîner une diminution de la productivité, une augmentation des coûts de soins de santé et des impacts économiques négatifs pour les entreprises et les communautés. Investir dans la santé mentale par la prévention, l'éducation et l'accès à des soins appropriés est donc primordial. Cela permet non seulement d'améliorer la vie des individus mais aussi de renforcer la cohésion sociale et de promouvoir une société plus résiliente et prospère. La reconnaissance et le soutien de la santé mentale doivent être une priorité afin de construire un avenir plus sain et plus équilibré pour tous."
            img={img2}
            img1={img3}
         />
       </div>
    )
}
export default Documentation ; 