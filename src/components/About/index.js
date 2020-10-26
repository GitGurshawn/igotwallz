import React from 'react';
import {Link} from "react-router-dom";
import Faq from "react-faq-component";
import './styles.css';

// Used react-faq
const data = {
  title: "Website Information",
  rows: [
      {
          title: "Disclaimer",
          content: `This website is a mini-project I did to learn more about front-end development. I do not make any money from this. I am not affiliated with Valorant/Riot Games.
          The game art, maps, and icons are all owned by Riot Games. The font I used can be found here (https://www.dafont.com/valorant.font).`,
      },
      {
          title: "What is this?",
          content:
            `This website displays wallbang locations for a game called Valorant developed by Riot Games. It is aimed to help new players learn more
            about the game and hopefully increase their game knowledge.`,
      },
      {
          title: "How do I use this?",
          content: `On the home page, click on one of game maps and you will be taken to a new page with a map that has several icons 
          scattered all over it. If you click on an icon, a youtube video showing the wallbang location will display. You can switch maps on the bottom right
          of the page.`,
      },
      {
        title: "Future development plans?",
        content: `I plan on expanding the website to have information about all the agents such as ability lineups. I want this website to serve as some sort of cheat sheet
        for new players to learn more about the game.`,
      },
      {
          title: "Contact",
          content: `Email: agentcheatsheet@gmail.com`,
      },
  ],
};

const styles = {
  bgColor: '#fa4454',
  titleTextColor: "black",
  rowTitleColor: "black",
};

const config = {
  // N/A
};

function About() {
  return (
    <div class="pop-in">
      <nav class="navbar">
        <Link to={{ pathname: '/'}}><button className="about-home-btn" type="button" class="btn btn-dark">Home</button></Link>
        <div class="home-title">igotwallz</div>
      </nav>

      <div className="faq-container">
        <Faq data={data} styles={styles} config={config}/>
      </div>
    </div>
  );
}

export default About;