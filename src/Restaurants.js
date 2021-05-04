import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {Card, Table, Pagination} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export default function Restaurants (props) {

    const restaurantAPI = "https://guarded-mountain-04743.herokuapp.com/api/restaurants";

    const [ restaurants, setRestaurants ] = useState([]);
    const [ page, setPage ] = useState(1);    

    const perPage = 10;
    let history = useHistory();    
   
    const previousPage = ()=> {if (page > 1) setPage(prev=> prev - 1)};
    const nextPage = () => setPage(prev => prev + 1);  
    
    const borough = queryString.parse(props.query).borough;
    const uri = borough ? `${restaurantAPI}?page=${page}&perPage=${perPage}&borough=${borough}` : `${restaurantAPI}?page=${page}&perPage=${perPage}`;

    useEffect(()=>{               
        fetch(uri)
        .then(res => res.json())
        .then((result)=>{             
            setRestaurants(result);
            console.log(restaurants);
        });
    },[props.query, page]);

    if (restaurants && restaurants.length > 0) {
        return (
            <>
            <Card className="mt-2">                
                <Card.Body className="p-2">
                    <Card.Title>Restaurant List</Card.Title>
                    <Card.Text>
                        Full list of restaurants. Optional sorted by borough
                    </Card.Text>                                       
                </Card.Body>
            </Card>

            <Table striped bordered hover className="mt-2">
                <thead>
                    <tr>                        
                        <th>Name</th>
                        <th>Address</th>
                        <th>Borough</th>
                        <th>Cuisine</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants.map(restaurant=>(
                            <tr onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}} key={restaurant._id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address.building} {restaurant.address.street}</td>
                                <td>{restaurant.borough}</td>
                                <td>{restaurant.cuisine}</td>
                            </tr>                            
                        ))                            
                    }
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={previousPage}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}/>
            </Pagination>

        </>
        );
    }
    
    if (restaurants.length == 0) {
        return(
            <Card className="mt-3">                
                <Card.Body>                        
                    <Card.Text>
                        Loading Restaurants...
                    </Card.Text>                                       
                </Card.Body>
            </Card>
        );       
    }
    
    return(
        <Card className="mt-3">                
            <Card.Body>                        
                <Card.Text>
                    No Restaurants Found
                </Card.Text>                                       
            </Card.Body>
        </Card>
    );                 
}