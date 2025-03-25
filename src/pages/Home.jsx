import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import logo from '../assets/logo.png';

export default function Home() {
  const [comments, setComments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const promoSectionRef = useRef(null);
  const portfolioSectionRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll();
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const fadeOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const event = [
    {
      title: '無酒精飲料一杯',
      imgUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: '法式薯條 50% Off',
      imgUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: '經典甜點一份',
      imgUrl: 'https://images.unsplash.com/photo-1707070026861-ae45cb63d845?w=1024&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJyb3duaWV8ZW58MHx8MHx8fDA%3D',
    }
  ]

  // 禁止水平滾動
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto"; // 解除限制（避免影響其他頁面）
    };
  }, []);

  const scrollTo = (target) => {
    if (target === "promo" && promoSectionRef.current) {
      promoSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (target === "portfolio" && portfolioSectionRef.current) {
      portfolioSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollTo(); // 網頁載入時滾動到頂部
  }, []);

  // Portfolio 資料
  const portfolioItems = [
    { category: "主餐", description: "我們的主餐精選優質食材，搭配獨家醬料，讓每一口都充滿層次感與滿足感。", imgUrl: "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { category: "配餐", description: "精選多種口味的配餐，從炸物到蔬食，讓您的主餐搭配更豐富，提升整體用餐體驗。", imgUrl: "https://images.unsplash.com/photo-1534938665420-4193effeacc4?q=80&w=600&auto=format&fit=crop" },
    { category: "沙拉", description: "清新爽口的沙拉，以當季新鮮蔬菜為基底，搭配特製醬汁，讓您享受健康美味。", imgUrl: "https://images.unsplash.com/photo-1608032077018-c9aad9565d29?q=80&w=600&auto=format&fit=crop" },
    { category: "飲品", description: "從手工特調到經典飲品，每一杯都經過精心調製，讓您在美味之餘，也能享受沁涼與滿足。", imgUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=600&auto=format&fit=crop" },
    { category: "甜點", description: "我們的甜點選用頂級食材，手工製作，讓每一道甜點都成為餐後最完美的收尾。", imgUrl: "https://images.unsplash.com/photo-1541781550486-81b7a2328578?q=80&w=600&auto=format&fit=crop" }
  ];

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=18&nat=ch")
      .then((res) => res.json())
      .then((data) => {
        const feedbacks = [
          "餐點很好吃，環境很棒！",
          "服務非常好，推薦大家來試試。",
          "甜點超好吃， CP 值超高！",
          "氣氛很好，適合約會或聚餐。",
          "主餐份量十足，味道也很棒。",
          "飲品種類多元，手工特調推薦！",
          "店員很熱情，讓人感覺賓至如歸。",
          "餐廳裝潢很有設計感，非常舒適。",
          "配餐選擇豐富，份量剛剛好。",
          "沙拉超新鮮，吃起來超滿足！",
          "價格合理，值得再次光臨。",
          "甜點控必來，真的超推薦！",
          "餐點的擺盤很精緻，每一道菜都很用心。",
          "這裡的漢堡真的超讚，非常推薦。",
          "餐點搭配調酒簡直絕配！",
          "這裡是家庭聚餐的好選擇，環境很舒適。",
          "員工服務態度親切，讓人有賓至如歸的感覺。",
          "餐點的創意很有趣，值得一試！"
        ];

        setComments(data.results.map((person, index) => ({
          id: index,
          name: `${person.name.first} ${person.name.last}`,
          comment: feedbacks[index],
          img: person.picture.large,
          stars: Math.floor(Math.random() * 2) + 4 // 隨機 4 或 5 顆星
        })));
      });
  }, []);

  // 自動輪播 (hover 時暫停)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // 0 → 1 → 2 → 0
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  // 點分類時導向到商品頁
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <div className="position-relative" style={{ backgroundColor: "#1a202c", color: "white" }}>
        <motion.div
          className="position-absolute top-0 start-0 w-100 vh-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale: imageScale
          }}
        />

        <div className="position-relative d-flex flex-column align-items-center justify-content-center vh-100 text-center px-4">
          <motion.h2
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="display-3 fw-bold text-shadow"
            style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
          >
            歡迎來到
          </motion.h2>
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="logo-type display-3 fw-bold text-shadow"
            style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
          >
            Daniel&apos;s Burger
          </motion.h1>

          <motion.p
            className="mt-3 fs-4 fw-bold w-75 text-shadow"
            style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
          >
            在正宗的美式氛圍中享用最美味的漢堡、香脆薯條和手工蛋糕！
          </motion.p>

          <div className="row d-flex">
            <motion.div
              className="arrow-container col-6"
              style={{ opacity: fadeOpacity }}
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <button className="arrow-btn text-shadow" onClick={() => scrollTo("portfolio")}>
                開始點餐 <i className="fa fa-cutlery"></i>
              </button>
            </motion.div>

            <motion.div
              className="arrow-container col-6"
              style={{ opacity: fadeOpacity }}
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <button className="arrow-btn2 text-shadow" onClick={() => scrollTo("promo")}>
                神秘優惠 <i className="fa fa-cutlery"></i>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Portfolio (菜單分類) */}
        <div ref={portfolioSectionRef} className="container-fluid py-5 px-5 position-relative blurred-bg">
          <div className="container my-5">
            <h2 className="text-center text-white text-shadow pb-md-3 display-5 fw-bold">餐點分類</h2>
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                className={`row align-items-center mb-5 flex-column-reverse flex-md-row ${index % 2 === 1 ? "flex-md-row-reverse" : ""}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* 桌機版圖片區塊 (手機板不顯示) */}
                <motion.div
                  className="col-md-6 position-relative d-none d-md-block mt-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image-wrapper">
                    <img src={item.imgUrl} className="img-fluid rounded-4 w-100" alt={item.category} />
                  </div>
                </motion.div>

                {/* 文字區塊 - 桌機版 */}
                <motion.div
                  className="col-md-6 position-relative"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`p-4 text-dark rounded shadow-lg position-md-absolute text-center text-md-start ${index % 2 === 0 ? 'textLeft' : 'textRight'}`}
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(8px)",
                      top: "50%",
                      transform: "translateY(15%)",
                      width: "100%",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                      borderRadius: "12px",
                      zIndex: 2
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 手機版圖片內嵌 */}
                    <div className="d-md-none mb-3">
                      <img src={item.imgUrl} className="img-fluid rounded shadow-sm w-100" alt={item.category} />
                    </div>

                    <h3 className="fw-bold">{item.category}</h3>
                    <p className="text-dark text-start">{item.description}</p>
                    <button
                      className="btn btn-warning text-dark"
                      onClick={() => handleCategoryClick(item.category)}
                    >
                      前往點餐
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comments (顧客評價) */}
        <div className="container-fluid py-5 position-relative ">
          <div className="container my-5 px-5">
            <h2 className="text-center pb-4 display-5 fw-bold">聽顧客怎麼說</h2>
            <div className="position-relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex} // 當 activeIndex 改變時觸發動畫
                  // initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="row justify-content-center mt-4">
                    {comments.slice(activeIndex * 6, activeIndex * 6 + 6).map((member) => (
                      <div
                        key={member.id}
                        className="col-md-6 mb-4"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <motion.div
                          className="card p-3 shadow-sm d-flex flex-row align-items-center position-relative"
                          initial={{ scale: 0.95, opacity: 0 }}
                          whileInView={{ scale: 1.02, opacity: 1 }}
                          transition={{ duration: 0.3, delay: member.id * 0.2 }}
                        >
                          {/* 星星評價 (右上角) */}
                          <div className="position-absolute star-container">
                            {Array.from({ length: member.stars }).map((_, index) => (
                              <FaStar key={index} className="text-warning star-icon" />
                            ))}
                          </div>

                          {/* 顧客圖片 */}
                          <img
                            src={member?.img}
                            className="rounded-circle me-3 border border-2 shadow"
                            alt={member?.name}
                            style={{ width: "80px", height: "80px", flexShrink: 0 }}
                          />

                          {/* 顧客姓名與評論 */}
                          <div>
                            <h5 className="mb-1">{member?.name}</h5>
                            <p className="mb-0 text-muted">{member?.comment}</p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div ref={promoSectionRef} className="position-relative min-vh-100 d-flex align-items-center justify-content-center text-center bg-secondary text-white overflow-hidden">
          <motion.div
            className="position-absolute top-0 start-0 w-100 h-100 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1632203171982-cc0df6e9ceb4?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              scale: imageScale
            }}
          />
          <div className="position-relative d-flex flex-column gap-3 p-2 mt-5 w-75">
            <motion.h2
              className="display-5 fw-bold text-shadow mt-5"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              打卡好禮三選一
            </motion.h2>
            <motion.p
              className="fs-5 fw-bold text-shadow"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              出示Google五星評論的顧客, 我們將給予您以下優惠！
            </motion.p>
            <div className="row justify-content-center mt-4">
              {event.map((item, index) => (
                <motion.div
                  key={index}
                  className="col-md-4 col-12 mb-4"
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="card p-3 shadow-sm d-flex align-items-center position-relative"
                    key={index}
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >

                    <motion.div
                      className="card-img-container"
                      style={{
                        overflow: "hidden",  // 限制圖片超出範圍
                        borderRadius: "5px"
                      }}
                    >
                      <motion.img
                        src={item.imgUrl}
                        className="card-img-top"
                        style={{ height: '180px', objectFit: 'cover', width: "100%" }}
                        alt={item.title}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                    </div>
                  </motion.div>

                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-fluid py-5 pb-5 footer-bg">
          <div className="container px-3">
            <h2 className="text-center text-shadow display-5 fw-bold">餐廳位置</h2>

            <div
              className="row justify-content-center align-items-center mx-auto px-3"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                transform: "translateY(2%)",
                width: "100%",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
                zIndex: 2
              }}
            >
              {/* 左側 - 地圖 */}
              <div className="col-12 col-md-8 mb-4 mb-md-0 mb-3">
                <div className="map-container rounded overflow-hidden">
                  <iframe
                    title="餐廳位置"
                    width="100%"
                    height="380"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="mt-4 mb-3"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.332212885034!2d121.49686387480578!3d25.124456977757802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aef8f9e8aca1%3A0x7d52e5d69013bfd4!2zMTEy5Y-w5YyX5biC5YyX5oqV5Y2A5aSn5qWt6LevMTM26Jmf!5e0!3m2!1szh-TW!2stw!4v1742743492242!5m2!1szh-TW!2stw"
                  ></iframe>
                </div>
              </div>

              {/* 右側 - 餐廳資訊 */}
              <div className="col-12 col-md-4">
                <div className="info-box p-4 text-dark rounded text-center text-md-start mx-auto px-0" style={{ maxWidth: "350px" }}>
                  <h3 className="logo-type fw-bold text-dark mb-3 d-flex align-items-center justify-content-center justify-content-md-start">
                    <img src={logo} style={{ width: 50, marginRight: '10px' }} alt="Logo" />
                    Daniel&apos;s Burger
                  </h3>
                  <p className="mb-2"><strong>地址: </strong> 台北市北投區大業路136號</p>
                  <p className="mb-2"><strong>Email: </strong> imsmallnew@gmail.com</p>
                  <p className="mb-2"><strong>電話: </strong> 02 2898 1999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}