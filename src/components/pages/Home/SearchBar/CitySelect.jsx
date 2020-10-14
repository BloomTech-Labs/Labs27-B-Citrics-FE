import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Carousel } from 'antd';
import React from 'react';

const cityImage = "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const CitySelect = props => {
    return (
        <div className="city-select">
            <div className="compare-list">
                {props.list.length > 1
                    ? <>
                        <h3>Current List</h3>
                        <Carousel
                            afterChange={() => console.log("Changed")}
                            dotPosition="bottom"
                            className="carousel"
                        >
                            {props.list.map(item => (
                                <div
                                    className="city-list-item"
                                    onClick={() => props.setSelected(item)}
                                    style={{ backgroundImage: `url(${cityImage})` }}
                                >{item.cityName}</div>
                            ))}
                        </Carousel>
                    </>
                    : null}
                {props.list.length > 1 &&
                    <Button className="btn compare">View Comparison</Button>}
            </div>
            <div className="city-info">
                {props.list.length !== 0 && props.selected
                    ? <> <h2>{props.selected.cityName}</h2>
                        <img
                            src={cityImage}
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
                    </>
                    : <div style={{
                        textAlign: 'center',
                        fontSize: "1.7rem",
                        opacity: 0.5
                    }}>
                        <h3>Select a City</h3>
                    </div>
                }
            </div>
            <FontAwesomeIcon style={{
                color: "red",
                position: "absolute",
                bottom: 10,
                right: 10
            }} icon={['fas', 'trash']}></FontAwesomeIcon>
        </div >
    );
};

export default CitySelect;