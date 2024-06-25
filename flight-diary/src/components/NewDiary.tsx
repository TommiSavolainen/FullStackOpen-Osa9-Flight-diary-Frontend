import { useState } from "react";
import axios from "axios";
import { Diary } from "../App";

// interface Diary {
//     date: string;
//     weather: string;
//     visibility: string;
//     comment: string;
// }

interface NewDiaryProps {
    diarys: Diary[];
    setDiarys: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const NewDiary = ({diarys, setDiarys}: NewDiaryProps) => {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState("");
    const [visibility, setVisibility] = useState("");
    const [comment, setComment] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
        .post("http://localhost:3000/api/diaries", {
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment,
        }
        )
        .then((response) => {
            console.log(response);
            setDiarys([...diarys, response.data]);
        });
        
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
        
    };
    
    return (
        <>
        <h3>Add New Diary</h3>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Date:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            </div>
            <div>
            <label>Weather:</label>
            <input
                type="text"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
            />
            </div>
            <div>
            <label>Visibility:</label>
            <input
                type="text"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
            />
            </div>
            <div>
            <label>Comment:</label>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            </div>
            <button type="submit">add</button>
        </form>
        </>
    );
};

export default NewDiary;