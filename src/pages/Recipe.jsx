import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import React from 'react'

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        setDetails(detailData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailsWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
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
                <div>
                    <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                </div>
            </Info>
        </DetailsWrapper>
    )
}

const Margin = styled.div`
  margin: 2rem 0rem 0rem 0rem;
`;

const DetailsWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    /* img {
        width: 100%;
        border-radius: 2rem;
    } */

    h2 {
        margin-bottom: 2rem;
    }

    li {
        font-size: 1.3rem;
        line-height: 2.5rem;
    }

    ul {
        margin-top: 2rem;
    }
`;

const Button = styled.div`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px, solid black
    margin-right: 2rem;
    font-weight: 600;
    height: 18%;
`;

const Info = styled.div`
    margin-left: 10rem;
    /* display: flex; */
`;

export default Recipe
