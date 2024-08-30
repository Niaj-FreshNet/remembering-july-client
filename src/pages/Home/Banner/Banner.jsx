import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/01.jpg'
import img2 from '../../../assets/02.jpg'
import img3 from '../../../assets/03.png'
import img4 from '../../../assets/bannerbg.png'


const Banner = () => {
    return (
        <Carousel>
            <div>
                <img src={img4} />
            </div>
            {/* <div>
                <img src={img1} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img3} />
            </div> */}
        </Carousel>
    );
};

export default Banner;