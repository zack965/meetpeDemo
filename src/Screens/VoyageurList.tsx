import React, { useEffect, useState } from 'react'
import { User } from './VoyageurProfile'
import axios from 'axios'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
function VoyageurList() {
    const [Voyageurs, setVoyageurs] = useState<User[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get<User[]>("http://127.0.0.1:8000/api/AllVoyageurs", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api_key': 'itHP54kdcSKkO1IgbTnm6jZdsjmKTj4VsHNA4eLDP2N84hGdJCI59ynr6bSKK5Pv',
                'Authorization': 'Bearer 40|QA05eLPRaaKfbRF1KaJs93pdrWpOwZQwcBFzaMEwc6e59ff2'
            }
        }).then((res) => {
            setVoyageurs(res.data)
        })
    }, [])

    return (
        <div className='w-full h-auto bg-gray-50'>
            <p className='px-20  py-5 w-full text-2xl'>Liste des voyageurs :</p>
            <div className="w-full h-0.5 bg-gray-300 "></div>
            <br />
            <br />
            <br />
            <div className="flex w-full flex-wrap justify-center">

                {Voyageurs.map((v) => (
                    <Card className="mt-6  w-1/5 m-6">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src={v.profile_path}
                                alt="card-image"
                                className='object-cover h-full w-full'
                            />
                        </CardHeader>
                        <CardBody>
                            {/*  <Typography variant="h5" color="blue-gray" className="mb-2">
                          
                            </Typography> */}
                            {/* <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography> */}
                        </CardBody>
                        <CardFooter className="pt-0 flex items-center justify-center">
                            <Button
                                onClick={() => { navigate(`/voyageur-profile/${v.id}`, { replace: true }) }}
                            >      {v.name}</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default VoyageurList
