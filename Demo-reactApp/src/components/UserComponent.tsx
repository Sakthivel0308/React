
interface Props{
    handleClick: () => void;
}
export const UserComponent = (props:Props) => {
    const {handleClick} = props;
  return (
    <div>
        <h1>UserComponent</h1>
        <button onClick={handleClick}>Click Me</button>
    </div>
  )
}