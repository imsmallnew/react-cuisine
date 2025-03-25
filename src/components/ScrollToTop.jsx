import { useState, useEffect, useCallback} from "react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    
    // 監聽滾動事件
    const toggleVisibility = useCallback(() => {
        if (window.scrollY > 100) {
            setIsVisible(true); // 當滾動超過 100px，顯示按鈕
        } else {
            setIsVisible(false); // 置頂時隱藏按鈕
        }
    }, []);
    
    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [toggleVisibility]);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <button
                onClick={() => scrollToTop()}
                className={`scroll-to-top ${isVisible && "visible"}`}
                aria-label="Scroll to top"
            >
                <div className="arrow"></div>
            </button>            
        </>
    )
}