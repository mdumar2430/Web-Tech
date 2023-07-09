import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const LandingComponent = () => {
    return(
        <>
            <h1>Enter into Student Info System</h1>
            <Link to = "/chatbot">
                <Button variant='primary'>
                    Enroll now!
                </Button>
            </Link>
        </>
    )

}

export default LandingComponent;