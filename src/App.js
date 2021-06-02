import {useEffect, useState} from 'react';
import {fetchData} from "./api";

function Header() {
    return (
        <header className="hero is-info">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1 ">米ドル変換レート</h1>
                </div>
            </div>
        </header>
    );
};

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { currency } = event.target.elements;
        props.onFormSubmit(currency.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                    <div className="control">
                        <div className="select">
                            <select name="currency" defaultValue="JPY">
                                <option value="JPY">Japanese Yen (日本円）</option>
                                <option value="CNY">Chanese Yuan（人民元）</option>
                                <option value="GBP">Great Britain Pound（英ポンド）</option>
                                <option value="NZD">New Zealand Dollar（ニュージーランドドル）</option>
                                <option value="AUD">Australian Dollar（オーストラリアドル）</option>
                                <option value="CAD">Canadian Dollar（カナダドル）</option>
                                <option value="CHF">Confederatio Helvetica Frac（スイスフラン）</option>
                                <option value="KRW">South Korean Won（韓国ウォン）</option>
                                <option value="HKD">Hong Kong Dollar（香港ドル）</option> 
                            </select>
                        </div>
                    </div>
                    <div className="control">
                            <button type="submit" className="button is-info is-light">
                                 Change
                            </button>
                    </div>  
                </div>
            </form>
        </div>
    );
}

function Display(props){
    const { data } = props;
    const [dollar,setPrice] = useState(null);
    const handleChange1 = (e) => {
        setPrice(e.target.value)
    }

    const [cent,setCent] = useState(null);
    const handleChange2 = (e) => {
        setCent(e.target.value)
    }
    
    if(data == null){
        return <p>Now Loading</p>
    }

    if(data*dollar+data*cent/100 < 1){
        return (
            <div className="columns is-multiline">
            <div className="control">
                <input id="num" value={dollar} onChange={handleChange1} className="input is-small" type="number" min="0" placeholder="0"/>
            </div>
            <p> ドル</p>
            <div className="control">
                <input id="num" value={cent} onChange={handleChange2} className="input is-small" type="number" min="0" max="99" placeholder="0"/>
            </div>
            <p>セント　=　 {Math.floor((data*dollar+data*cent/100)*10)/10}</p>
        </div>
        )
    }
    else{
        return (
            <div className="columns is-multiline">
                <div className="control">
                    <input id="num" value={dollar} onChange={handleChange1} className="input is-small" type="number" min="0" placeholder="0"/>
                </div>
                <p> ドル</p>
                <div className="control">
                    <input id="num" value={cent} onChange={handleChange2} className="input is-small" type="number" min="0" max="99" placeholder="0"/>
                </div>
                <p>セント　=　 {Math.floor(data*dollar+data*cent/100)}</p>
            </div>
    
        );
    }
}

function Main(){
    const [data,setData] = useState(null);
    const JPY = "JPY";
    useEffect(() => {
        fetchData().then(data => {
            setData(data.rates[JPY]);
        }) 
    },[]);

    
    function reloadValue(currency) {
        fetchData().then(data => {
            setData(data.rates[currency]);
        });
    }

    return (
        <main>
            <section className="section">
                <div className="container is-max-desktop">
                    <Display data={data} />
                    <Form onFormSubmit={reloadValue}/>
                </div>
            </section>            
        </main>
    );
}

function Footer() {

    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>この外貨変換は小数点以下切り捨てで表示しています。</p>
                <p>Data are retrieverd from openexchangerates.org</p>
                <p>
                    <a href="https://openexchangerates.org">Donate to openexchangerates.org</a>
                </p>
            </div>
        </footer>
    );
}

function App(){
    return(
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;


