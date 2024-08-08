import { UserComponent } from "./components/UserComponent";

function App (){

const  Handle = () =>{
  alert("Welcome");
  };
  return (
    <>
    <UserComponent handleClick={Handle} />
    </>
  );
}


export default App;