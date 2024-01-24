import axios from 'axios'
import React, { useEffect, useState } from 'react'
export interface Voyageur {
  id: number
  name: string
  email: string

}
export interface Guide {
  id: number
  name: string
  email: string
  cnt: number

}
function SqlMatching() {
  const [Voyageurs, setVoyageurs] = useState<Voyageur[]>([])
  const [MatchedGuides, setMatchedGuides] = useState<Guide[]>([])
  useEffect(() => {
    axios.get<Voyageur[]>("http://127.0.0.1:8000/api/AllVoyageurs", {
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
  const matchByVoyageur = (user_id: number) => {
    axios.post<Guide[]>(`http://127.0.0.1:8000/api/SqlMatching/${user_id}`, null, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api_key': 'itHP54kdcSKkO1IgbTnm6jZdsjmKTj4VsHNA4eLDP2N84hGdJCI59ynr6bSKK5Pv',
        'Authorization': 'Bearer 40|QA05eLPRaaKfbRF1KaJs93pdrWpOwZQwcBFzaMEwc6e59ff2'
      }
    }).then((res) => {
      setMatchedGuides(res.data)
    })
  }

  return (
    <div className='w-full h-auto'>
      <p className='mx-10 my-5'>
        Les voyageurs
      </p>
      <div className="flex w-full">
        <div className="w-1/2">
          {Voyageurs.map((voyageur) => (

            <div className="bg-gray-50 mx-10 px-10 py-2 my-2 rounded-lg flex justify-between">
              <p>
                {voyageur.name}
              </p>
              <button
                onClick={() => { matchByVoyageur(voyageur.id) }}
                className="inline-block w-auto min-w-[250px] px-6 py-4 text-white transition-all bg-gray-700 dark:bg-white dark:text-gray-800 rounded-md shadow-xl sm:w-auto hover:bg-gray-900 hover:text-white shadow-slate-300 dark:shadow-slate-700 hover:shadow-2xl hover:shadow-slate-400 hover:-translate-y-px"
              >Run match
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          {MatchedGuides.length == 0 ? (<div className="flex w-full h-screen justify-center items-center">
            <p>no matched data</p>
          </div>) : (<div className='w-full'>

            {MatchedGuides.map((voyageur) => (

              <div className="bg-gray-50 mx-10 px-10 py-2 my-2 rounded-lg flex justify-between">
                <p>
                  {voyageur.name}
                </p>

              </div>
            ))}
          </div>)}

        </div>
      </div>
    </div>
  )
}

export default SqlMatching
