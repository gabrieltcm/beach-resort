import React, { Component } from "react";
//import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: Boolean,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  //getData from contentful
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortRoom",
        order: "sys.createdAt"
      });

      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      // Gets or calculates the maxPrice based on the data instead of setting/guessing it
      let maxPrice = Math.max(...rooms.map(item => item.price));
      // gets the size instead
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  formatData(arr) {
    let tempItems = arr.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = slugThatIsPassed => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slugThatIsPassed);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    //all the rooms
    let tempRooms = [...rooms];

    //transform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by Room Type
    if (type !== "all") {
      // CHECK THIS ALL, WHY MUST THE initial A be Capital?
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    //filter by room price
    tempRooms = tempRooms.filter(room => room.price <= price);

    //filter by room size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    // change state
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      //PROVIDER: allowing all the components in the component tree to access it
      // ... means get all or get the remaining data in the myData
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

//Consumer is to access the information
const RoomConsumer = RoomContext.Consumer;

// Creating a higher order component
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
