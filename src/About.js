import {Card, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function About() {
    return (
        <>
            <Card className="mt-4">                
                <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                        My name is <strong>Thi My Phuc Huynh</strong>, you can call me <strong>Mindy</strong>. 
                        <br/>I am a student at Seneca College in Computer Programming and Analysis.
                        <br/>I am interested in Web Development and wish to find a job in this area.
                        This is one of my assignments on learning React.
                    </Card.Text>
                    <LinkContainer to='https://github.com/MindyPhuc'>
                        <Button variant="primary" >GitHub</Button>
                    </LinkContainer>                    
                </Card.Body>
            </Card>
        </>
    );    
}