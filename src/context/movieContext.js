import { createContext ,useState} from "react";

export const MovieContext = createContext(null)

function Movie({children}){
const [MovieDetails, setMovieDetails] = useState()

    return(
        <MovieContext.Provider value={{MovieDetails,setMovieDetails}}>
            {children}
        </MovieContext.Provider>
    )
}


export default Movie