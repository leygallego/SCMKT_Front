import { useRef } from 'react'; 
import { useSelector } from 'react-redux';


export default function Messages() {

    const messages = useSelector(state => state.messages)
    let mess = [];

    messages ? mess = Object.values(messages) : console.log('null');
    
    const myRef = useRef(null);

    // const executeScroll = () => myRef.current.scrollIntoView({block: "end", behavior: "smooth"})

    return (
        <div className="messageArea"  >
            {mess ? mess.map((element, index) => {
                return (
                    <div className='messageContainer'>
                    <div key={index} className='messageDiv'>{element.message.message}</div>
                    {/* {executeScroll()} */}
                    </div>
                )
            }) : <></>}
            <div  ref={myRef}>
            <br />
            <br />
            <br />
            <br />
            </div>
        </div>
    )
}