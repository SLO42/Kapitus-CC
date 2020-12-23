import React from 'react';
import logo from './logo.svg';
import _axios from 'axios';
import './App.css';
import symbolArray from './symbols.js'

const axios = _axios.create({
  timeout: 10000
})

const apikey =  process.env.REACT_APP_APIKEY || "demo";
const INITAL_STATE = {
  symbol: "AAPL",
  data: undefined,
  loading: false,
  image: null,
  error: undefined
} 


class App extends React.Component { 
  constructor(props){
    super(props);

    this.state = {
      ...INITAL_STATE
    }
  }

  _handleKeyDown = (e) => {
		if (e.key === 'Enter') {
		  this.onSubmit(e);
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this._handleKeyDown, false);
  }

  ListStart = () => {
    return (
    <ul key={"start"} style={{listStyle: "none"}}>
      {Object.keys(this.state.data).map((key, index) => (
        <this.ListItem key={index} item={key} data={this.state.data[key]} />
      )
      )}
    </ul>
  )}
  
  ListItem = ({item, data}) => {
    if (item === "changes"){
      if (data > 0){
        return (
          <li key={item} id={item}>
            <strong>{item}</strong> | <span style={{color: "green"}}>{data}</span>
          </li> 
        )
      }
      else {
        return (
          <li key={item} id={item}>
            <strong>{item}</strong> | <span style={{color: "red"}}>{data}</span>
          </li> 
        )
      }
    }
    else if (item === "price") {
      return (
        <li key={item} id={item}>
            <strong>{item}</strong> | ${data}
        </li>
       )
    }
    else if (item === "website") {
      return (
        <li key={item} id={item}>
           <strong>{item}</strong> | <a href={data} target={"_blank"} rel={"noreferrer"}>{data}</a>
        </li>
       )
    }
    else return <li key={item} id={item}> <strong>{item}</strong> | {data} </li>
  }

  onSubmit = () => {
    const symbol = this.state.symbol.toUpperCase();
    this.setState({loading: true, data: undefined});
    if (symbolArray.includes(symbol)){
      axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${symbol === "AAPL" ? "demo" : apikey}`).then(res => {
        if (res.data.length === 0){
          this.setState({image: logo, error: `"${symbol}" is not a Stock Symbol found in this API, Please enter a new stock symbol... For example: "${symbolArray[Math.floor(Math.random() * 7000)]}"`, loading: false})
        }    
        else{
          const data = res.data[0];
          this.setState({data: data, image: data.image ? data.image : logo }, () => {
            this.setState({loading: false});
          });
        }
      })
    }
    else{
      this.setState({image: logo, error: `"${symbol}" is not a Stock Symbol found in this API, Please enter a new stock symbol... For example: "${symbolArray[Math.floor(Math.random() * 7000)]}"`, loading: false})
    }
      
    // });
  }

  onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
  };
  
  
  

  render() {
    const {loading, symbol, error} = this.state;
      return (
        <div className="App">
        <header className="App-header">
          <img src={ this.state.image || logo} className="App-logo" alt="logo" />
            {/* <label for="symbol"></label> */}
          <div className="container">
            <div className="form">
              <input type="text" value={symbol} placeholder={"Stock Symbol like AAPL"} name={"symbol"} id={"symbol"} onChange={this.onChange}></input>
              <input type="button" onClick={this.onSubmit} value={"Submit"}></input>
            </div>
            <div className="data">
              {loading ? <p>loading...</p> : this.state.data === undefined ? error ? <p>{error}</p> :  <p></p> :  <this.ListStart key="ListStarts"/> }
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
