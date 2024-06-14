import { Component } from "react";
import "./Documentation/Documentation.css"
import img0 from "./assets/confident-smiling-adult-man-showing-ok-signs-looking-pleased_1258-38774.avif"
import img1 from "./assets/gettyimages-1466789902-640x640.jpg"
import img2 from "./assets/gettyimages-1752533608-640x640.jpg"
import img3 from "./assets/low-angle-woman-posing-with-beautiful-flowers_23-2150725305.avif"

class DocumentationData extends Component{
    render(){
        return(
            <div className={this.props.className}>
            <div className="documentation-text">
              <h2>{this.props.heading}</h2>
              <p>
                 {this.props.text}
              </p>
            </div>
           
          
          <div className="image">
             <img alt="img"src={this.props.img}/>
             <img alt="img"src={this.props.img1}/>
             
          </div>
          </div>
        )
    }
}
export default DocumentationData ;