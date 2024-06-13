import './ImageHandler.css';
import React, { useEffect , useState} from 'react'

import Bild09 from '../assets/schoolappimages/bild09.png';
import Bild27 from '../assets/schoolappimages/bild27.png';
import Bild38 from '../assets/schoolappimages/bild38.png';
import Bild48 from '../assets/schoolappimages/bild48.png';
import Bild49 from '../assets/schoolappimages/bild49.png';
import Bild50 from '../assets/schoolappimages/bild50.png';
import Bild51 from '../assets/schoolappimages/bild51.png';
import Bild52 from '../assets/schoolappimages/bild52.png';
import Bild53 from '../assets/schoolappimages/bild53.png';
import Bild54 from '../assets/schoolappimages/bild54.png';
import Bild55 from '../assets/schoolappimages/bild55.png';
import Bild56 from '../assets/schoolappimages/bild56.png';
import Bild57 from '../assets/schoolappimages/bild57.png';
import Bild58 from '../assets/schoolappimages/bild58.png';
import Bild59 from '../assets/schoolappimages/bild59.png';
import Bild60 from '../assets/schoolappimages/bild60.png';
import Bild61 from '../assets/schoolappimages/bild61.png';
import Bild62 from '../assets/schoolappimages/bild62.png';
import Bild63 from '../assets/schoolappimages/bild63.png';
import Bild64 from '../assets/schoolappimages/bild64.png';
import Bild65 from '../assets/schoolappimages/bild65.png';
import Bild66 from '../assets/schoolappimages/bild66.png';
import Bild67 from '../assets/schoolappimages/bild67.png';
import Bild68 from '../assets/schoolappimages/bild68.png';
import Bild69 from '../assets/schoolappimages/bild69.png';
import Bild70 from '../assets/schoolappimages/bild70.png';
import Bild71 from '../assets/schoolappimages/bild71.png';
import Bild72 from '../assets/schoolappimages/bild72.png';
import Bild73 from '../assets/schoolappimages/bild73.png';
import Bild82 from '../assets/schoolappimages/bild82.png';
import Bild83 from '../assets/schoolappimages/bild83.png';
import Bild84 from '../assets/schoolappimages/bild84.png';
import Bild85 from '../assets/schoolappimages/bild85.png';
import Bild86 from '../assets/schoolappimages/bild86.png';
import Bild90 from '../assets/schoolappimages/bild90.png';
import Bild91 from '../assets/schoolappimages/bild91.png';
import Bild92 from '../assets/schoolappimages/bild92.png';
import Bild93 from '../assets/schoolappimages/bild93.png';
import Bild94 from '../assets/schoolappimages/bild94.png';
import Bild96 from '../assets/schoolappimages/bild96.png';
import Bild97 from '../assets/schoolappimages/bild97.png';
import Bild98 from '../assets/schoolappimages/bild98.png';
import Bild99 from '../assets/schoolappimages/bild99.png';
import Bild100 from '../assets/schoolappimages/bild100.png';
import Bild101 from '../assets/schoolappimages/bild101.png';
import Bild102 from '../assets/schoolappimages/bild102.png';
import Bild103 from '../assets/schoolappimages/bild103.png';
import Bild104 from '../assets/schoolappimages/bild104.png';
import Bild105 from '../assets/schoolappimages/bild105.png';
import Bild123 from '../assets/schoolappimages/bild123.png';
import Bild144 from '../assets/schoolappimages/bild144.png';
import Bild152 from '../assets/schoolappimages/bild152.png';



    const images = {
        1: Bild09,
        2: Bild27,
        3: Bild38,
        4: Bild48,
        5: Bild49,
        6: Bild50,
        7: Bild51,
        8: Bild52,
        9: Bild53,
        10: Bild54,
        11: Bild55,
        12: Bild56,
        13: Bild57,
        14: Bild58,
        15: Bild59,
        16: Bild60,
        17: Bild61,
        18: Bild62,
        19: Bild63,
        20: Bild64,
        21: Bild65,
        22: Bild66,
        23: Bild67,
        24: Bild68,
        25: Bild69,
        26: Bild70,
        27: Bild71,
        28: Bild72,
        29: Bild73,
        30: Bild82,
        31: Bild83,
        32: Bild84,
        33: Bild85,
        34: Bild86,
        35: Bild90,
        36: Bild91,
        37: Bild92,
        38: Bild93,
        39: Bild94,
        40: Bild96,
        41: Bild97,
        42: Bild98,
        43: Bild99,
        44: Bild100,
        45: Bild101,
        46: Bild102,
        47: Bild103,
        48: Bild104,
        49: Bild105,
        50: Bild123,
        51: Bild144,
        52: Bild152
    };
    
       
        
    
    console.log(images[1],"images")
   
    const ImageHandler = ({ imageIndex }) => {

        const [src, setSrc] = useState()
       
        const alt = `Image ${imageIndex}`
        

        useEffect(() => {
            setSrc(images[imageIndex])

        },[imageIndex])
        console.log(imageIndex, "heeejj")
        if(!imageIndex) {
          return null
        }

        return (
          <img src={src} alt={alt} className="image-handler" />
        );
      }

    //const picture = <img src={src} alt={alt} className="image-handler" />;
    
    
   export default ImageHandler


