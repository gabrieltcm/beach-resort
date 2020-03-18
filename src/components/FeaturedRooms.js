import React, { Component } from "react";
import { RoomContext } from "../Context";
import Loading from "./Loading";
import Room from "../components/Room";
import Title from "./Title";

export default class FeaturedRooms extends Component {
  // calling the context property
  static contextType = RoomContext;
  render() {
    let { loading, featuredRooms: rooms } = this.context;
    rooms = rooms.map(room => {
      return <Room key={room.id} room={room} />;
    });
    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {/* IF data is loading display Loading gif */}
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}
