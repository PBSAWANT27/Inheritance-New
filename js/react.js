import React, { useState, useEffect } from 'react';
import './style2.css'; // Import the styles (converted from your CSS)
import './index2.css'; // Any additional CSS required

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isSticky ? 'sticky' : ''}>
      <a href="#" className="logo">QWE<span>Ry</span></a>
      <ul className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Explore</a></li>
        <li><a href="#">Events</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Plan Event</a></li>
      </ul>
      <div className="h-right">
        <a href="#">Follow Us</a>
        <a href="#"><i className="ri-instagram-fill"></i></a>
        <a href="#"><i className="ri-twitter-fill"></i></a>
        <a href="#"><i className="ri-facebook-fill"></i></a>
        <div 
          className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`} 
          id="menu-icon" 
          onClick={() => setMenuOpen(!isMenuOpen)}
        ></div>
      </div>
    </header>
  );
};

const Section = ({ title, content }) => (
  <section className={title.toLowerCase().replace(' ', '')}>
    <div className="center-text">
      <h2>{title}</h2>
    </div>
    <div className="sociale-content">
      {content.map((item, index) => (
        <div className="box" key={index}>
          <img src={item.image} alt={item.alt} />
          <h6>{item.subtitle}</h6>
          <h4>{item.description}</h4>
        </div>
      ))}
      <div className="center-btn">
        <a href="#" className="btn">Get Started</a>
      </div>
    </div>
  </section>
);

const App = () => {
  const sections = [
    {
      title: 'Social Events',
      content: [
        {
          image: 'wedding.jpg',
          alt: 'Wedding',
          subtitle: '',
          description: 'Creating unforgettable weddings with flawless planning, stunning décor, and personalized touches for your special day.'
        },
        {
          image: 'birthday.jpg',
          alt: 'Birthday',
          subtitle: '',
          description: 'Making birthdays extraordinary with creative themes, vibrant décor, and seamless planning for unforgettable celebrations.'
        },
        {
          image: 'function.jpg',
          alt: 'Function',
          subtitle: '',
          description: 'Organizing memorable functions with tailored planning, elegant setups, and exceptional services for every special occasion.'
        }
      ]
    },
    {
      title: 'Corporate Events',
      content: [
        {
          image: 'meeting.jpg',
          alt: 'Meeting',
          subtitle: '',
          description: 'Delivering exceptional conferences with strategic planning, modern facilities, and flawless execution for impactful business gatherings.'
        },
        {
          image: 'seminar.jpg',
          alt: 'Seminar',
          subtitle: '',
          description: 'Organizing impactful seminars with expert planning, advanced technology, and seamless coordination for professional success.'
        },
        {
          image: 'art.jpg',
          alt: 'Workshop',
          subtitle: '',
          description: 'Designing engaging workshops with expert coordination, interactive setups, and seamless logistics for skill-building and collaboration.'
        }
      ]
    },
    {
      title: 'Entertainment Events',
      content: [
        {
          image: 'concert.jpg',
          alt: 'Concert',
          subtitle: '',
          description: 'Spectacular concerts with dynamic performances by your favourite artists, immersive sound, and execution for unforgettable entertainment experiences.'
        },
        {
          image: 'movie.jpg',
          alt: 'Movie',
          subtitle: '',
          description: 'Captivating movie screenings with high-quality visuals, comfortable seating, and seamless arrangements for cinematic experiences.'
        },
        {
          image: 'comedy.jpg',
          alt: 'Comedy',
          subtitle: '',
          description: 'Laughter-filled comedy shows with top talented comedians, vibrant setups, and seamless organization for unforgettable entertainment.'
        }
      ]
    },
    {
      title: 'Charity Events',
      content: [
        {
          image: 'fundraiser.jpg',
          alt: 'Fundraiser',
          subtitle: '',
          description: 'Attend impactful fundraisers with creative themes, seamless planning, and heartfelt engagement to support meaningful causes.'
        },
        {
          image: 'aware.jpg',
          alt: 'Awareness Campaign',
          subtitle: '',
          description: 'Finding impactful awareness campaigns and drives with strategic planning, community engagement, and seamless execution to inspire positive change.'
        },
        {
          image: 'auction.jpg',
          alt: 'Auction',
          subtitle: '',
          description: 'Impactful charity auctions with unique offerings, elegant arrangements, and efficient coordination to support valuable charitable initiatives.'
        }
      ]
    },
    {
      title: 'Cultural Events',
      content: [
        {
          image: 'art1.jpg',
          alt: 'Art Exhibition',
          subtitle: '',
          description: 'Art exhibitions highlight creativity, history, and diverse perspectives, offering interactive experiences and fostering community engagement and learning.'
        },
        {
          image: 'dance.jpg',
          alt: 'Dance Performance',
          subtitle: '',
          description: 'Cultural performances feature traditional music and dance promoting cultural heritage, artistic expression, and fostering community unity.'
        },
        {
          image: 'play.jpg',
          alt: 'Theatrical Play',
          subtitle: '',
          description: 'Theatrical plays explore diverse human experiences through storytelling, combining drama, emotion, and performance to engage audiences and spark reflection.'
        }
      ]
    }
  ];

  return (
    <div>
      <Header />
      <section className="home">
        <div className="home-text">
          <h5>Let's</h5>
          <h1>Plan your<br />own event</h1>
          <p>A properly executed event can be leveraged to support an organization’s strategic vision, incorporated into a
            company’s marketing plan, or used to build networks and client loyalty.</p>
          <a href="#" className="btn">Create an event</a>
        </div>
      </section>
      {sections.map((section, index) => (
        <Section key={index} title={section.title} content={section.content} />
      ))}
    </div>
  );
};

export default App;
