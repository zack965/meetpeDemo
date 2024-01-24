import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { CosignSimularityGuide, Guide, Language, Personalite, SqlMatcingGuide } from './HamiltongDistanceMatching';
import { Avatar, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
export interface User {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
    user_type: string
    profile_path: string
}
interface Choices {
    choice_id: number
    choice_txt: string
    question_text: string



}
interface UserChoices {
    personalite: Personalite[]
    languages: Language[]
}
function StarIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-yellow-700"
        >
            <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
            />
        </svg>
    );
}
function VoyageurProfile() {
    const { id } = useParams();
    const [Choices, setChoices] = useState<Choices[]>()
    const [User, setUser] = useState<User>()
    const [MatchedGuides, setMatchedGuides] = useState<(Guide[])>([]);
    const [MatchedGuidesSql, setMatchedGuidesSql] = useState<(SqlMatcingGuide[])>([]);
    const [MatchedGuidesCosign, setMatchedGuidesCosign] = useState<(CosignSimularityGuide[])>([]);
    const [UserChoicesVoyageur, setUserChoicesVoyageur] = useState<string[]>([])
    const [CosignSumilarityTimeUser, setCosignSumilarityTimeUser] = useState<number>()
    const [SqlMatchingTimeUser, setSqlMatchingTimeUser] = useState<number>()
    const [HamingDistanceTimeUser, setHamingDistanceTimeUser] = useState<number>()

    const [ChoicesList, setChoicesList] = useState<UserChoices>()
    useEffect(() => {

        axios.get<{ data: Choices[], user: User }>(`http://127.0.0.1:8000/api/VoyageurProfile/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api_key': 'itHP54kdcSKkO1IgbTnm6jZdsjmKTj4VsHNA4eLDP2N84hGdJCI59ynr6bSKK5Pv',
                'Authorization': 'Bearer 48|HMW242Uou0VfOgtHUfQotj3Bv0I5tV2xuRWNkwQZ6041ab8e'
            }
        }).then((res) => {
            console.log(res.data)
            setUser(res.data.user)
            setChoices(res.data.data)
        })
        axios.get<UserChoices>("http://127.0.0.1:8000/api/getChoices", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api_key': 'itHP54kdcSKkO1IgbTnm6jZdsjmKTj4VsHNA4eLDP2N84hGdJCI59ynr6bSKK5Pv',
                'Authorization': 'Bearer 48|HMW242Uou0VfOgtHUfQotj3Bv0I5tV2xuRWNkwQZ6041ab8e'
            }
        }).then((res) => {
            setChoicesList(res.data)
        })
    }, [])
    const matchByVoyageur = (user_id: number) => {
        axios.post<{ data: Guide[], user_choices_voyageur: string[], time_taken: number }>(`http://127.0.0.1:8000/api/MatchingHammingDistance/${user_id}`, null, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api_key': 'itHP54kdcSKkO1IgbTnm6jZdsjmKTj4VsHNA4eLDP2N84hGdJCI59ynr6bSKK5Pv',
                'Authorization': 'Bearer 48|HMW242Uou0VfOgtHUfQotj3Bv0I5tV2xuRWNkwQZ6041ab8e'
            }
        }).then((res) => {
            const data = res.data.data.sort((a, b) => a.hamiltong_distance - b.hamiltong_distance);
            setMatchedGuides(data)
            /*       setMatchedGuidesSql([]) */
            setUserChoicesVoyageur(res.data.user_choices_voyageur)
            setHamingDistanceTimeUser(res.data.time_taken)
        })
    }
    const matchByVoyageurSql = (user_id: number) => {
        axios.post<{ data: SqlMatcingGuide[], user_choices_voyageur: string[], time_taken: number }>(`http://127.0.0.1:8000/api/SqlMatching/${user_id}`, null, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api_key': 'itHP54kdcSKkO1IgbTnm6jZdsjmKTj4VsHNA4eLDP2N84hGdJCI59ynr6bSKK5Pv',
                'Authorization': 'Bearer 48|HMW242Uou0VfOgtHUfQotj3Bv0I5tV2xuRWNkwQZ6041ab8e'
            }
        }).then((res) => {
            /*     const data = res.data.data.sort((a, b) => a.hamiltong_distance - b.hamiltong_distance);
                setMatchedGuides(data)
                setUserChoicesVoyageur(res.data.user_choices_voyageur) */
            setMatchedGuidesSql(res.data.data)
            setSqlMatchingTimeUser(res.data.time_taken)
            /*    setMatchedGuides([]) */
            //  setUserChoicesVoyageur(res.data.user_choices_voyageur)
        })
    }
    const CosignMatching = (user_id: number) => {
        axios.post<{ data: CosignSimularityGuide[], time_taken: number, user_choices_voyageur: string[] }>(`http://127.0.0.1:8000/api/MatchingCosineSimilarity/${user_id}`, null, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api_key': 'itHP54kdcSKkO1IgbTnm6jZdsjmKTj4VsHNA4eLDP2N84hGdJCI59ynr6bSKK5Pv',
                'Authorization': 'Bearer 48|HMW242Uou0VfOgtHUfQotj3Bv0I5tV2xuRWNkwQZ6041ab8e'
            }
        }).then((res) => {
            /*     const data = res.data.data.sort((a, b) => a.hamiltong_distance - b.hamiltong_distance);
                setMatchedGuides(data)
                setUserChoicesVoyageur(res.data.user_choices_voyageur) */
            setMatchedGuidesCosign(res.data.data)
            setCosignSumilarityTimeUser(res.data.time_taken)
            /*    setMatchedGuides([]) */
            //  setUserChoicesVoyageur(res.data.user_choices_voyageur)
        })
    }

    return (
        <div className='w-full flex bg-gray-100 h-full'>

            <div className="w-1/3 pt-10">
                {/*   <p className='px-10 py-5  '>
                    Le nom : {User?.name}
                </p>
                <p className='px-10 py-5  '>
                    L'email : {User?.email}
                </p> */}
                <div className=" flex">
                    <div className="w-1/3">

                        <img src={User?.profile_path} alt="" className=' ml-16 rounded-md ' />
                    </div>
                    <div className="w-2/3">

                        <p className=' py-5 ml-20 '>
                            Le nom : {User?.name}
                        </p>
                        <p className=' py-5 ml-20 '>
                            L'email : {User?.email}
                        </p>
                    </div>
                </div>
                <p className='px-10 font-bold text-2xl  py-5'>
                    {/*  {Choices?.[0].question_text} */}
                    On dit de toi que tu es...
                </p>
                <div className="w-full pl-20 flex flex-wrap justify-start">

                    {ChoicesList?.personalite.map((per) => {
                        if (Choices?.some(obj => obj.choice_id == per.id)) {
                            return (
                                <p className='px-3   py-5 bg-green-500 my-2  rounded-lg mx-1'>
                                    {per.choice_txt}
                                </p>
                            );
                        } else {
                            return (
                                <p className='px-3 py-5 bg-white my-2 rounded-lg mx-1'>
                                    {per.choice_txt}
                                </p>
                            );
                        }
                    })}
                    <br />


                </div>
                <p className='px-10 font-bold text-2xl  py-5'>
                    {/*  {Choices?.[0].question_text} */}
                    Tu parles...
                </p>
                <div className="w-full pl-20 flex flex-wrap justify-start">

                    {ChoicesList?.languages.map((per) => {
                        if (Choices?.some(obj => obj.choice_id == per.id)) {
                            return (
                                <p className='px-3   py-5 bg-green-500 my-2  rounded-lg mx-1'>
                                    {per.choice_txt}
                                </p>
                            );
                        } else {
                            return (
                                <p className='px-3 py-5 bg-white my-2 rounded-lg mx-1'>
                                    {per.choice_txt}
                                </p>
                            );
                        }
                    })}
                    <br />

                    {/*  <div className="w-full my-6 flex justify-center items-center">

                        <button
                            onClick={() => {
                                matchByVoyageur(parseInt(id!))
                                matchByVoyageurSql(parseInt(id!))
                            }}
                            className="inline-block  w-auto min-w-[250px] px-6 py-4 text-white transition-all bg-gray-700 dark:bg-white dark:text-gray-800 rounded-md shadow-xl sm:w-auto hover:bg-gray-900 hover:text-white shadow-slate-300 dark:shadow-slate-700 hover:shadow-2xl hover:shadow-slate-400 hover:-translate-y-px"
                        >Matcher
                        </button>
                    </div>
              
                    <br />
                    <br /> */}
                </div>
                <div className="w-full my-6 flex justify-center items-center">

                    <button
                        onClick={() => {
                            matchByVoyageur(parseInt(id!))
                            matchByVoyageurSql(parseInt(id!))
                            CosignMatching(parseInt(id!))
                        }}
                        className="inline-block  w-auto min-w-[250px] px-6 py-4 text-white transition-all bg-gray-700 dark:bg-white dark:text-gray-800 rounded-md shadow-xl sm:w-auto hover:bg-gray-900 hover:text-white shadow-slate-300 dark:shadow-slate-700 hover:shadow-2xl hover:shadow-slate-400 hover:-translate-y-px"
                    >Matcher
                    </button>
                </div>

                <br />
                <br />
            </div>
            <div className="w-2/3">
                <div className='w-full flex'>
                    <div className="w-1/3 ">

                        <p className="w-5/6 py-2 my-2 px-4 font-bold underline text-white bg-black rounded-lg">
                            Hamming Distance
                        </p>
                        <p className="w-1/2 px-4 py-0 font-bold underline ">
                            temps : {HamingDistanceTimeUser}
                        </p>
                        {MatchedGuides.map((voyageur) => (
                            <Card color="transparent" shadow={false} className="w-full">
                                <CardHeader
                                    color="transparent"
                                    floated={false}
                                    shadow={false}
                                    className="mx-0 flex items-start gap-4 pt-0 pb-8"
                                >
                                    <div className=''>

                                        <Avatar
                                            size="lg"
                                            variant="circular"
                                            src={voyageur.profile_path}
                                            alt="tania andrew"
                                        />
                                        <div className="flex mt-4">

                                            {voyageur.hamiltong_distance == 0 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                            </>) : null}
                                            {voyageur.hamiltong_distance >= 1 && voyageur.hamiltong_distance <= 3 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                            </>) : null}
                                            {voyageur.hamiltong_distance >= 4 && voyageur.hamiltong_distance <= 10 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />

                                            </>) : null}
                                        </div>
                                    </div>

                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray">
                                                {voyageur.name}
                                            </Typography>
                                            <div className="5 flex items-center gap-0">


                                            </div>

                                        </div>
                                        <Typography color="blue-gray">{voyageur.email}</Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className="mb-6 p-0 flex flex-wrap w-full overflow-x-auto whitespace-normal ">
                                    {voyageur.choices_guide.map((choice) => (
                                        <>
                                            {UserChoicesVoyageur.indexOf(choice) == -1 ? (
                                                <Typography className='bg-gray-500 my-2 text-white py-3 rounded-lg px-2 mx-2'>
                                                    {choice}
                                                </Typography>
                                            ) : (
                                                <Typography className='bg-green-500 my-2 text-white py-3 rounded-lg px-2 mx-2'>
                                                    {choice}
                                                </Typography>)}

                                        </>
                                    ))}
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    <div className="w-1/3">
                        <p className="w-5/6 py-2 my-2 px-4 font-bold underline text-white bg-black rounded-lg">
                            Sql
                        </p>
                        <p className="w-full py-0 font-bold underline text-gray-600">
                            temps : {SqlMatchingTimeUser}
                        </p>
                        {MatchedGuidesSql.map((voyageur) => (
                            <Card color="transparent" shadow={false} className="w-5/6">
                                <CardHeader
                                    color="transparent"
                                    floated={false}
                                    shadow={false}
                                    className="mx-0 flex items-start gap-4 pt-0 pb-8"
                                >
                                    <div className=''>

                                        <Avatar
                                            size="lg"
                                            variant="circular"
                                            src={voyageur.profile_path}
                                            alt="tania andrew"
                                        />
                                        <div className="flex mt-4">

                                            {voyageur.cnt == 1 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                            </>) : null}
                                            {voyageur.cnt >= 2 && voyageur.cnt <= 3 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                            </>) : null}
                                            {voyageur.cnt >= 4 && voyageur.cnt <= 10 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />

                                            </>) : null}
                                        </div>
                                    </div>

                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray">
                                                {voyageur.name}
                                            </Typography>
                                            <div className="5 flex items-center gap-0">


                                            </div>

                                        </div>
                                        <Typography color="blue-gray">{voyageur.email}</Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className="mb-6 p-0 flex flex-wrap w-full overflow-x-auto whitespace-normal">
                                    {voyageur.choices_guide.map((choice) => (
                                        <>
                                            {UserChoicesVoyageur.indexOf(choice) == -1 ? (<Typography className='bg-gray-500 my-2 text-white py-3 rounded-lg px-2 mx-2'>
                                                {choice}
                                            </Typography>) : (<Typography className='bg-green-500 my-2 text-white py-3 rounded-lg px-2 mx-2'>
                                                {choice}
                                            </Typography>)}

                                        </>
                                    ))}
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    <div className="w-1/3">
                        <p className="w-5/6 py-2 my-2 px-4  font-bold underline text-white bg-black rounded-lg">
                            Cosine similarity
                        </p>
                        <p className="w-full py-0 font-bold underline text-gray-600">
                            temps : {CosignSumilarityTimeUser}
                        </p>
                        {MatchedGuidesCosign.map((voyageur, index) => (
                            <Card color="transparent" shadow={false} className="w-5/6">
                                <CardHeader
                                    color="transparent"
                                    floated={false}
                                    shadow={false}
                                    className="mx-0 flex items-start gap-4 pt-0 pb-8"
                                >
                                    <div className=''>

                                        <Avatar
                                            size="lg"
                                            variant="circular"
                                            src={voyageur.profile_path}
                                            alt="tania andrew"
                                        />
                                        <div className="flex mt-4">

                                            {index < 10 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                            </>) : null}
                                            {index >= 10 && index <= 200 ? (<>
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                                <StarIcon />
                                            </>) : null}

                                        </div>
                                    </div>

                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray">
                                                {voyageur.name}
                                            </Typography>
                                            <div className="5 flex items-center gap-0">


                                            </div>

                                        </div>
                                        <Typography color="blue-gray">{voyageur.email}</Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className="mb-6 p-0 flex flex-wrap w-full overflow-x-auto whitespace-normal">
                                    {voyageur.choices_guide.map((choice) => (
                                        <>
                                            {UserChoicesVoyageur.indexOf(choice) == -1 ? (<Typography className='bg-gray-500 my-2 text-white py-3 rounded-lg px-2 mx-2'>
                                                {choice}
                                            </Typography>) : (<Typography className='bg-green-500 my-2 text-white py-3 rounded-lg px-2 mx-2'>
                                                {choice}
                                            </Typography>)}

                                        </>
                                    ))}
                                </CardBody>
                            </Card>
                        ))}
                    </div>


                </div>


            </div>

        </div>
    )
}

/**
 * 
 * 
 *   <p className='px-10 py-5 bg-white my-2 w-1/2 rounded-lg mx-10'>
                    La personalité : {per.choice_txt}
                </p>
 */
export default VoyageurProfile
