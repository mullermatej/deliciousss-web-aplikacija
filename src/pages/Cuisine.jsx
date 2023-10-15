import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

// use params dohvaca keyword iz url-a

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        let cuisine_name = JSON.stringify(params.type);
        const check = localStorage.getItem(`cuisine_${cuisine_name}`);

        // if ((cname = 'Thai')) console.log(1);

        if (check) {
            setCuisine(JSON.parse(check));
        } else {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
            );
            // name je dinamicki, hvaca ono sto je u url-u
            const recipes = await data.json();
            setCuisine(recipes.results);

            localStorage.setItem(
                `cuisine_${cuisine_name}`,
                JSON.stringify(recipes.results)
            );
        }
    };

    // use effect radi samo na mount, ako stisnem link to nije mount
    useEffect(() => {
        getCuisine(params.type);
        // console.log(JSON.stringify(params)); // {name: "italian"}
    }, [params.type]);
    return (
        <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
        >
            {cuisine.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

// moze i motion.div ovdje jer gore nemam div tag nego grid :)
const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Cuisine;
