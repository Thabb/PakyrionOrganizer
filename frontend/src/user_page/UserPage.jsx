import CharacterCard from "./CharacterCard";
import {useParams} from "react-router-dom";

export default function UserPage(){
    const { user_id } = useParams();
    return (
        <>
            <h1>User Page</h1>
            <CharacterCard user_id={user_id}/>
        </>
    )
}