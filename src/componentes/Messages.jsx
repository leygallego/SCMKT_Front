import { useRef } from 'react';
import { useSelector } from 'react-redux';


export default function Messages() {

    const messages = useSelector(state => state.messages);
    const logged = useSelector(state => state.user.id);
    let mess = [];

    messages ? mess = Object.values(messages) : console.log('');

    // console.log('MESSAGES::::::', mess)

    const myRef = useRef(null);

    const executeScroll = () => myRef.current.scrollIntoView({ block: "end", behavior: "smooth" })
    console.log("LOGGED:::", logged)
    return (
        <div className="messageArea"  >
            {mess ? mess.map((element, index) => {
                return (
                    <div className='messageContainer'>

                        <div 
                        key={index} 

                        className={logged === element.message.from ? 'messageDivFrom' : 'messageDivTo'}
                        >{element.message.message}
                        </div>

                        {
                            setTimeout(() => {
                                executeScroll()
                            }, 150)
                        }
                    </div>
                )
            }) : <></>}
            <div ref={myRef}>
                <br />
                <br />
            </div>
        </div>
    )
}