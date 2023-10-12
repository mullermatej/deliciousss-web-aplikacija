import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    // na enter zelim loadat novi page, event handler treba
    // default ponasanje je da refresha stranicu
    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(input); ono sto upises u search bar
        navigate('/searched/' + input);
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch></FaSearch>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                />
            </div>
            {/* <h3>{input}</h3> */}
            {/* Prikazuje ono sta upises u search bar */}
        </FormStyle>
    );
}

const FormStyle = styled.form`
    margin: 0rem 20rem;
    div {
        position: relative;
        width: 100%;
    }
    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`;

export default Search;
