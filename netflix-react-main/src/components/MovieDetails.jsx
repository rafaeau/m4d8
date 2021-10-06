import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {useParams} from "react-router-dom"

const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const [comments, setComments] = useState([]);

  const params = useParams()

  console.log({params})


  useEffect(() => {
    const retrievedIdFromURL = async () => {
      try {
        let resp = await fetch(
          "http://www.omdbapi.com/?apikey=24ad60e9&i=" + params.MovieId
        );

        if (resp.ok) {
          let data = await resp.json();
          console.log({data});
          setDetails(data);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" +
          params.MovieId,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjFmMTRiYjUzZDAwMTViMTllZDciLCJpYXQiOjE2MzM1MzAwMDYsImV4cCI6MTYzNDczOTYwNn0.GdfJ-EDwSZ6jBzi0en-TlUUnOh4ivv6RNugVY8qFAbc",
            },
          }
        );
        if (response.ok) {
          let data = await response.json();
          setComments(data);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrievedIdFromURL();
    fetchComments();
  }, [ params.MovieId]);

  return (
    <Container>
     {details &&  <Row className="justify-content-center">
   
          <Col md={8} className="text-center">
            <Card>
              <Card.Img variant="top" src={details.Poster} />
              <Card.Body>
                <Card.Title>{details.Title}</Card.Title>
                {/* <Card.Text>{comments}</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        
      </Row>}
    </Container>
  );
};

export default MovieDetails;
