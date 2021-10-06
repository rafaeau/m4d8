import { useEffect, useState } from "react"

const MovieDetails = ({ match }) => {
    const [details, setDetails] = useState(null);
    const [comments, setComments] = useState([])

    useEffect(() => {

        const retrievedIdFromURL = async () => {

            try {
                let resp = await fetch(
                    'http://www.omdbapi.com/?apikey=c95e7b4e&i=' + match.params.movieID
                )

                if (resp.ok) {
                    let data = await resp.json();
                    console.log(data);
                    setDetails(data);
                }
                else {
                    console.log("Error");
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        const fetchComments = async () => {
            try {
                let response = await fetch(
                    "https://striveschool-api.herokuapp.com/api/comments/" + match.params.movieID,
                    {
                        headers: {
                            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjFmMTRiYjUzZDAwMTViMTllZDciLCJpYXQiOjE2MzM1MzAwMDYsImV4cCI6MTYzNDczOTYwNn0.GdfJ-EDwSZ6jBzi0en-TlUUnOh4ivv6RNugVY8qFAbc",
                        },
                    }
                );
                if (response.ok) {
                    let data = await response.json();
                    setComments(data);
                }
                else {
                    console.log("Error");
                }
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchDetails();
        fetchComments();
    }, [match.params.movieID]);

})
}


export default MovieDetails
