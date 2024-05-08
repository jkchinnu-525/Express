import React from 'react';
export function BussinessCard(props) {
    return <div style ={styles.card}>
        <h1 style ={styles.name}>{props.name}</h1>
        <p style = {styles.description}>{props.description}</p>
        <h3>Interests</h3>
        <ul>
            {Array.isArray(props.interests) &&
            props.interests.map(function(interest,index) {
                return <li key={index}>{interest}
                </li>
            })}
        </ul>
        <div>
        <button style = {styles.Linkedin}><a href={props.linkedin} style = {styles.Text}>LinkedIn</a></button>
        <button style = {styles.Twitter}><a href={props.twitter} style ={styles.Text}>Twitter</a></button>
        </div>
    </div>
}
    const styles = {
        card : {
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            margin: '20px',
            maxWidth: '400px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f8f9fa'
            },
        name : {
            fontSize : "24px",
            margin : "5px",
            backgroundcolor : "#040c28"
        },
        description : {
            margin : "15px",
            padding : "7px",
            backgroundcolor :"#202124"
        },
        Text : {
            color : "#e7f3e9",
        },
        Linkedin : {
            border : "10px",
            margin : "10px",
            padding : "10px 15px",
            background : "#007BFF",
            display : "flex",
            borderRadius: '5px'
        },
        Twitter : {
            border : "10px",
            margin : "10px",
            padding : "10px 22px",
            background : "#131313",
            display : "flex",
            borderRadius: '5px'
        }
};
