import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
const RepositoriesList: React.FC = () => {
    const [term, setTerm] = useState('');
    const dispatch = useDispatch();
    const { data, error, loading } = useTypedSelector(state => state.repositories);

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(searchRepositories(term));
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