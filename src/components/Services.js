import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info:
          "Come and enjoy our welcome drink which will be our finest cocktails while you wait for us to check you in"
      },
      {
        icon: <FaHiking />,
        title: "Endless Hiking",
        info:
          "Love to hike on your trip? We too provide an immense guided hiking experience for you and your family. Our tour guides are well trained, so you dont have to worry one bit"
      },
      {
        icon: <FaShuttleVan />,
        title: "Free Shuttle Van",
        info:
          "Trouble getting to our hotel? Or would want to visit places? Not to worry as we provide free shuttle service to wherever you would like to go."
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info:
          "Indulge yourself with our finest beers. It is claimed to keep you on the edge of your seat just by having one pint. Up for the challenge?"
      }
    ]
  };

  render() {
    return (
      <section className="services">
        <Title title="services"></Title>
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
