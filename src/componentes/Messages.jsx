import { useRef } from 'react';
import { useSelector } from 'react-redux';


export default function Messages() {

    const messages = useSelector(state => state.messages);
    const logged = useSelector(state => state.user.id);
    let mess = [];

    messages ? mess = Object.values(messages) : console.log('');

    const myRef = useRef(null);

    const executeScroll = () => {
        setTimeout(() => {
            myRef.current.scrollIntoView({ block: "end", behavior: "smooth" })    
        }, 150);
        
    }

    return (
        <div className="messageArea"  >
            {mess ? mess.map((element, index) => {
                return (
                    <div className={logged === element.message.from ? 'messageDivFrom' : 'messageDivTo'}>
                        <div 
                        key={index} 
                        className={logged === element.message.from ? 'messageDataFrom' : 'messageDataTo'}
                        >{element.message.message}
                        </div>
                        { executeScroll() }
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