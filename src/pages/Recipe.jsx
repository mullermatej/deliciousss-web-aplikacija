import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import React from 'react';

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({}); // details = varijabla, setDetails = funkcija za details
    const [activeTab, setActiveTab] = useState('instructions'); // instructions je aktivno po default

    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
        >
            <div>
                <h2>{details.title}</h2>

                <img src={details.image} alt="" />
            </div>
            <Info>
                <Button
                    className={activeTab === 'instructions' ? 'active' : ''}
                    onClick={() => setActiveTab('instructions')}
                >
                    Instructions
                </Button>
                <Button
                    className={activeTab === 'ingredients' ? 'active' : ''}
                    onClick={() => setActiveTab('ingredients')}
                >
                    Ingredients
                </Button>
                {activeTab === 'instructions' && (
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.summary,
                            }}
                        ></h3>
                        {/* pretvaranje html koda dohvacenog u summary iz API-a da se ne vide tagovi na stranici */}
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.instructions,
                            }}
                        ></h3>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled(motion.div)`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    img {
        border-radius: 2rem;
    }
    h2 {
        margin-bottom: 2rem;
    }
    h3 {
        font-size: 1.2rem;
        margin: 0rem 0rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-left: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin: 0rem 2rem 1rem 0rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;
`;

export default Recipe;
