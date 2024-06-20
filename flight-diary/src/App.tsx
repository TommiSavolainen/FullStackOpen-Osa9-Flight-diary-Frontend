import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [diarys, setDiarys] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      setDiarys(response.data)
    })
  }, [])

  return (
    <>
      <div>
        <h3>Flight Diary</h3>
          {diarys.map((diary) => (
            <div key={diary.id}>
              <div><b>{diary.date}</b></div><br />
              <div>Weather: {diary.weather}</div>
              <div>Visibility: {diary.visibility}</div>
              <br />
            </div>
          ))}
      </div>
    </>
  )
}

export default App
