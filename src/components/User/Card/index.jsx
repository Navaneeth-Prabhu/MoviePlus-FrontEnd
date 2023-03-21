import React from 'react'
// import { useHistory } from 'react-router';
import styles from './Card_seeAll.module.css';

const Card = ({item}) => {

    return (
        <div className={styles.card}> 
            {/* <img src={banner_image_url} alt={movie_name} /> */}
            <div className={styles.title}>{ item.title }</div>
            {/* <div className={styles.genre}>{movie_genre?.map((genre, index)=>index === movie_genre.length-1?genre.genre:genre.genre + "/")}</div> */}
        </div>
    )
}

export default Card