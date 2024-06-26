import React, { useEffect, useState } from "react";
import styles from './landing.module.css';
import axios from 'axios';
import { Link } from "react-router-dom";


const LandingPage = () => {
  let [reviews,SetReviews] = useState([]);
  useEffect(()=>{
    handleReview();
    renderRandomReview();
  },[]);
  const handleReview = async()=>{
    try{
      // let response = await axios.get('http://localhost:4000/reviews');
      let response = await axios.get('https://car-service-backend-psi.vercel.app/reviews');
      SetReviews(response.data.message);
      return;
    }catch(err){
      return console.log(err);
    }
  }
  function selectRandomReviews(){
    const shuffleReviews = reviews.sort(()=>0.5-Math.random());
    return shuffleReviews.slice(0,4);
  }
  function renderRandomReview(){
    const randomReview = selectRandomReviews();
    return randomReview.map((review,index)=>(
      <div key={index} className={styles.reviewItem}>
      <div>
        <br/>{review.content}
      </div>
      <div>
        <br/><strong>{review.userName}</strong>
        </div>
      </div>
    ));
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.textContainer}>
          <div className={styles.textHeading}>Welcome to SpeedyShine.</div> <br />
          <div className={styles.textMain}>
            Your one-stop solution for all your car service needs! With
            SpeedyShine, taking care of your vehicle has never been easier.
            Whether it's a quick wash, a detailed interior cleaning, or a
            full-service maintenance check, we've got you covered. <br/>
            <div>
            Discover the ease and satisfaction of using SpeedyShine. Book now
            and experience the difference! <Link to="/signup"><button> Sign up</button></Link>
            </div> <br/>Why choose
            us?
          </div>
          
          <div className={styles.textPoints}>
            <br />
            <div className={styles.pointBox}>
              <div className={styles.points}><strong><br />Convenience:</strong><br /></div> <div>Book your service anytime, anywhere,
              right from your smartphone.</div>
            </div>
            <div className={styles.pointBox}>
            <div className={styles.points}><strong><br />Quality:</strong></div><div>Our team of experienced professionals
              ensures top-notch service every time.</div>
            </div>
            <div className={styles.pointBox}>
            <div className={styles.points}><strong><br />Reliability:</strong><br /></div> <div>Trust in our commitment to
              punctuality and efficiency.</div>
            </div>
            <div className={styles.pointBox}>
            <div className={styles.points}><strong><br />Customization:</strong><br /></div> <div>Tailor services to fit your
              schedule and budget.</div>
            </div>
            <div className={styles.pointBox}>
            <br /><strong>Safety:<br /> </strong> We prioritize the safety and well-being
              of your vehicle.
            </div>{" "}
          </div>
            
        </div>
        <div className={styles.reviewContainer}>
            <div className={styles.reviewHeading}><strong>Reviews</strong></div>
            <div className={styles.reviews}>{renderRandomReview()}</div>
            <div className ={styles.moreReviews}><Link to="/reviews"><button>See more reviews</button></Link> </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;




