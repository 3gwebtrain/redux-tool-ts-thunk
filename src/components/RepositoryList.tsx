import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state";
import { fetchPost } from "../state/reducers";

const RepositoriesList: React.FC = () => {
    const [term, setTerm] = useState('');
    const { data, error, loading } = useSelector((state:RootState) => state.repoState);
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(fetchPost(term))
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={e => setTerm(e.target.value)}  />
                <button>search</button>
            </form>
            {error && <h3>{error}</h3>}
            {loading && <h3>Loading...</h3>}
            {!error && !loading && data.map((name, index) => <div key={index}>{name}</div>)}
        </div>
    )
}

export default RepositoriesList;