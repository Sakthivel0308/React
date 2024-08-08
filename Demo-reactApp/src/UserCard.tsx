import "./userCards.css"

interface IProps {
  status: boolean;
  name: string;
  img: string;
  description: string;
  city: string;
  skills: string[];
}

const UserDate = [
  {
    name: "james",
    city: "chennai",
    description: "Back-end",
    img: "./Images/heart.jpeg",
    skills: ["HTML", "CSS", "JavaScript", "React", "nodejs"],
    status: true,
  },
  {
    name: "sam",
    city: "madurai",
    description: "front-end",
    img: "./Images/th.jpeg",
    skills: ["HTML", "CSS", "JavaScript", "React", "nodejs"],
    status: true,
  },
  {
    name: "Ram",
    city: "Ooty",
    description: "Back-end",
    img: "./Images/th (7).jpeg",
    skills: ["HTML", "CSS", "JavaScript", "React", "nodejs"],
    status: false,
  }
]
function User(props: IProps) {
  return (
    <div className="card-container">
      <span className={props.status == true ? "Pro online" : "Pro offline"}>
        {props.status == true ? "Online" : "offline"}
      </span>
      <img className="img" src={props.img} alt="person image" />
      <h2 className="Name">{props.name}</h2>
      <h3 className="designation">{props.description}</h3>
      <h4 className="city">{props.city}</h4>
      <div className="buttons">
        <button className="primary">Message</button>
        <button className="primary outline">Follow</button>
      </div>
      <div className="skills">
        <h6>skills</h6>
        <ul>
          {props.skills.map((skills, index) => (
            <li key={index}>{skills}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export const UserCard = () => {
  return (
    <>
    {
      UserDate.map((user,index) => (
        <User
          key={index}
          name={user.name}
          city={user.city}
          description={user.description}
          img={user.img}
          skills={user.skills}
          status={user.status}
        />
      ))
    }
    </>
  );
};
/*<User
      name="james"
      city="chennai"
      description="Back-end"
      img="./Images/heart.jpeg"
      skills={["HTML", "CSS", "JavaScript", "React", "nodejs"]}
      status={false}
    />*/