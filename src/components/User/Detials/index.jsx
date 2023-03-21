import React from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

function Index() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(queryParams.get("data"));

  return (
    <>
      <section class="movie-detail">
        <div class="container">
          <figure class="movie-detail-banner">
            <img
              src={require("../../../images/Everything_Everywhere_All_at_Once.jpg")}
              alt=""
            />
            {/* <img src="./assets/images/movie-4.png" alt="Free guy movie poster"> */}

            <button class="play-btn">
              <ion-icon name="play-circle-outline"></ion-icon>
            </button>
          </figure>

          <div class="movie-detail-content">
            <p class="detail-subtitle">New Episodes</p>

            <h1 class="h1 detail-title">
              Free <strong>Guy</strong>
            </h1>

            <div class="meta-wrapper">
              <div class="badge-wrapper">
                <div class="badge badge-fill">PG 13</div>

                <div class="badge badge-outline">HD</div>
              </div>

              <div class="ganre-wrapper">
                <a href="#">Comedy,</a>

                <a href="#">Action,</a>

                <a href="#">Adventure,</a>

                <a href="#">Science Fiction</a>
              </div>

              <div class="date-time">
                <div>
                  <ion-icon name="calendar-outline"></ion-icon>

                  <time datetime="2021">2021</time>
                </div>

                <div>
                  <ion-icon name="time-outline"></ion-icon>

                  <time datetime="PT115M">115 min</time>
                </div>
              </div>
            </div>

            <p class="storyline">
              A bank teller called Guy realizes he is a background character in
              an open world video game called Free City that will soon go
              offline.
            </p>

            <div class="details-actions">
              <button class="share">
                <ion-icon name="share-social"></ion-icon>

                <span>Share</span>
              </button>

              <div class="title-wrapper">
                <p class="title">Prime Video</p>

                <p class="text">Streaming Channels</p>
              </div>

              <button class="btn btn-primary">
                <ion-icon name="play"></ion-icon>

                <span>Watch Now</span>
              </button>
            </div>

            <a href="./assets/images/movie-4.png" download class="download-btn">
              <span>Download</span>

              <ion-icon name="download-outline"></ion-icon>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;

// import { useLocation } from '@reach/router';

// function NewPage() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const data = JSON.parse(queryParams.get('data'));

//   return (
//     <div>
//       <h1>New Page</h1>
//       <p>Data: {data.name} ({data.age} years old)</p>
//     </div>
//   );
// }
