import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button, Carousel } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const cityImage = "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const CitySelect = props => {
    const history = useHistory();
    const cityInfo = useSelector(state => state.cityReducer.cityInfo);

    let selectedInfoArrRef = useRef([]);

    useEffect(() => {
        selectedInfoArrRef.current = cityInfo.filter(city => {
            return city.city === props.selected.cityName;
        });
    }, [cityInfo, props.list, props.selected]);

    const selectedInfo = selectedInfoArrRef.current[0];

    console.log(cityInfo);
    console.log(selectedInfoArrRef.current);

    return (
        <div className="city-select">
            <div className="compare-list">
                {props.list.length > 1
                    ? <>
                        <h3>Current List</h3>
                        <Carousel
                            dotPosition="bottom"
                            className="carousel"
                        >
                            {props.list.map((item, i) => (
                                <div
                                    className="city-list-item"
                                    onClick={() => props.setSelected(item)}
                                >{item.cityName}</div>
                            ))}
                        </Carousel>
                    </>
                    : null}
                {props.list.length > 1 &&
                    <Button
                        to="/compare"
                        onClick={() => history.push('/compare')}
                        className="btn compare">View Comparison</Button>}
            </div>
            <div className="city-info">
                {props.list.length !== 0 && props.selected
                    ? <> <h2>{props.selected.cityName}</h2>
                        <img
                            src={selectedInfo.wiki_img_url}
                            alt="City Banner"
                            className="city-select-banner"
                            onError={cityImage}
                        />

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