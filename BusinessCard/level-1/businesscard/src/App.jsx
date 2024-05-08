import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BussinessCard } from './Bussinesscard'



function App() {
  const name = "JAYA KRISHNA MADAMANCHI";
  const description = "I am a freelancer"
  const Linkedin = "https.//linkedin.com/";
  const Twitter = "https.//twitter.com/";
  const interests = ["Coding", "Movies" ,"Cricket"];
  return (
    <div>
      <BussinessCard name={name} description={description} Linkedin={Linkedin} Twitter={Twitter} interests={interests}></BussinessCard>
    </div>
  );
}
export default App
