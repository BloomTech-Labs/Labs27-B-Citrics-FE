import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Carousel } from 'antd';
import React from 'react';

const CitySelect = props => {
    return (
        <div className="city-select">
            <div className="compare-list">
                <Carousel
                    afterChange={() => console.log("Changed")}
                    dotPosition="bottom"
                >
                    <div>
                        <h3>Los Angeles</h3>
                    </div>
                    <div>
                        <h3>New York</h3>
                    </div>
                    <div>
                        <h3>Minnesota</h3>
                    </div>
                </Carousel>
                <Button className="btn">View Comparison</Button>
            </div>
            <div className="city-info">
                <h2>New York, NY</h2>
                <img
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt="City Banner"
                    className="city-select-banner"
                />
                <p>
                    lorem ipsum dolor sit amet
                    Lorem ipsum dolor sit amet
                    consectetur adipisicing elit.
                    Quibusdam officiis libero non
                    veniam minima animi aperiam
                    inventore! Minima, maxime.
                    Itaque voluptatum, eos a tenetur
                    inventore beatae tempore unde
                    dignissimos dolor incidunt magni
                    cum deserunt enim dolorem ex et,
                    facere consequatur ab quae reiciendis
                    error quasi! Facilis distinctio odio nulla
                    consectetur.
                </p>
            </div>
            <FontAwesomeIcon style={{ color: "red" }} icon={['fas', 'trash']}></FontAwesomeIcon>
        </div>
    );
};

export default CitySelect;