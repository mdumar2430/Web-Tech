import { useSelector } from 'react-redux';
const ExitComponent = () => {
    const { name, age } = useSelector((state) => state);

    return (
        <div>
          <p>Your name "{name}" and age "{age}" has been added to student system. You may now exit.</p>
        </div>
    );

}
export default ExitComponent;