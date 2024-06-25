import { useState } from "react";
import axios, {AxiosError} from "axios";
import { Diary } from "../App";


interface NewDiaryProps {
    diarys: Diary[];
    setDiarys: React.Dispatch<React.SetStateAction<Diary[]>>;
}

interface ErrorResponse {
    message: string;
}

const NewDiary = ({diarys, setDiarys}: NewDiaryProps) => {
    const [date, setDate] = useState<string>("");
    const [weather, setWeather] = useState<string>("");
    const [visibility, setVisibility] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios
            .post("http://localhost:3000/api/diaries", {
                date: date,
                weather: weather,
                visibility: visibility,
                comment: comment,
            })
            .then((response) => {
                console.log(response);
                setDiarys([...diarys, response.data]);
                setDate("");
                setWeather("");
                setVisibility("");
                setComment("");
            })
            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>;
                    if (axiosError.response) {
                        console.log(axiosError.response.data);
                        console.log(axiosError.response.status);
                        console.log(axiosError.response.headers);
                        console.log(axiosError)
                        setErrorMessage(JSON.stringify(axiosError.response.data)); // This will now correctly set the error message
                        setTimeout(() => {
                            setErrorMessage("");
                        }, 5000);
                    } else if (axiosError.request) {
                        console.log(axiosError.request);
                        setErrorMessage("The request was made but no response was received");
                        setTimeout(() => {
                            setErrorMessage("");
                        }, 5000);
                    } else {
                        console.log(axiosError.message);
                        setErrorMessage("Something went wrong");
                        setTimeout(() => {
                            setErrorMessage("");
                        }, 5000);
                    }
                } else {
                    console.error(error);
                    setErrorMessage("An unexpected error occurred");
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                }
            });
    };
    
    return (
        <>
        <h3>Add New Diary</h3>
        <p id="errorMessage">{errorMessage}</p>
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
                <label>Weather: </label>
                sunny <input type="radio" name="weather" value="sunny" checked={weather === "sunny"} onChange={(e) => setWeather(e.target.value)} />
                rainy <input type="radio" name="weather" value="rainy" checked={weather === "rainy"} onChange={(e) => setWeather(e.target.value)} />
                cloudy <input type="radio" name="weather" value="cloudy" checked={weather === "cloudy"} onChange={(e) => setWeather(e.target.value)} />
                stormy <input type="radio" name="weather" value="stormy" checked={weather === "stormy"} onChange={(e) => setWeather(e.target.value)} />
                windy <input type="radio" name="weather" value="windy" checked={weather === "windy"} onChange={(e) => setWeather(e.target.value)} />
            </div>
            <div>
                <label>Visibility: </label>
                great <input type="radio" name="visibility" value="great" checked={visibility === "great"} onChange={(e) => setVisibility(e.target.value)} />
                good <input type="radio" name="visibility" value="good" checked={visibility === "good"} onChange={(e) => setVisibility(e.target.value)} />
                ok <input type="radio" name="visibility" value="ok" checked={visibility === "ok"} onChange={(e) => setVisibility(e.target.value)} />
                poor <input type="radio" name="visibility" value="poor" checked={visibility === "poor"} onChange={(e) => setVisibility(e.target.value)} />
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