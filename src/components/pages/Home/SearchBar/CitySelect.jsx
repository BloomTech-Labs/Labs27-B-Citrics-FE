import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CityData from '../../../../data/cities';

const cityImage = "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const CitySelect = props => {
    const history = useHistory();

    const compareList = useSelector(state => state.cityReducer.markers);
    const [cities, setCities] = useState([]);

    const CityId = compareList.map(city => {
        let fullName = `${city.cityName}, ${city.stateName}`;
        return CityData[fullName];
    });
    useEffect(() => {
        let first = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[0]}`;
        let second = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[1]}`;
        let third = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[2]}`;

        if (CityId.length === 3) {
            axios
                .all([axios.get(first), axios.get(second), axios.get(third)])
                .then(
                    axios.spread((first, second, third) => {
                        console.log(first.data, second.data, third.data);
                        setCities([first.data, second.data, third.data]);
                    })
                )
                .catch(err => console.log(err));
        } else if (CityId.length === 2) {
            axios
                .all([axios.get(first), axios.get(second)])
                .then(
                    axios.spread((first, second) => {
                        console.log(first.data, second.data);
                        setCities([first.data, second.data]);
                    })
                )
                .catch(err => console.log(err));
        } else {
            axios.get(first).then(res => {
                console.log(res.data);
                setCities([first.data]);
            });
        }
    }, [props.list]);

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
                    <Button
                        to="/compare"
                        onClick={() => history.push('/compare')}
                        className="btn compare">View Comparison</Button>}
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
                            {/* 
                            Population
                            WebsiteURL
                            Rent
                            HouseholdIncome
                             */}
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