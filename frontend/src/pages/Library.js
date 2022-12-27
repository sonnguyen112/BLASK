import BLASKItem from "../components/BlaskItem"
import { useState, useEffect } from "react"
import "../App.css"

const Library = (props) => {
  const [quizs, setQuizs] = useState(Array(0).fill(null))
  useEffect(() => {
    async function GetData(url = '') {
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token cc4e84687c53e5481df8df6a31be4cac9b0859a7'
        },
      });
      // Default options are marked with *
      
      let data = await response.json();// parses JSON response into native JavaScript objects
      console.log(data)
      setQuizs(data["quiz_list"])
    }
    GetData('http://localhost:8000/quiz/api/get_all_quiz');

  }
    , []);

  async function handleCreateRoom(index) {
    const response = await fetch('http://localhost:8000/room/api/get_quiz/' + quizs[index]['slug'], {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token cc4e84687c53e5481df8df6a31be4cac9b0859a7'
      },
    });
    const response2 = await fetch('http://localhost:8000/room/api/create_room/', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token cc4e84687c53e5481df8df6a31be4cac9b0859a7'
      },
    });
    let data = await response.json()
    let data2 = await response2.json()
    console.log(data2)
  };
  return (
    <div className="blask-list">
      {quizs.map((item, index) => (
        <BLASKItem username={props.profile["username"]} value={item} onClick={() => handleCreateRoom(index)}>

        </BLASKItem>
      ))
      }
    </div>
  )
}
export default Library;