import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { lcName, rcName } from './operatorSlice';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Matchpredata() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [leftFlag, setLeftFlag] = useState('');
    const [rightFlag, setRightFlag] = useState('');

    useEffect(() => {
        // Fetch list of countries
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });

        // Cleanup socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            leftCountryName: '',
            rightCountryName: '',
        },
        onSubmit: values => {
            // Find selected country objects
            const leftCountry = countries.find(country => country.name.common === values.leftCountryName);
            const rightCountry = countries.find(country => country.name.common === values.rightCountryName);

            // Dispatch the country name and flag URL
            dispatch(lcName({ name: values.leftCountryName, flag: leftFlag }));
            dispatch(rcName({ name: values.rightCountryName, flag: rightFlag }));

            // Emit the entered country names through the socket
            socket.emit('updateCountries', {
                leftCountryName: values.leftCountryName,
                rightCountryName: values.rightCountryName,
                leftCountryFlag: leftFlag,
                rightCountryFlag: rightFlag,
            });

            navigate("/operator");
        },
    });

    const handleCountryChange = (event, setFlag) => {
        const countryName = event.target.value;
        const country = countries.find(c => c.name.common === countryName);

        if (country) {
            // console.log('Selected Country:', country); // Debugging line
            // console.log('Flags:', country.flags.png); // Debugging line
            setFlag(country.flags.png || country.flags.svg || '');
        } else {
            setFlag('');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching countries: {error.message}</p>;

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center">
            <h1 className="display-3 m-2 p-2 text-center">Pre Match Data:</h1>
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group w-50">
                    <label htmlFor="leftCountryName">Country 1</label>
                    <select
                        id="leftCountryName"
                        name="leftCountryName"
                        onChange={(e) => {
                            formik.handleChange(e);
                            handleCountryChange(e, setLeftFlag);
                        }}
                        value={formik.values.leftCountryName}
                        className="form-control mb-3"
                    >
                        <option value="" label="Select Country" />
                        {countries.map(country => (
                            <option key={country.cca3} value={country.name.common}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group w-50">
                    <label htmlFor="rightCountryName">Country 2</label>
                    <select
                        id="rightCountryName"
                        name="rightCountryName"
                        onChange={(e) => {
                            formik.handleChange(e);
                            handleCountryChange(e, setRightFlag);
                        }}
                        value={formik.values.rightCountryName}
                        className="form-control mb-3"
                    >
                        <option value="" label="Select Country" />
                        {countries.map(country => (
                            <option key={country.cca3} value={country.name.common}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Matchpredata;
