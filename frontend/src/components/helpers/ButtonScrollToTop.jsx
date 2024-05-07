import "./ButtonScrollToTop.scss"
import arrow from "../../assets/arrow.png";

export default function ButtonScrollToTop() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
        });
    };

    return (
        <div 
            className="btn-scroll-to-top"
            onClick={handleScrollToTop}
        >
            <img src={arrow} alt="arrow"/>
        </div>
    )
}