import { useState } from "react";

interface Props {
  cities: string[];
  heading: string;

  onSelctedItem: (item: string) => void;
}

function ListGroup({ cities, heading, onSelctedItem }: Props) {
  let [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {cities.map((city, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={city}
            onClick={() => {
              setSelectedIndex(index);
              onSelctedItem(city);
            }}
          >
            {city}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
