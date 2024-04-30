import React, { useEffect, useState } from "react";
import "./landing.css";
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
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDE1NmVkY2ZhYzM1MTQyZDM1OTg0MyIsImlhdCI6MTcxMTM2Mzk2MiwiZXhwIjoxNzEzODgzOTYyfQ.meokuuJDTZOGhNygg745Y3ku0xfke2TFT51ViDwCNWQ';
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let response = await axios.get('http://localhost:4000/reviews');
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
      <div key={index} className='reviewItem'>
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
      <div className="mainContainer">
        <div className="textContainer">
          <div className="textHeading">Welcome to SpeedyShine.</div> <br />
          <div className="textMain">
            Your one-stop solution for all your car service needs! With
            SpeedyShine, taking care of your vehicle has never been easier.
            Whether it's a quick wash, a detailed interior cleaning, or a
            full-service maintenance check, we've got you covered. <br/> <br/>Why choose
            us?
          </div>
          <div className="textPoints">
            <br />
            <div className="pointBox">
              <div className="points"><strong><br />Convenience:</strong><br /></div> <div>Book your service anytime, anywhere,
              right from your smartphone.</div>
            </div>
            <br />
            <div className="pointBox">
            <div className="points"><strong><br />Quality:</strong></div><div>Our team of experienced professionals
              ensures top-notch service every time.</div>
            </div>
            <br />
            <div className="pointBox">
            <div className="points"><strong><br />Reliability:</strong><br /></div> <div>Trust in our commitment to
              punctuality and efficiency.</div>
            </div>
            <br />
            <div className="pointBox">
            <div className="points"><strong><br />Customization:</strong><br /></div> <div>Tailor services to fit your
              schedule and budget.</div>
            </div>
            <br />
            <div className="pointBox">
            <br /><strong>Safety:<br /> </strong> We prioritize the safety and well-being
              of your vehicle.
            </div>{" "}
          </div>
            <br />
            Discover the ease and satisfaction of using SpeedyShine. Book now
            and experience the difference!
        </div>
        <div className="reviewContainer">
            <div className='reviewHeading'><strong>Reviews</strong></div>
            <div className='reviews'>{renderRandomReview()}</div>
            <div className ="moreReviews"><Link to="/reviews"><button>See more reviews</button></Link> </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;




