import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardamomPriceComponent = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/prices');
                const cardamomPrices = response.data;
                setPrices(cardamomPrices);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <div>
            <h1>Prices</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date of Auction</th>
                        <th>Auctioneer</th>
                        <th>No. of Lots</th>
                        <th>Total Qty Arrived (Kgs)</th>
                        <th>Qty Sold (Kgs)</th>
                        <th>Max Price (Rs./Kg)</th>
                        <th>Avg. Price (Rs./Kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((price, index) => (
                        <tr key={index}>
                            <td>{price.date}</td>
                            <td>{price.auctioneer}</td>
                            <td>{price.lots}</td>
                            <td>{price.totalQty}</td>
                            <td>{price.qtySold}</td>
                            <td>{price.maxPrice}</td>
                            <td>{price.avgPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CardamomPriceComponent;
